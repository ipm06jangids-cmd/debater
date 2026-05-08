# Deploy to Vercel — exact steps

Repo is live at: **https://github.com/ipm06jangids-cmd/debater**

Build verified locally: ✓ compiles, ✓ typechecks, ✓ generates 11 routes.

---

## 1. Rotate keys (do this first, takes 3 min)

Old keys leaked in chat. Generate new:

| Service | URL | Action |
|---------|-----|--------|
| GitHub PAT | https://github.com/settings/tokens | Revoke `ghp_4WaH...` |
| ElevenLabs | https://elevenlabs.io/app/settings/api-keys | Revoke + create new |
| Gemini | https://aistudio.google.com/apikey | Revoke + create new |
| Anthropic | https://console.anthropic.com/settings/keys | Create new |

Save new keys somewhere offline (1Password / notes app).

---

## 2. Set up ElevenLabs Conversational Agent

1. https://elevenlabs.io/app/conversational-ai → **Create Agent**
2. **Name:** Sparring Debate Partner
3. **Voice:** "Brian" (British, calm, authoritative). Or "Charlie" / "Will".
4. **First message:** leave blank
5. **System prompt:**
   ```
   POSITION: {{position}}
   You will receive your full instructions from the Custom LLM endpoint.
   ```
6. **LLM:** select **Custom LLM**
   - URL: leave blank for now (will fill after Vercel deploy)
   - Model name: `claude-sonnet-debate`
   - API key: blank
7. **Dynamic variables:** add two:
   - `position` (string, default: `"the topic"`)
   - `total_rounds` (number, default: `5`)
8. **Turn timeout:** 30s
9. **Max conversation duration:** 600s (10 min)
10. Save → copy the **Agent ID** (looks like `agent_xxx...`)

---

## 3. Deploy to Vercel

### Option A — Vercel dashboard (easiest)

1. Go to https://vercel.com/new
2. **Import Git Repository** → paste `https://github.com/ipm06jangids-cmd/debater`
3. Vercel auto-detects Next.js. Leave defaults.
4. **Environment Variables** — add these:

   | Name | Value |
   |------|-------|
   | `ANTHROPIC_API_KEY` | `sk-ant-...` (new key) |
   | `ELEVENLABS_API_KEY` | `sk_...` (new key) |
   | `ELEVENLABS_AGENT_ID` | `agent_...` (from step 2) |
   | `NEXT_PUBLIC_APP_URL` | will update after first deploy |

5. **Deploy** → wait ~90s → copy the prod URL (e.g. `https://debater-xxx.vercel.app`)
6. Vercel → Project → Settings → Environment Variables → set `NEXT_PUBLIC_APP_URL` to the prod URL → **Redeploy**

### Option B — CLI

```powershell
cd "C:\Users\khatu shyam\Desktop\CCLLAAUUDDEE\ai-sparring"
npx vercel
# follow prompts — link to your account, accept defaults
npx vercel env add ANTHROPIC_API_KEY production
npx vercel env add ELEVENLABS_API_KEY production
npx vercel env add ELEVENLABS_AGENT_ID production
npx vercel env add NEXT_PUBLIC_APP_URL production
npx vercel --prod
```

---

## 4. Wire ElevenLabs → Vercel

1. Back to ElevenLabs agent dashboard
2. **LLM → Custom LLM URL:**
   ```
   https://YOUR-VERCEL-URL.vercel.app/api/elevenlabs-llm
   ```
3. Save

---

## 5. Smoke test prod

1. Open `https://YOUR-VERCEL-URL.vercel.app`
2. Landing should render full cinematic experience (minus video — see step 6)
3. Click **Step into the ring** → grant mic → speak a position → AI should counter in voice in <2s
4. Complete 5 rounds → verdict should render with scores + best/worst lines

---

## 6. Add cinematic assets (optional — site works without)

The site has graceful fallback gradients. To get the full hero experience:

- Generate hero video (4K, 12s loop, god-rays cathedral) via Veo / Runway / Sora
- Save as `public/video/hero-loop.mp4` + `public/video/hero-loop.webm` + `public/video/hero-poster.jpg`
- Generate ambient pad audio via ElevenLabs Sound FX → save as `public/audio/ambient-pad.mp3`
- Specs in `public/video/README.md` and `public/audio/README.md`
- Commit + push → Vercel auto-redeploys

---

## 7. Custom domain (optional)

1. Buy domain at Porkbun / Namecheap (`sparring.ai` ~$70/yr, `argueai.com` ~$15/yr)
2. Vercel → Project → Settings → Domains → Add → follow DNS instructions
3. Update `NEXT_PUBLIC_APP_URL` → redeploy

---

## What's already done for you

- ✓ Repo created + pushed (`https://github.com/ipm06jangids-cmd/debater`)
- ✓ Build verified locally — TypeScript clean, all 11 routes compile
- ✓ React 19 + R3F v9 + Next 15.5 stack stable
- ✓ All prompts, API routes, components, pages written
- ✓ `.env.example` for reference; `.env.local` gitignored
- ✓ Reduced-motion + a11y baked in
- ✓ OG share card endpoint working

## What you must do (irreversible / requires your auth)

- Rotate the 4 leaked tokens
- Create ElevenLabs agent (their dashboard, can't be scripted)
- Connect Vercel to your GitHub (one-time auth)
- Deploy
- Wire ElevenLabs URL → Vercel URL

Total time: ~15 min.
