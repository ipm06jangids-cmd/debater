"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAudioPref, setAudioPref } from "@/lib/storage";
import { startAmbient, stopAmbient } from "@/lib/audio/ambient";

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
    <footer className="relative py-20 px-6 border-t border-white/5 bg-obsidian-950">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
        <span className="font-display text-4xl md:text-6xl text-silver leading-tight max-w-3xl">
          The next argument is the rep that compounds.
        </span>
        <Link
          href="/debate"
          className="btn-neon px-10 py-4 rounded-full font-display text-lg tracking-wide"
        >
          Step in →
        </Link>
        <div className="flex items-center gap-6 mt-6 text-xs uppercase tracking-[0.3em] text-silver-muted">
          <button onClick={toggleAudio} className="hover:text-silver transition" aria-pressed={audio}>
            {audio ? "Ambient · on" : "Ambient · off"}
          </button>
          <span>·</span>
          <a href="https://github.com" className="hover:text-silver transition">
            Source
          </a>
          <span>·</span>
          <a href="mailto:hello@sparring.ai" className="hover:text-silver transition">
            Contact
          </a>
        </div>
        <p className="text-silver-dim text-[10px] uppercase tracking-[0.3em] mt-4">
          Sparring · Built for people who want their thinking pressure-tested.
        </p>
      </div>
    </footer>
  );
}
