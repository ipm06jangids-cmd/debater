import { NextResponse } from "next/server";
import { getDailyPrompt } from "@/lib/prompts/daily-prompts";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    prompt: getDailyPrompt(),
    date: new Date().toISOString().slice(0, 10),
  });
}
