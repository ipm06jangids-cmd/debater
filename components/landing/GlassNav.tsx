"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useStreak } from "@/hooks/useStreak";

export function GlassNav() {
  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 200], [12, 36]);
  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(150%)`;
  const backgroundColor = useTransform(
    scrollY,
    [0, 200],
    ["rgba(10,10,10,0.30)", "rgba(10,10,10,0.65)"],
  );
  const streak = useStreak();

  return (
    <motion.header
      style={{ backdropFilter, WebkitBackdropFilter: backdropFilter, backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 border-b border-white/5"
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="block w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_18px_rgba(125,249,255,0.8)]" />
          <span className="font-display text-xl tracking-wide text-silver">Sparring</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-silver-muted">
          <a href="#how" className="hover:text-silver transition">How</a>
          <a href="#use" className="hover:text-silver transition">Who</a>
          <a href="#today" className="hover:text-silver transition">Today</a>
          {streak > 0 && (
            <span className="text-neon-gold font-display text-sm normal-case tracking-normal">
              {streak}-day streak
            </span>
          )}
        </div>
        <Link
          href="/debate"
          className="btn-neon px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.25em]"
        >
          Begin
        </Link>
      </div>
    </motion.header>
  );
}
