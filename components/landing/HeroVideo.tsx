"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_SRC = "/video/moonlit-blade.mp4";
const HERO_POSITION = "center 35%";

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVid = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fadeOnScroll = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.5, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.playbackRate = 0.6;
    const onCanPlay = () => {
      v.play().then(() => setPlaying(true)).catch(() => {});
    };
    v.addEventListener("canplay", onCanPlay);
    v.load();
    v.play().then(() => setPlaying(true)).catch(() => {});
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      {/* Vivid CSS aura — ALWAYS visible (anime vibe even before video loads) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(125,249,255,0.55), transparent 65%), radial-gradient(ellipse 50% 40% at 15% 75%, rgba(212,175,55,0.45), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 25%, rgba(139,107,255,0.55), transparent 65%), radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,138,101,0.20), transparent 70%), linear-gradient(135deg, #0a0a18 0%, #1a0828 30%, #08101e 60%, #1a1018 100%)",
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
              filter: "brightness(0.85) contrast(1.10) saturate(1.15)",
              objectPosition: HERO_POSITION,
              opacity: 0.82,
            }}
          />
        </motion.div>
      )}
      {/* Color tint */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color opacity-15"
        style={{
          background:
            "linear-gradient(135deg, rgba(125,249,255,0.40) 0%, transparent 35%, rgba(212,175,55,0.30) 65%, rgba(139,107,255,0.40) 100%)",
        }}
      />
      {/* Center darkening behind text — dark navy/black for contrast */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(5,8,20,0.70) 0%, rgba(5,8,20,0.45) 40%, rgba(10,10,10,0.20) 70%, rgba(10,10,10,0.55) 100%)",
        }}
      />
      {/* Top + bottom band */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,20,0.65) 0%, rgba(5,8,20,0.10) 18%, rgba(5,8,20,0.10) 80%, rgba(10,10,10,0.75) 100%)",
        }}
      />
      {/* God-rays */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen opacity-35 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.25) 45%, transparent 60%), linear-gradient(85deg, transparent 60%, rgba(125,249,255,0.20) 75%, transparent 90%)",
        }}
      />
      {!playing && !reduced && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-silver-dim z-10 animate-pulse">
          loading video…
        </div>
      )}
    </div>
  );
}
