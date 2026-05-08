"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

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
    <section ref={ref} className="relative py-40 px-6 bg-obsidian-950 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.10), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(125,249,255,0.08), transparent 50%)",
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
          >
            {l}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
