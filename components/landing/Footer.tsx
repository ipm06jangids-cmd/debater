"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAudioPref, setAudioPref } from "@/lib/storage";
import { startAmbient, stopAmbient } from "@/lib/audio/ambient";
import { BgVideo } from "./BgVideo";

export function Footer() {
  const [audio, setAudio] = useState(false);

  useEffect(() => {
    setAudio(getAudioPref());
  }, []);

  function toggleAudio() {
    const next = !audio;
    setAudio(next);
    setAudioPref(next);
    if (next) startAmbient();
    else stopAmbient();
  }

  return (
    <footer className="relative py-24 px-6 border-t border-white/5 overflow-hidden">
      <BgVideo
        src="/video/gojo-blue.mp4"
        intensity={0.55}
        vignette={0.55}
        speed={0.45}
        tint="linear-gradient(135deg, rgba(125,249,255,0.30) 0%, transparent 50%, rgba(139,107,255,0.25) 100%)"
      />
      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center gap-8 z-10">
        <span
          className="font-display text-4xl md:text-6xl text-silver leading-tight max-w-3xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.85)" }}
        >
          The next argument is the rep that compounds.
        </span>
        <Link
          href="/debate"
          className="btn-neon px-10 py-4 rounded-full font-display text-lg tracking-wide animate-glow"
        >
          Step in →
        </Link>
        <div className="flex items-center gap-6 mt-6 text-xs uppercase tracking-[0.3em] text-silver-muted">
          <button onClick={toggleAudio} className="hover:text-silver transition" aria-pressed={audio}>
            {audio ? "Ambient · on" : "Ambient · off"}
          </button>
          <span>·</span>
          <a href="https://github.com/ipm06jangids-cmd/debater" className="hover:text-silver transition">
            Source
          </a>
          <span>·</span>
          <a href="mailto:hello@sparring.ai" className="hover:text-silver transition">
            Contact
          </a>
        </div>
        <p className="text-silver-dim text-[10px] uppercase tracking-[0.3em] mt-2">
          Sparring · Built for people who want their thinking pressure-tested.
        </p>
      </div>
    </footer>
  );
}
