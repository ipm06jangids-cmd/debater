"use client";

import { motion } from "framer-motion";
import { BgVideo } from "./BgVideo";

const CARDS = [
  {
    label: "Debaters",
    title: "Drill for tournaments",
    body: "Run timed reps the night before nationals. The AI hits the angles your coach won't.",
    span: "md:col-span-2 md:row-span-2",
    glow: "rgba(125,249,255,0.30)",
  },
  {
    label: "Founders",
    title: "Pressure-test the pitch",
    body: "Every objection a VC will raise — voiced, sharpened, in 5 minutes flat.",
    span: "md:col-span-2",
    glow: "rgba(212,175,55,0.28)",
  },
  {
    label: "Law students",
    title: "Moot, every night",
    body: "Argue a position, then argue against yourself. Dismantle your own logic.",
    span: "",
    glow: "rgba(139,107,255,0.24)",
  },
  {
    label: "MUN",
    title: "Caucus-grade reps",
    body: "Defend a country's stance against the strongest possible bloc opposition.",
    span: "",
    glow: "rgba(125,249,255,0.18)",
  },
  {
    label: "Anyone with an opinion",
    title: "Find out if you actually believe it",
    body: "The fastest way to discover that your hot take has soft spots — before you post it.",
    span: "md:col-span-2",
    glow: "rgba(232,232,232,0.18)",
  },
];

export function BentoUseCases() {
  return (
    <section id="use" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <BgVideo
        src="/video/yuta.mp4"
        intensity={0.55}
        vignette={0.55}
        speed={0.55}
        tint="linear-gradient(135deg, rgba(139,107,255,0.30) 0%, transparent 60%, rgba(125,249,255,0.20) 100%)"
      />
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">Who it's for</span>
          <h2
            className="font-display text-4xl md:text-6xl leading-tight mt-3 text-silver"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
          >
            Built for people who still <span className="shimmer-text">argue out loud.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`glass-strong rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group ${c.span}`}
              style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -30px ${c.glow}` }}
            >
              <div
                className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 20%, ${c.glow}, transparent 60%)` }}
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-silver-muted relative">{c.label}</span>
              <div className="relative">
                <h3 className="font-display text-2xl md:text-3xl text-silver leading-tight mb-2">{c.title}</h3>
                <p className="text-sm text-silver-muted leading-relaxed">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
