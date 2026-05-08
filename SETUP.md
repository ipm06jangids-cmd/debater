# 5-minute setup

```powershell
# 1. Install
cd ai-sparring
npm install

# 2. Rotate keys (open in browser)
#    - https://elevenlabs.io/app/settings/api-keys
#    - https://aistudio.google.com/apikey
#    Get a fresh ANTHROPIC_API_KEY at https://console.anthropic.com/settings/keys

# 3. Configure ElevenLabs agent
#    - Dashboard → Conversational AI → Create Agent
#    - LLM: Custom LLM
#    - URL: http://localhost:3000/api/elevenlabs-llm  (or ngrok tunnel for prod-test)
#    - System prompt stub:
#         POSITION: {{position}}
#         You will receive full instructions from the custom LLM endpoint.
#    - Dynamic variables: position (string), total_rounds (number)
#    - Copy Agent ID

# 4. Fill .env.local with real keys

# 5. Drop in cinematic assets (optional but recommended)
#    public/video/hero-loop.mp4
#    public/video/hero-loop.webm
#    public/video/hero-poster.jpg
#    public/audio/ambient-pad.mp3
#    See per-folder README.md for specs / generation prompts.

# 6. Run
npm run dev
```

Open http://localhost:3000 → click **Step into the ring** → grant mic → debate.

## Local + ElevenLabs

ElevenLabs needs a publicly reachable URL for Custom LLM. Options:

- `npx ngrok http 3000` → use the https URL in agent config
- `npx cloudflared tunnel --url http://localhost:3000` → use the trycloudflare.com URL
- Or deploy to Vercel and point agent there
