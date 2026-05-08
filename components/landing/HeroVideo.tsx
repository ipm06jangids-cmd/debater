"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yVid = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.playbackRate = 0.55;
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {!reduced && (
        <motion.div style={{ y: yVid, opacity }} className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            poster="/video/hero-poster.jpg"
            className="w-full h-full object-cover scale-110 brightness-[0.55] contrast-110 saturate-110"
            preload="metadata"
          >
            <source src="/video/hero-loop.webm" type="video/webm" />
            <source src="/video/hero-loop.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
      {/* Volumetric god-rays gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(212,175,55,0.18), transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(125,249,255,0.10), transparent 55%), linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 80%, #0A0A0A 100%)",
        }}
      />
      {/* God-ray sweeping streaks */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen opacity-40"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.12) 45%, transparent 60%), linear-gradient(85deg, transparent 60%, rgba(125,249,255,0.10) 75%, transparent 90%)",
        }}
      />
      {/* Bottom obsidian fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 divider-fade" />
    </div>
  );
}
