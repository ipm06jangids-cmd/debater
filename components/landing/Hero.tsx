"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroVideo } from "./HeroVideo";
import { FloatingShards } from "./FloatingShards";

export function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center px-6 overflow-hidden">
      <HeroVideo />
      <FloatingShards />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-silver-muted glass px-4 py-2 rounded-full"
        >
          Voice-first · 5 rounds · Live judgment
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight"
        >
          <span className="shimmer-text">Argue out loud.</span>
          <br />
          <span className="text-silver/95">Get smarter on contact.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="text-base md:text-xl text-silver-muted max-w-2xl leading-relaxed"
        >
          State a position. AI argues the strongest possible counter — voice to voice. Five rounds. A live meter scores your logic, evidence, and rhetoric in real time. Walk away with a verdict, not a vibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <Link
            href="/debate"
            className="btn-neon px-9 py-4 rounded-full font-display text-lg tracking-wide animate-glow"
          >
            Step into the ring
          </Link>
          <a
            href="#how"
            className="text-xs uppercase tracking-[0.3em] text-silver-muted hover:text-silver transition"
          >
            See how it works ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-silver-dim">Scroll</span>
          <span className="block w-[1px] h-10 bg-gradient-to-b from-silver-muted to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
