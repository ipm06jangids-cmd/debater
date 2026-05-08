"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CLIPS = [
  { src: "/video/gojo-lightning.mp4", duration: 7000 },
  { src: "/video/gear5.mp4", duration: 6500 },
  { src: "/video/itachi.mp4", duration: 7000 },
  { src: "/video/2b.mp4", duration: 6500 },
];

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVid = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);

  useEffect(() => {
    if (reduced) return;
    const tick = setInterval(() => {
      setActive((a) => (a + 1) % CLIPS.length);
    }, CLIPS[active].duration);
    return () => clearInterval(tick);
  }, [active, reduced]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden bg-obsidian-950">
      {!reduced && (
        <motion.div style={{ y: yVid, opacity }} className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.video
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              autoPlay
              muted
              playsInline
              loop
              src={CLIPS[active].src}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.55] contrast-[1.18] saturate-[1.10]"
              preload="auto"
            />
          </AnimatePresence>
        </motion.div>
      )}
      {/* Color grade overlay — push toward obsidian/cyan/gold */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(125,249,255,0.30) 0%, rgba(10,10,10,0.0) 30%, rgba(212,175,55,0.20) 70%, rgba(139,107,255,0.30) 100%)",
        }}
      />
      {/* Vignette + readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(10,10,10,0.20), rgba(10,10,10,0.85) 75%), linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.65) 50%, #0A0A0A 100%)",
        }}
      />
      {/* God-ray sweeps */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.18) 45%, transparent 60%), linear-gradient(85deg, transparent 60%, rgba(125,249,255,0.16) 75%, transparent 90%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 divider-fade" />
    </div>
  );
}
