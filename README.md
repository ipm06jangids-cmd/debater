# Sparring — AI Debate Sparring Partner

Voice-first AI debate trainer. State a position aloud, AI argues the strongest possible counter, 5 rounds, live logic-strength scoring, final verdict + shareable card.

## Stack

- Next.js 15 (App Router) · TypeScript · Tailwind v3
- ElevenLabs Conversational AI (voice + turn-taking) → Claude Sonnet 4.6 as Custom LLM
- Claude Haiku 4.5 (live partial scoring) · Sonnet 4.6 (final verdict)
- Framer Motion · GSAP-style scroll · React Three Fiber (floating glass shards)
- @vercel/og (dynamic share cards)
- localStorage v1 (no auth, no DB)

## ⚠️ Before anything: rotate keys

The keys originally pasted into chat are public. Rotate them now:

- ElevenLabs: dashboard → Profile + API Key → regenerate
- Gemini: aistudio.google.com/apikey → revoke + reissue

Then put the new values in `.env.local` (gitignored).

## Setup

```powershell
cd ai-sparring
npm install
```

## ElevenLabs agent configuration

1. Sign in → ElevenLabs dashboard → Conversational AI → **Create Agent**
2. **Voice:** pick a calm authoritative voice (e.g. "Brian", "Charlie", "Will")
3. **First message:** leave blank — the user speaks first
4. **System prompt:** put a stub. The real prompt is injected by our proxy. Use:
   ```
   POSITION: {{position}}
   You will receive your full instructions from the custom LLM endpoint.
   ```
5. **LLM:** select **Custom LLM**
   - URL: `https://YOUR-DEPLOY-URL/api/elevenlabs-llm`
   - Model name: `claude-sonnet-debate`
   - API key: leave blank (proxy doesn't validate)
6. **Dynamic variables:** add `position` (string) and `total_rounds` (number)
7. **Turn timeout:** ~30s
8. Copy the **Agent ID** into `.env.local` as `ELEVENLABS_AGENT_ID`

For local dev, expose your dev server with ngrok:
```
ngrok http 3000
```
Then set the agent's Custom LLM URL to `https://<your-ngrok>.ngrok-free.app/api/elevenlabs-llm`.

## .env.local

```
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=sk_...               # rotate first
ELEVENLABS_AGENT_ID=agent_...
GEMINI_API_KEY=...                       # rotate first; only used for image gen
NEXT_PUBLIC_POSTHOG_KEY=                 # optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Run

```
npm run dev
```

Open http://localhost:3000.

## Add the cinematic assets

The hero animations gracefully degrade without these. To get the full experience:

- `public/video/hero-loop.mp4` + `hero-loop.webm` + `hero-poster.jpg` — see `public/video/README.md`
- `public/audio/ambient-pad.mp3` — see `public/audio/README.md`

## File map

```
app/
  page.tsx                       # cinematic landing
  debate/page.tsx                # voice ring
  verdict/[id]/page.tsx          # match recap
  api/
    elevenlabs-llm/              # OAI-compatible proxy → Claude Sonnet
    elevenlabs-signed-url/       # signed URL handshake
    score/                       # Haiku live judge
    verdict/                     # Sonnet final verdict
    daily-prompt/
    og/                          # dynamic OG share card
components/
  landing/      Hero, GlassNav, ScrollStory, BentoUseCases, DemoStrip,
                DailyPromptTeaser, FloatingShards (R3F), CursorGlow, Footer, StatsRibbon
  debate/       DebateRoom, MicOrb, ScoreHUD, RoundIndicator, TranscriptStream, PositionEntry
  verdict/      VerdictView
lib/
  prompts/      debate-system, judge, verdict, daily-prompts
  audio/        ambient (Howler), ui-sfx (WebAudio)
  anthropic, elevenlabs, storage, types, utils, time-aware-tint
hooks/          useReducedMotion, useStreak, useMouseGlow
```

## Architecture

```
[Browser mic] ──► ElevenLabs Conv AI ──► /api/elevenlabs-llm ──► Claude Sonnet
       │                  │                                          ▲
       │                  ├─ partial transcripts ────────────────────┘
       │                  ▼
       │          /api/score (Haiku) ──► Live HUD radial meters
       │
       ▼ end of round 5
       /api/verdict (Sonnet) ──► VerdictView + /api/og share card
```

## Cost (rough)

- Voice (ElevenLabs Conversational AI): ~$0.08/min × 4 min ≈ $0.32
- Haiku scoring (~6 calls × ~600 tokens): ~$0.01
- Sonnet verdict: ~$0.02
- **~$0.35 / 5-round match**

## Deploy

```
vercel deploy
```

Update the ElevenLabs agent's Custom LLM URL to the prod URL.

## Reduced motion

Honors `prefers-reduced-motion: reduce`. Hero video, R3F shards, and CSS transitions are disabled for users with that preference set.

## Roadmap

- Auth (Clerk) + Postgres → leaderboard, cross-device history
- Topic packs · async 1v1 · IG-ready clip export · Freemium paywall

---

Built fast. Will get sharper.
