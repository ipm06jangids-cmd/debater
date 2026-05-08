"use client";

import { motion } from "framer-motion";

const STATS = [
  { n: "5", label: "Rounds per match" },
  { n: "<1.5s", label: "Voice latency" },
  { n: "3", label: "Live score axes" },
  { n: "∞", label: "Daily prompts" },
];

export function StatsRibbon() {
  return (
    <section className="relative py-16 px-6 border-y border-white/5 bg-obsidian-900/60">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-5xl md:text-6xl shimmer-text">{s.n}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-silver-muted mt-2">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
