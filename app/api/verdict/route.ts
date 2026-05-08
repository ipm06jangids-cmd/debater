import { NextResponse } from "next/server";
import { anthropic, MODELS } from "@/lib/anthropic";
import { verdictSystemPrompt, verdictUserPrompt, verdictTool, VerdictSchema } from "@/lib/prompts/verdict";

export const runtime = "nodejs";
export const maxDuration = 60;

interface RoundScoreIn {
  round: number;
  logic: number;
  evidence: number;
  rhetoric: number;
  overall: number;
  note: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      position: string;
      transcript: string;
      roundScores: RoundScoreIn[];
    };

    const res = await anthropic.messages.create({
      model: MODELS.sonnet,
      max_tokens: 900,
      system: verdictSystemPrompt(),
      tools: [verdictTool],
      tool_choice: { type: "tool", name: "render_verdict" },
      messages: [{ role: "user", content: verdictUserPrompt(body) }],
    });

    const toolUse = res.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "no tool output" }, { status: 502 });
    }
    const parsed = VerdictSchema.parse(toolUse.input);
    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
