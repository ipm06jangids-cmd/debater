import { anthropic, MODELS } from "@/lib/anthropic";
import { debateSystemPrompt } from "@/lib/prompts/debate-system";

export const runtime = "nodejs";
export const maxDuration = 60;

interface OAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OAIRequest {
  model?: string;
  messages: OAIMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  user?: string;
  metadata?: { position?: string; currentRound?: number; totalRounds?: number };
}

function extractDebateContext(messages: OAIMessage[], metadata?: OAIRequest["metadata"]) {
  const position =
    metadata?.position ??
    messages.find((m) => m.role === "system" && m.content.includes("POSITION:"))?.content?.match(/POSITION:\s*(.+)/)?.[1]?.trim() ??
    messages.find((m) => m.role === "user")?.content ??
    "an unspecified topic";
  const currentRound = metadata?.currentRound ?? 1;
  const totalRounds = metadata?.totalRounds ?? 5;
  return { position, currentRound, totalRounds };
}

function chunk(id: string, model: string, deltaText: string, finish: string | null) {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        delta: deltaText ? { content: deltaText } : {},
        finish_reason: finish,
      },
    ],
  };
}

export async function POST(req: Request) {
  const body = (await req.json()) as OAIRequest;
  const ctx = extractDebateContext(body.messages, body.metadata);
  const system = debateSystemPrompt(ctx);
  const id = `chatcmpl-${Math.random().toString(36).slice(2, 12)}`;
  const reportedModel = body.model ?? "claude-sonnet-via-debate";
  const stream = body.stream ?? false;

  const turns = body.messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role === "assistant" ? ("assistant" as const) : ("user" as const), content: m.content }));

  if (turns.length === 0) {
    turns.push({ role: "user", content: "Begin." });
  }

  if (!stream) {
    const res = await anthropic.messages.create({
      model: MODELS.sonnet,
      max_tokens: body.max_tokens ?? 200,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: turns,
      temperature: body.temperature ?? 0.7,
    });
    const text = res.content
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("");
    return new Response(
      JSON.stringify({
        id,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: reportedModel,
        choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      }),
      { headers: { "content-type": "application/json" } },
    );
  }

  const encoder = new TextEncoder();
  const sseStream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        const claudeStream = await anthropic.messages.stream({
          model: MODELS.sonnet,
          max_tokens: body.max_tokens ?? 220,
          system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
          messages: turns,
          temperature: body.temperature ?? 0.7,
        });
        for await (const event of claudeStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            send(chunk(id, reportedModel, event.delta.text, null));
          }
        }
        send(chunk(id, reportedModel, "", "stop"));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        const msg = (err as Error).message;
        send({ error: { message: msg } });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(sseStream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
    },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, endpoint: "elevenlabs-llm" }), {
    headers: { "content-type": "application/json" },
  });
}
