import { NextResponse } from "next/server";
import { anthropic, MODELS } from "@/lib/anthropic";
import { judgeSystemPrompt, judgeUserPrompt, judgeTool, ScoreSchema } from "@/lib/prompts/judge";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { position: string; transcript: string; latestRebuttal: string };
    if (!body.latestRebuttal || body.latestRebuttal.trim().split(/\s+/).length < 5) {
      return NextResponse.json({ error: "rebuttal too short" }, { status: 400 });
    }

    const res = await anthropic.messages.create({
      model: MODELS.haiku,
      max_tokens: 400,
      system: [{ type: "text", text: judgeSystemPrompt(), cache_control: { type: "ephemeral" } }],
      tools: [judgeTool],
      tool_choice: { type: "tool", name: "score_rebuttal" },
      messages: [{ role: "user", content: judgeUserPrompt(body) }],
    });

    const toolUse = res.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "no tool output" }, { status: 502 });
    }
    const parsed = ScoreSchema.parse(toolUse.input);
    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
