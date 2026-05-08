"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useMotionTemplate } from "framer-motion";

const PANELS = [
  {
    n: "01",
    title: "State your position",
    body: "Speak it like you mean it. One claim, sharply defined. The AI reads it, locks the opposite stance, and prepares the strongest possible challenge.",
    accent: "rgb(125,249,255)",
    video: "/video/gojo-blue.mp4",
    position: "center 30%",
    cue: "Listening · 0:00",
  },
  {
    n: "02",
    title: "AI argues the steelman",
    body: "Not strawmen. Not platitudes. The AI takes the hardest version of the counter-argument — concrete, specific, voiced calmly across the podium.",
    accent: "rgb(212,175,55)",
    video: "/video/itachi.mp4",
    position: "center 35%",
    cue: "Counter · 25 words",
  },
  {
    n: "03",
    title: "Live judgment as you speak",
    body: "Every rebuttal scored on logic, evidence, and rhetoric. Numbers move while you talk. After five rounds — a verdict, with the line you nailed and the one you fumbled.",
    accent: "rgb(139,107,255)",
    video: "/video/gojo-lightning.mp4",
    position: "center 30%",
    cue: "Logic 78 · Evidence 64 · Rhetoric 81",
  },
];

function Dot({ progress, index, accent }: { progress: MotionValue<number>; index: number; accent: string }) {
  const op = useTransform(progress, [(index - 0.4) / 3, index / 3, (index + 0.6) / 3], [0.2, 1, 0.2]);
  return <motion.span style={{ opacity: op, backgroundColor: accent }} className="w-8 h-1 rounded-full" />;
}

function VideoLayer({
  src,
  position,
  progress,
  index,
}: {
  src: string;
  position: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // wider visibility window so each panel video shows clearly
  const opacity = useTransform(
    progress,
    [
      Math.max(0, (index - 0.5) / 3),
      index / 3,
      (index + 0.7) / 3,
      Math.min(1, (index + 1.2) / 3),
    ],
    [0, 0.85, 0.80, 0],
  );
  const scale = useTransform(progress, [index / 3, (index + 1) / 3], [1.04, 1.12]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 0.55;
    v.play().catch(() => {});
  }, []);

  return (
    <motion.video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      style={{ opacity, scale, objectPosition: position }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function Panel({
  panel,
  progress,
  index,
}: {
  panel: (typeof PANELS)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const localProgress = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1]);
  const opacity = useTransform(localProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(localProgress, [0, 1], [40, -40]);
  const scale = useTransform(localProgress, [0, 0.5, 1], [0.96, 1, 0.97]);
  const meterFill = useTransform(localProgress, [0.1, 0.85], [0, 100]);
  const meterPct = useMotionTemplate`${meterFill}%`;
  const meterRound = useTransform(meterFill, (v) => Math.round(v));

  return (
    <motion.div style={{ opacity, y, scale }} className="absolute inset-0 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-[1fr_auto] gap-12 items-center">
        <div className="grid md:grid-cols-[140px_1fr] gap-8 items-start">
          <div
            className="font-display text-7xl md:text-9xl leading-none"
            style={{ color: panel.accent, textShadow: `0 0 50px ${panel.accent}, 0 0 100px ${panel.accent}40` }}
          >
            {panel.n}
          </div>
          <div className="flex flex-col gap-5">
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
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-6 w-72">
          <div className="glass-strong rounded-2xl p-5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-silver-muted block mb-3">Strength</span>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                style={{ width: meterPct, backgroundColor: panel.accent, boxShadow: `0 0 14px ${panel.accent}` }}
                className="h-full rounded-full"
              />
            </div>
            <motion.span style={{ color: panel.accent }} className="font-display text-4xl mt-3 block">
              <motion.span>{meterRound}</motion.span>
            </motion.span>
          </div>
          <div className="flex flex-col gap-2">
            {[0.4, 0.7, 0.55, 0.85, 0.6, 0.92, 0.7].map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: h }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                style={{ originX: 0, backgroundColor: panel.accent, opacity: 0.55 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} id="how" className="relative h-[220vh] bg-obsidian-950">
      {/* Bg videos cover entire section, NOT just sticky inner */}
      <div className="absolute inset-0 overflow-hidden">
        {PANELS.map((p, i) => (
          <VideoLayer key={p.n} src={p.video} position={p.position} progress={scrollYProgress} index={i} />
        ))}
        {/* Edge vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 30%, rgba(10,10,10,0.45) 75%, rgba(10,10,10,0.80) 100%)",
          }}
        />
        {/* Top + bottom fade for section transitions */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.0) 12%, rgba(10,10,10,0.0) 88%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        {/* Color tint */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-color opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(125,249,255,0.30) 0%, transparent 40%, rgba(212,175,55,0.30) 100%)",
          }}
        />
      </div>

      {/* Sticky pinned content */}
      <div className="sticky top-0 h-svh flex items-center justify-center overflow-hidden z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-silver-muted z-10">
          The Loop
        </div>
        {PANELS.map((p, i) => (
          <Panel key={p.n} panel={p} progress={scrollYProgress} index={i} />
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {PANELS.map((p, i) => (
            <Dot key={p.n} progress={scrollYProgress} index={i} accent={p.accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
