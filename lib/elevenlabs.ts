export async function getSignedUrl(): Promise<string> {
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!agentId || !apiKey) {
    throw new Error("Missing ELEVENLABS_AGENT_ID or ELEVENLABS_API_KEY");
  }
  const res = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
    { headers: { "xi-api-key": apiKey }, cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`ElevenLabs signed URL failed: ${res.status}`);
  }
  const data = (await res.json()) as { signed_url: string };
  return data.signed_url;
}
