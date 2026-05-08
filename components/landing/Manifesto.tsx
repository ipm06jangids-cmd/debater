"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { BgVideo } from "./BgVideo";

const LINES = [
  "Hot takes die in voice memos.",
  "If you can't defend it out loud,",
  "you don't actually believe it.",
  "Sparring is the rep.",
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);
  const blurPx = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [12, 0, 0, 8]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section ref={ref} className="relative py-44 px-6 bg-obsidian-950 overflow-hidden">
      <BgVideo
        src="/video/goku.mp4"
        intensity={0.78}
        vignette={0.30}
        speed={0.5}
        tint="linear-gradient(135deg, rgba(212,175,55,0.30) 0%, transparent 50%, rgba(255,138,101,0.25) 100%)"
      />
      <motion.div
        style={{ opacity, filter }}
        className="relative max-w-5xl mx-auto text-center flex flex-col gap-3 z-10"
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
            style={i !== LINES.length - 1 ? { textShadow: "0 4px 30px rgba(0,0,0,0.85)" } : undefined}
          >
            {l}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
