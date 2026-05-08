"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  "Hot takes die in voice memos.",
  "If you can't defend it out loud,",
  "you don't actually believe it.",
  "Sparring is the rep.",
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);
  const blurPx = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [12, 0, 0, 8]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.45, 0.45, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.playbackRate = 0.45;
    v.play().catch(() => {});
  }, [reduced]);

  return (
    <section ref={ref} className="relative py-40 px-6 bg-obsidian-950 overflow-hidden">
      {!reduced && (
        <motion.video
          ref={videoRef}
          src="/video/goku.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          style={{ opacity: videoOpacity, scale: videoScale }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-[1.2] saturate-[1.1]"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.55), rgba(10,10,10,0.9) 75%), linear-gradient(135deg, rgba(212,175,55,0.10), transparent 50%, rgba(125,249,255,0.10))",
        }}
      />
      <motion.div
        style={{ opacity, filter }}
        className="relative max-w-5xl mx-auto text-center flex flex-col gap-3"
      >
        {LINES.map((l, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`font-display text-3xl md:text-6xl leading-[1.1] ${
              i === LINES.length - 1 ? "shimmer-text" : "text-silver/95"
            }`}
            style={i !== LINES.length - 1 ? { textShadow: "0 4px 30px rgba(0,0,0,0.7)" } : undefined}
          >
            {l}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
