"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_SRC = "/video/moonlit-blade.mp4";
const HERO_POSITION = "center 35%";

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVid = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fadeOnScroll = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.5, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.playbackRate = 0.6;
    v.play().catch(() => {});
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden bg-obsidian-950">
      {/* Persistent CSS aura — always visible */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(125,249,255,0.30), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 70%, rgba(212,175,55,0.25), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 30%, rgba(139,107,255,0.30), transparent 60%), linear-gradient(135deg, #0a0a14 0%, #1a0a1f 50%, #0a1418 100%)",
        }}
      />
      {!reduced && (
        <motion.div style={{ y: yVid, opacity: fadeOnScroll }} className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            src={HERO_SRC}
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.05) contrast(1.10) saturate(1.15)",
              objectPosition: HERO_POSITION,
              opacity: 1,
            }}
          />
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
      {/* Edge-only vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 45%, rgba(10,10,10,0.40) 80%, rgba(10,10,10,0.75) 100%)",
        }}
      />
      {/* Top + bottom band fade */}
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
    </div>
  );
}
