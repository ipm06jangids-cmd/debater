"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CLIPS = [
  "/video/gojo-lightning.mp4",
  "/video/gear5.mp4",
  "/video/itachi.mp4",
  "/video/2b.mp4",
];
const CLIP_DURATION = 8500;

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVid = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);

  useEffect(() => {
    if (reduced) return;
    const tick = setInterval(() => setActive((a) => (a + 1) % CLIPS.length), CLIP_DURATION);
    return () => clearInterval(tick);
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden bg-obsidian-950">
      {!reduced && (
        <motion.div style={{ y: yVid, opacity }} className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.video
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              autoPlay
              muted
              playsInline
              loop
              src={CLIPS[active]}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.92) contrast(1.10) saturate(1.10)" }}
              preload="auto"
              onLoadedMetadata={(e) => {
                (e.target as HTMLVideoElement).playbackRate = 0.65;
              }}
            />
          </AnimatePresence>
        </motion.div>
      )}
      {/* Cinematic color tint — subtle */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color opacity-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(125,249,255,0.40) 0%, transparent 35%, rgba(212,175,55,0.30) 65%, rgba(139,107,255,0.40) 100%)",
        }}
      />
      {/* Edge vignette only — keep center bright */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(10,10,10,0) 35%, rgba(10,10,10,0.60) 80%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      {/* Top + bottom fade only */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.05) 25%, rgba(10,10,10,0.05) 70%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      {/* God-ray streaks */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen opacity-25 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.20) 45%, transparent 60%), linear-gradient(85deg, transparent 60%, rgba(125,249,255,0.18) 75%, transparent 90%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 divider-fade" />
    </div>
  );
}
