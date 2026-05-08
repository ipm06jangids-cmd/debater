import { NextResponse } from "next/server";
import { getSignedUrl } from "@/lib/elevenlabs";

export const runtime = "nodejs";

export async function GET() {
  try {
    const signedUrl = await getSignedUrl();
    return NextResponse.json({ signedUrl });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
