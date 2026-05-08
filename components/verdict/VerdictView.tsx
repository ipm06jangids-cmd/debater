"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { loadMatch } from "@/lib/storage";
import type { MatchState } from "@/lib/types";
import { useStreak } from "@/hooks/useStreak";

function bigNumber(n: number) {
  return Math.round(n).toString();
}

export function VerdictView({ id }: { id: string }) {
  const [match, setMatch] = useState<MatchState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const streak = useStreak();

  useEffect(() => {
    setMatch(loadMatch(id));
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return (
      <div className="min-h-svh grid place-items-center text-silver-muted">Loading…</div>
    );
  }

  if (!match || !match.verdict) {
    return (
      <div className="min-h-svh grid place-items-center px-6">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h1 className="font-display text-3xl text-silver mb-3">Match not found.</h1>
          <p className="text-silver-muted mb-6">
            This verdict isn't on this device. Verdicts are stored locally in v1.
          </p>
          <Link href="/debate" className="btn-neon inline-block px-7 py-3 rounded-full text-sm uppercase tracking-[0.25em]">
            Start a fresh match
          </Link>
        </div>
      </div>
    );
  }

  const v = match.verdict;
  const winnerLabel = v.winner === "user" ? "You took the round" : v.winner === "ai" ? "The AI took it" : "Drawn";
  const accent = v.winner === "user" ? "rgb(125,249,255)" : v.winner === "ai" ? "rgb(212,175,55)" : "rgb(232,232,232)";
  const ogUrl = `/api/og?w=${v.winner}&u=${v.userOverall}&a=${v.aiOverall}&p=${encodeURIComponent(match.position)}&q=${encodeURIComponent(v.bestUserLine.slice(0, 140))}`;

  return (
    <main className="min-h-svh px-6 py-24 max-w-4xl mx-auto flex flex-col gap-10">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-display text-lg text-silver">Sparring</Link>
        <Link href="/debate" className="text-xs uppercase tracking-[0.3em] text-silver-muted hover:text-silver">
          Run it back →
        </Link>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden"
        style={{ boxShadow: `0 0 80px -30px ${accent}` }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 -z-10"
          style={{ background: `radial-gradient(circle at 30% 20%, ${accent}, transparent 60%)` }}
        />

        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">Verdict</span>
          <h1 className="font-display text-4xl md:text-6xl leading-[1] text-silver">{winnerLabel}.</h1>
          <p className="text-silver-muted text-base md:text-lg italic">"{match.position}"</p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-md">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-silver-muted">You</span>
            <span className="font-display text-6xl text-neon-cyan" style={{ textShadow: "0 0 30px rgba(125,249,255,0.5)" }}>
              {bigNumber(v.userOverall)}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-silver-muted">AI</span>
            <span className="font-display text-6xl text-neon-gold" style={{ textShadow: "0 0 30px rgba(212,175,55,0.5)" }}>
              {bigNumber(v.aiOverall)}
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {v.breakdown.map((b, i) => (
            <li key={i} className="flex gap-3 text-silver/90">
              <span className="text-silver-muted font-display text-lg">{i + 1}</span>
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5 border-l-2 border-neon-cyan/50">
            <span className="text-[9px] uppercase tracking-[0.3em] text-silver-muted">Best line</span>
            <p className="text-silver mt-2 italic leading-relaxed">"{v.bestUserLine}"</p>
          </div>
          <div className="glass rounded-xl p-5 border-l-2 border-red-400/40">
            <span className="text-[9px] uppercase tracking-[0.3em] text-silver-muted">Weakest line</span>
            <p className="text-silver/80 mt-2 italic leading-relaxed">"{v.weakestUserLine}"</p>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <span className="text-[9px] uppercase tracking-[0.3em] text-silver-muted">Tomorrow's challenge</span>
          <p className="font-display text-xl text-silver mt-2">{v.nextDayTopic}</p>
        </div>
      </motion.div>

      {/* Round-by-round */}
      <section className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-silver-muted">Round by round</span>
        <div className="grid md:grid-cols-5 gap-3">
          {match.roundScores.map((rs) => (
            <div key={rs.round} className="glass rounded-xl p-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-silver-muted">R{rs.round}</span>
              <div className="font-display text-3xl text-silver mt-1">{Math.round(rs.overall)}</div>
              <p className="text-[11px] text-silver-muted mt-2 leading-snug">{rs.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
        <Link href="/debate" className="btn-neon px-8 py-3 rounded-full text-sm uppercase tracking-[0.25em]">
          Run it back
        </Link>
        <a
          href={ogUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-gold px-8 py-3 rounded-full text-sm uppercase tracking-[0.25em]"
        >
          Open share card
        </a>
        {streak > 0 && (
          <span className="text-neon-gold text-sm font-display">{streak}-day streak ↗</span>
        )}
      </div>
    </main>
  );
}
