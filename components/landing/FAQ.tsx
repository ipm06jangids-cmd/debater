"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  {
    q: "Is this just chatting with an AI?",
    a: "No. Voice only. You speak, AI speaks back in real time. No keyboard. The constraint is the point — voice is how arguments actually get tested.",
  },
  {
    q: "How is the score calculated?",
    a: "Every rebuttal is judged on three axes: logic (fallacy-free inference), evidence (concrete examples and mechanism), rhetoric (clarity and persuasion). Overall is a weighted blend — 40% logic, 35% evidence, 25% rhetoric. Rubric is calibrated against debate-tournament judging.",
  },
  {
    q: "Will the AI just agree with me?",
    a: "No. The AI is hard-coded to take the opposite stance every time. Even if your position is well-defended, it will steelman the strongest counter. That's the whole product.",
  },
  {
    q: "Can I cheat by stating an obvious position?",
    a: "Try it. The AI will find the strongest minority objection. Even 'water is wet' has a defensible counter (define wet, define water, the question is malformed). The challenge isn't the topic — it's how you defend it under pressure.",
  },
  {
    q: "Is my voice data stored?",
    a: "Voice runs through ElevenLabs Conversational AI in real time. Transcripts stay in your browser localStorage. We don't run a server-side database in v1.",
  },
  {
    q: "How long does a match take?",
    a: "Roughly 4-6 minutes. Five rounds of 30-60 seconds each, plus AI counters. Verdict renders in ~10 seconds after the final round.",
  },
  {
    q: "What if I don't have a position prepared?",
    a: "Use today's prompt — auto-rotated daily. Or hit 'Surprise me' for a random one from a curated 40-topic deck.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32 px-6 bg-obsidian-900 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">Common questions</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 leading-tight text-silver">
            Before you step in.
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-white/[0.02] transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl text-silver pr-4">{it.q}</span>
                  <span
                    className={`text-silver-muted text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-silver-muted leading-relaxed">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
