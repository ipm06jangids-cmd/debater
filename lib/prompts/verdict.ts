import { z } from "zod";

export const VerdictSchema = z.object({
  winner: z.enum(["user", "ai", "draw"]),
  userOverall: z.number().min(0).max(100),
  aiOverall: z.number().min(0).max(100),
  breakdown: z.array(z.string()).length(3),
  bestUserLine: z.string(),
  weakestUserLine: z.string(),
  nextDayTopic: z.string(),
});

export type VerdictOut = z.infer<typeof VerdictSchema>;

export const verdictTool = {
  name: "render_verdict",
  description: "Final verdict for a 5-round debate match",
  input_schema: {
    type: "object" as const,
    properties: {
      winner: { type: "string", enum: ["user", "ai", "draw"] },
      userOverall: { type: "number", minimum: 0, maximum: 100 },
      aiOverall: { type: "number", minimum: 0, maximum: 100 },
      breakdown: {
        type: "array",
        items: { type: "string", maxLength: 200 },
        minItems: 3,
        maxItems: 3,
        description: "Three concise bullets explaining the verdict",
      },
      bestUserLine: { type: "string", description: "Direct quote of the user's strongest moment" },
      weakestUserLine: { type: "string", description: "Direct quote of the user's weakest moment" },
      nextDayTopic: { type: "string", description: "Suggested topic to debate next, tailored to user's growth area" },
    },
    required: ["winner", "userOverall", "aiOverall", "breakdown", "bestUserLine", "weakestUserLine", "nextDayTopic"],
  },
};

export function verdictSystemPrompt(): string {
  return `You are an elite debate judge issuing a final verdict on a 5-round voice debate. Be honest, specific, and actionable. No hedging. Quote the user verbatim where required.`;
}

export function verdictUserPrompt(args: {
  position: string;
  transcript: string;
  roundScores: { round: number; logic: number; evidence: number; rhetoric: number; overall: number; note: string }[];
}): string {
  return `POSITION: "${args.position}"

ROUND SCORES:
${args.roundScores
  .map(
    (s) =>
      `R${s.round}: logic ${s.logic}, evidence ${s.evidence}, rhetoric ${s.rhetoric}, overall ${s.overall}. ${s.note}`,
  )
  .join("\n")}

FULL TRANSCRIPT:
${args.transcript}

Use the render_verdict tool. The bestUserLine and weakestUserLine MUST be exact quotes from the transcript above. Pick a nextDayTopic that targets the user's weakest dimension.`;
}
