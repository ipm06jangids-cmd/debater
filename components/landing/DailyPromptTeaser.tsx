"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStreak } from "@/hooks/useStreak";
import { getDailyPrompt } from "@/lib/prompts/daily-prompts";

export function DailyPromptTeaser() {
  const streak = useStreak();
  const prompt = getDailyPrompt();
  const today = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric" });

  return (
    <section id="today" className="relative py-32 px-6 bg-obsidian-950 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.10), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(125,249,255,0.08), transparent 50%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">
          Today · {today}
          {streak > 0 && (
            <span className="ml-3 text-neon-gold">
              {streak} day streak ↗
            </span>
          )}
        </span>
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl md:text-6xl leading-[1.05] mt-8 text-silver"
        >
          "{prompt}"
        </motion.blockquote>
        <p className="text-silver-muted mt-6 text-sm uppercase tracking-[0.3em]">
          Defend it. Or take the other side.
        </p>
        <Link
          href="/debate"
          className="btn-gold inline-block mt-10 px-9 py-4 rounded-full font-display text-lg tracking-wide"
        >
          Begin today's match →
        </Link>
      </div>
    </section>
  );
}
