"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const PANELS = [
  {
    n: "01",
    title: "State your position",
    body: "Speak it like you mean it. One claim, sharply defined. The AI reads it, locks the opposite stance, and prepares the strongest possible challenge.",
    accent: "rgb(125,249,255)",
  },
  {
    n: "02",
    title: "AI argues the steelman",
    body: "Not strawmen. Not platitudes. The AI takes the hardest version of the counter-argument — concrete, specific, voiced calmly across the podium.",
    accent: "rgb(212,175,55)",
  },
  {
    n: "03",
    title: "Live judgment as you speak",
    body: "Every rebuttal scored on logic, evidence, and rhetoric. Numbers move while you talk. After five rounds — a verdict, with the line you nailed and the one you fumbled.",
    accent: "rgb(139,107,255)",
  },
];

function Dot({ progress, index, accent }: { progress: MotionValue<number>; index: number; accent: string }) {
  const op = useTransform(progress, [index / 3, (index + 0.5) / 3, (index + 1) / 3], [0.2, 1, 0.2]);
  return (
    <motion.span
      style={{ opacity: op, backgroundColor: accent }}
      className="w-8 h-1 rounded-full"
    />
  );
}

function Panel({
  panel,
  progress,
  index,
}: {
  panel: typeof PANELS[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const localProgress = useTransform(progress, [index / 3, (index + 1) / 3], [0, 1]);
  const opacity = useTransform(localProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(localProgress, [0, 1], [40, -40]);
  const scale = useTransform(localProgress, [0, 0.5, 1], [0.95, 1, 0.97]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="max-w-3xl w-full grid md:grid-cols-[120px_1fr] gap-8 items-start">
        <div
          className="font-display text-7xl md:text-8xl leading-none"
          style={{ color: panel.accent, textShadow: `0 0 40px ${panel.accent}` }}
        >
          {panel.n}
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-display text-3xl md:text-5xl leading-tight text-silver">{panel.title}</h3>
          <p className="text-silver-muted text-base md:text-lg leading-relaxed max-w-xl">{panel.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bg = useTransform(scrollYProgress, [0, 1], ["#0F0F0F", "#050505"]);

  return (
    <motion.section
      ref={ref}
      id="how"
      style={{ backgroundColor: bg }}
      className="relative h-[220vh]"
    >
      <div className="sticky top-0 h-svh flex items-center justify-center overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-silver-muted">
          The Loop
        </div>
        {PANELS.map((p, i) => (
          <Panel key={p.n} panel={p} progress={scrollYProgress} index={i} />
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {PANELS.map((p, i) => (
            <Dot key={p.n} progress={scrollYProgress} index={i} accent={p.accent} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
