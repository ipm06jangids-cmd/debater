# Hero video assets

Drop `hero-loop.mp4` and `hero-loop.webm` here.

## Recommended specs (per design doc)

- **Subject:** monumental cathedral of light, slow dolly-in, volumetric god-rays cutting through suspended dust, shallow depth of field, hyper-detailed textures
- **Framerate:** 24fps cinematic
- **Pacing:** 0.5x speed (set on `<video>` via `playbackRate = 0.55` already in `HeroVideo.tsx`)
- **Loop:** identical first and last frame OR a 2-3s cross-dissolve at the end so it loops without a hard cut
- **Resolution:** 4K downsampled to 1920x1080 H.264 (mp4) + VP9 (webm)
- **Bitrate:** ~6 Mbps mp4, ~4 Mbps webm
- **Length:** 10-14s
- **Color grade:** deep obsidian shadows, gold + cyan highlights

## How to generate

Option A — Veo 3 (Google): use the cinematic prompt below in Google Flow.
Option B — Pexels / Storyblocks: search "cathedral light rays cinematic 4K" + custom grade in DaVinci Resolve.
Option C — Sora / Runway Gen-3: prompt below.

```
Slow continuous dolly-in through a vast obsidian cathedral interior. Volumetric god-rays cut through suspended dust particles. Shallow depth of field, deep shadows. 24fps cinematic. Single continuous shot, no cuts. Loops seamlessly — first and last frame identical. Color: black, gold, cyan. No text, no people, no faces. 1920x1080.
```

Also generate a poster: `hero-poster.jpg` (1920x1080, single frame from the video).
