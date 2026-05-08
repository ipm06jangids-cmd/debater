"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const FIGHTERS = [
  {
    name: "The Strategist",
    char: "Itachi-class",
    src: "/video/itachi.mp4",
    accent: "rgb(139,107,255)",
    desc: "Reads three moves ahead. Sets traps the AI walks into. Wins by composition.",
    metric: "Logic-heavy",
  },
  {
    name: "The Striker",
    char: "Gojo-class",
    src: "/video/gojo-lightning.mp4",
    accent: "rgb(125,249,255)",
    desc: "Overwhelming presence. One devastating point that ends the round.",
    metric: "Rhetoric-heavy",
  },
  {
    name: "The Awakened",
    char: "Gear 5-class",
    src: "/video/gear5.mp4",
    accent: "rgb(255,138,101)",
    desc: "Unpredictable, plays by no rules. Bends the frame of the debate itself.",
    metric: "Wildcard",
  },
  {
    name: "The Operator",
    char: "2B-class",
    src: "/video/2b.mp4",
    accent: "rgb(212,175,55)",
    desc: "Cold, surgical, precision evidence. Dismantles arguments at the joints.",
    metric: "Evidence-heavy",
  },
];

function Card({ f, i }: { f: (typeof FIGHTERS)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
      className="relative aspect-[4/5] rounded-3xl overflow-hidden glass cursor-pointer group"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px -40px ${f.accent}` }}
    >
      <video
        ref={videoRef}
        src={f.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.55] contrast-[1.10] saturate-[1.05] group-hover:brightness-[0.75] group-hover:scale-105 transition-all duration-1000 ease-out"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.95) 100%), radial-gradient(circle at 50% 30%, ${f.accent}25, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px ${f.accent}55, 0 0 80px ${f.accent}50` }}
      />
      <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[9px] uppercase tracking-[0.35em] text-silver-muted glass px-2.5 py-1 rounded-full">
            {f.char}
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 rounded-full"
            style={{ color: f.accent, border: `1px solid ${f.accent}55`, backgroundColor: `${f.accent}12` }}
          >
            {f.metric}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h3
            className="font-display text-3xl md:text-4xl text-silver leading-tight"
            style={{ textShadow: `0 0 20px ${f.accent}40` }}
          >
            {f.name}
          </h3>
          <p className="text-sm text-silver/85 leading-relaxed">{f.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function FightersGrid() {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-obsidian-950 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(125,249,255,0.10), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(212,175,55,0.10), transparent 50%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">Find your archetype</span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mt-4 text-silver">
            Every debater has a <span className="shimmer-text">fighting style.</span>
          </h2>
          <p className="text-silver-muted mt-5 text-base md:text-lg leading-relaxed">
            Five rounds in, you'll know which one is yours. The AI adapts pressure to match — and exploits the gap.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FIGHTERS.map((f, i) => (
            <Card key={f.name} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
