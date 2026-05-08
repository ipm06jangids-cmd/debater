"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CLIPS = [
  { src: "/video/gear5.mp4", pos: "center 35%" },          // 9MB — smallest, loads first
  { src: "/video/itachi.mp4", pos: "center 40%" },         // 15MB
  { src: "/video/2b.mp4", pos: "center 30%" },             // 22MB
  { src: "/video/gojo-lightning.mp4", pos: "center 30%" }, // 29MB
];
const CYCLE_MS = 9000;

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
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
      {/* Persistent CSS aura — always visible BEFORE/UNDER video so hero is never empty black */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(125,249,255,0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 70%, rgba(212,175,55,0.22), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 30%, rgba(139,107,255,0.25), transparent 60%), linear-gradient(135deg, #0a0a14 0%, #1a0a1f 50%, #0a1418 100%)",
        }}
      />
      {!reduced && (
        <motion.div style={{ y: yVid, opacity: fadeOnScroll }} className="absolute inset-0">
          {CLIPS.map((c, i) => (
            <video
              key={c.src}
              autoPlay
              muted
              playsInline
              loop
              src={c.src}
              preload={i === 0 ? "auto" : "metadata"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "brightness(1.05) contrast(1.10) saturate(1.15)",
                opacity: i === active ? 1 : 0,
                transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                objectPosition: c.pos,
              }}
              onLoadedData={() => setLoaded((s) => new Set(s).add(i))}
              onLoadedMetadata={(e) => {
                (e.currentTarget as HTMLVideoElement).playbackRate = 0.6;
              }}
            />
          ))}
        </motion.div>
      )}
      {/* Subtle color tint */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color opacity-15"
        style={{
          background:
            "linear-gradient(135deg, rgba(125,249,255,0.40) 0%, transparent 35%, rgba(212,175,55,0.30) 65%, rgba(139,107,255,0.40) 100%)",
        }}
      />
      {/* Edge-only vignette — center stays bright */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 45%, rgba(10,10,10,0.40) 80%, rgba(10,10,10,0.75) 100%)",
        }}
      />
      {/* Top + bottom fade for nav + scroll cue */}
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
        className="absolute inset-0 mix-blend-screen opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.20) 45%, transparent 60%), linear-gradient(85deg, transparent 60%, rgba(125,249,255,0.18) 75%, transparent 90%)",
        }}
      />
      {/* Cycle indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {CLIPS.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all duration-700"
            style={{
              width: i === active ? 32 : 10,
              backgroundColor: i === active ? "rgba(125,249,255,0.85)" : "rgba(232,232,232,0.30)",
              boxShadow: i === active ? "0 0 12px rgba(125,249,255,0.5)" : undefined,
            }}
            aria-hidden
          />
        ))}
      </div>
      {/* Loaded debug */}
      {loaded.size === 0 && !reduced && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-silver-dim z-10 animate-pulse">
          loading
        </div>
      )}
    </div>
  );
}
