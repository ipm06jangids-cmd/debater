"use client";

import { motion } from "framer-motion";
import { BgVideo } from "./BgVideo";

const SAMPLE = [
  { role: "user" as const, text: "Social media has done more harm than good for democracy.", score: 64 },
  { role: "ai" as const, text: "Define harm precisely. Voter turnout climbed in every G20 nation since 2010 — exactly the era of social platforms. Which mechanism specifically caused decline?" },
  { role: "user" as const, text: "Algorithmic feeds optimize for outrage. The Pew study showed a thirty-point jump in partisan animosity in a decade.", score: 78 },
  { role: "ai" as const, text: "Pew measures self-reported feeling, not democratic outcome. Show me a single election where outrage-feeds caused a measurable institutional collapse." },
];

export function DemoStrip() {
  return (
    <section className="relative py-28 px-6 overflow-hidden border-t border-white/5">
      <BgVideo
        src="/video/moonlit-blade.mp4"
        intensity={0.65}
        vignette={0.40}
        speed={0.5}
        tint="linear-gradient(135deg, rgba(125,249,255,0.25) 0%, transparent 50%, rgba(139,107,255,0.20) 100%)"
      />
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">A real exchange</span>
          <h2
            className="font-display text-3xl md:text-5xl mt-3 text-silver leading-tight"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
          >
            What 30 seconds of <span className="shimmer-text">sparring</span> sounds like.
          </h2>
        </div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 flex flex-col gap-3">
          {SAMPLE.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: t.role === "user" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-5 py-4 rounded-2xl text-[15px] md:text-base leading-relaxed ${
                  t.role === "user"
                    ? "bg-neon-cyan/10 border border-neon-cyan/30 text-silver"
                    : "bg-white/[0.03] border border-white/10 text-silver/90"
                }`}
              >
                <span className="block text-[9px] uppercase tracking-[0.3em] text-silver-muted mb-1">
                  {t.role === "user" ? "you" : "ai"}{" "}
                  {t.role === "user" && t.score && (
                    <span className="text-neon-cyan ml-2">+{t.score}</span>
                  )}
                </span>
                {t.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
