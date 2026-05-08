"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CLIPS = [
  "/video/gojo-lightning.mp4",
  "/video/gear5.mp4",
  "/video/itachi.mp4",
  "/video/2b.mp4",
];
const CYCLE_MS = 9000;

// per-video object-position tweaks so subject stays centered
const POSITION: Record<string, string> = {
  "/video/gojo-lightning.mp4": "center 30%",
  "/video/gear5.mp4": "center 35%",
  "/video/itachi.mp4": "center 40%",
  "/video/2b.mp4": "center 30%",
};

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVid = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fadeOnScroll = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.5, 0]);

  useEffect(() => {
    if (reduced) return;
    const tick = setInterval(() => setActive((a) => (a + 1) % CLIPS.length), CYCLE_MS);
    return () => clearInterval(tick);
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden bg-obsidian-950">
      {!reduced && (
        <motion.div style={{ y: yVid, opacity: fadeOnScroll }} className="absolute inset-0">
          {CLIPS.map((src, i) => (
            <video
              key={src}
              autoPlay
              muted
              playsInline
              loop
              src={src}
              preload={i === 0 ? "auto" : "metadata"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "brightness(1.0) contrast(1.10) saturate(1.10)",
                opacity: i === active ? 1 : 0,
                transition: "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
                objectPosition: POSITION[src] ?? "center",
              }}
              onLoadedMetadata={(e) => {
                (e.currentTarget as HTMLVideoElement).playbackRate = 0.6;
              }}
            />
          ))}
        </motion.div>
      )}
      {/* Color tint blend — subtle */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color opacity-15"
        style={{
          background:
            "linear-gradient(135deg, rgba(125,249,255,0.40) 0%, transparent 35%, rgba(212,175,55,0.30) 65%, rgba(139,107,255,0.40) 100%)",
        }}
      />
      {/* Edge-only vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.45) 80%, rgba(10,10,10,0.80) 100%)",
        }}
      />
      {/* Top + bottom band fade for nav + scroll cue */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0) 78%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      {/* God-ray streaks */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen opacity-25 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.18) 45%, transparent 60%), linear-gradient(85deg, transparent 60%, rgba(125,249,255,0.16) 75%, transparent 90%)",
        }}
      />
      {/* Cycle dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {CLIPS.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all duration-700"
            style={{
              width: i === active ? 28 : 10,
              backgroundColor: i === active ? "rgba(125,249,255,0.85)" : "rgba(232,232,232,0.30)",
              boxShadow: i === active ? "0 0 12px rgba(125,249,255,0.5)" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
