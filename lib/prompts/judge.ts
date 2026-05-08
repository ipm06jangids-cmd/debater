import { z } from "zod";

export const ScoreSchema = z.object({
  logic: z.number().min(0).max(100),
  evidence: z.number().min(0).max(100),
  rhetoric: z.number().min(0).max(100),
  overall: z.number().min(0).max(100),
  note: z.string().max(120),
});

export type Score = z.infer<typeof ScoreSchema>;

export interface JudgeInput {
  position: string;
  transcript: string;
  latestRebuttal: string;
}

export function judgeSystemPrompt(): string {
  return `You are a world-class debate judge with expertise in formal logic, rhetoric, and argumentation theory. You score debate rebuttals on three dimensions, each 0-100.

LOGIC (0-100):
- 90-100: airtight inference, no fallacies, premises clearly support conclusion
- 60-89: mostly valid, minor gaps
- 30-59: noticeable fallacy or unsupported leap
- 0-29: incoherent or self-contradicting

EVIDENCE (0-100):
- 90-100: concrete examples, specific mechanism, named data or case
- 60-89: plausible reasoning with some specifics
- 30-59: vague gesture at evidence ("studies show")
- 0-29: pure assertion, no grounding

RHETORIC (0-100):
- 90-100: clear, persuasive, memorable phrasing
- 60-89: clear and competent
- 30-59: muddled or rambling
- 0-29: incoherent delivery

OVERALL: weighted blend (40% logic, 35% evidence, 25% rhetoric).

Be honest. Most untrained rebuttals score 30-60. Reserve 80+ for actually strong arguments. Penalize fallacies hard.

You must output valid JSON only, conforming to the score_rebuttal tool schema.`;
}

export const judgeTool = {
  name: "score_rebuttal",
  description: "Return numeric scores for the user's latest rebuttal",
  input_schema: {
    type: "object" as const,
    properties: {
      logic: { type: "number", minimum: 0, maximum: 100 },
      evidence: { type: "number", minimum: 0, maximum: 100 },
      rhetoric: { type: "number", minimum: 0, maximum: 100 },
      overall: { type: "number", minimum: 0, maximum: 100 },
      note: { type: "string", maxLength: 120, description: "One-line specific feedback (e.g., 'circular reasoning on second claim' or 'strong concrete example')" },
    },
    required: ["logic", "evidence", "rhetoric", "overall", "note"],
  },
};

export function judgeUserPrompt(input: JudgeInput): string {
  return `USER'S ORIGINAL POSITION:
"${input.position}"

FULL DEBATE TRANSCRIPT SO FAR:
${input.transcript}

LATEST USER REBUTTAL TO SCORE:
"${input.latestRebuttal}"

Score this rebuttal using the score_rebuttal tool.`;
}
