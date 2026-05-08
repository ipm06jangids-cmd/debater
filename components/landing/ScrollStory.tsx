"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PANELS = [
  {
    n: "01",
    title: "State your position",
    body: "Speak it like you mean it. One claim, sharply defined. The AI reads it, locks the opposite stance, and prepares the strongest possible challenge.",
    accent: "rgb(125,249,255)",
    accentHex: "#7DF9FF",
    video: "/video/gojo-blue.mp4",
    position: "center 30%",
    cue: "Listening · 0:00",
    meter: 23,
  },
  {
    n: "02",
    title: "AI argues the steelman",
    body: "Not strawmen. Not platitudes. The AI takes the hardest version of the counter-argument — concrete, specific, voiced calmly across the podium.",
    accent: "rgb(212,175,55)",
    accentHex: "#D4AF37",
    video: "/video/itachi.mp4",
    position: "center 40%",
    cue: "Counter · 25 words",
    meter: 64,
  },
  {
    n: "03",
    title: "Live judgment as you speak",
    body: "Every rebuttal scored on logic, evidence, and rhetoric. Numbers move while you talk. After five rounds — a verdict, with the line you nailed and the one you fumbled.",
    accent: "rgb(139,107,255)",
    accentHex: "#8B6BFF",
    video: "/video/gojo-lightning.mp4",
    position: "center 30%",
    cue: "Logic 78 · Evidence 64 · Rhetoric 81",
    meter: 81,
  },
];

function PanelSection({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, rootMargin: "100px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.playbackRate = 0.55;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="relative min-h-svh flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Persistent CSS aura */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${panel.accentHex}33, transparent 60%), linear-gradient(135deg, #0a0a14 0%, #14101f 50%, #0a1418 100%)`,
        }}
      />
      {/* Video bg */}
      {!reduced && (
        <video
          ref={videoRef}
          src={panel.video}
          muted
          loop
          playsInline
          autoPlay
          preload={index === 0 ? "auto" : "metadata"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 0.85,
            objectPosition: panel.position,
            filter: "brightness(1.05) contrast(1.10) saturate(1.10)",
          }}
        />
      )}
      {/* Edge vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 35%, rgba(10,10,10,0.50) 80%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 15%, rgba(10,10,10,0) 85%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${panel.accentHex}30 0%, transparent 50%, ${panel.accentHex}20 100%)`,
        }}
      />

      <div className="relative max-w-6xl w-full grid md:grid-cols-[1fr_auto] gap-12 items-center z-10 py-20">
        <div className="grid md:grid-cols-[140px_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-7xl md:text-9xl leading-none"
            style={{ color: panel.accent, textShadow: `0 0 50px ${panel.accent}, 0 0 100px ${panel.accent}40` }}
          >
            {panel.n}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <h3
              className="font-display text-3xl md:text-5xl leading-tight text-silver"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.85)" }}
            >
              {panel.title}
            </h3>
            <p
              className="text-silver-muted text-base md:text-lg leading-relaxed max-w-xl"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
            >
              {panel.body}
            </p>
            <div className="glass-strong rounded-xl px-5 py-4 mt-2 max-w-sm flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: panel.accent, boxShadow: `0 0 12px ${panel.accent}` }}
              />
              <span className="text-[11px] uppercase tracking-[0.2em] text-silver-muted">{panel.cue}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden md:flex flex-col gap-6 w-72"
        >
          <div className="glass-strong rounded-2xl p-5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-silver-muted block mb-3">Strength</span>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${panel.meter}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: panel.accent, boxShadow: `0 0 14px ${panel.accent}` }}
                className="h-full rounded-full"
              />
            </div>
            <span className="font-display text-4xl mt-3 block" style={{ color: panel.accent }}>
              {panel.meter}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {[0.4, 0.7, 0.55, 0.85, 0.6, 0.92, 0.7].map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: h }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                style={{ originX: 0, backgroundColor: panel.accent, opacity: 0.55 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ScrollStory() {
  return (
    <section id="how" className="relative bg-obsidian-950">
      <div className="text-center pt-20 pb-4">
        <span className="text-[10px] uppercase tracking-[0.5em] text-silver-muted">The Loop</span>
      </div>
      {PANELS.map((p, i) => (
        <PanelSection key={p.n} panel={p} index={i} />
      ))}
    </section>
  );
}
