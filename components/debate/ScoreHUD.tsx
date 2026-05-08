"use client";

import { motion } from "framer-motion";

interface ScoreHUDProps {
  logic: number;
  evidence: number;
  rhetoric: number;
  overall: number;
  note?: string;
}

function Meter({ label, value, accent }: { label: string; value: number; accent: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative grid place-items-center rounded-full"
        style={{ width: 96, height: 96 }}
      >
        <div
          className="absolute inset-0 rounded-full radial-meter"
          style={{
            // @ts-expect-error css var
            "--p": v,
            backgroundImage: `conic-gradient(${accent} ${v}%, rgba(255,255,255,0.05) 0)`,
          }}
        />
        <div className="absolute inset-2 rounded-full bg-obsidian-900/80 grid place-items-center">
          <motion.span
            key={v}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl text-silver"
          >
            {Math.round(v)}
          </motion.span>
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-silver-muted">{label}</span>
    </div>
  );
}

export function ScoreHUD({ logic, evidence, rhetoric, overall, note }: ScoreHUDProps) {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-silver-muted">Live judgment</span>
        <span className="font-display text-2xl text-silver">
          {Math.round(overall)}
          <span className="text-silver-muted text-base"> / 100</span>
        </span>
      </div>
      <div className="flex justify-around mb-4">
        <Meter label="Logic" value={logic} accent="rgb(125,249,255)" />
        <Meter label="Evidence" value={evidence} accent="rgb(212,175,55)" />
        <Meter label="Rhetoric" value={rhetoric} accent="rgb(139,107,255)" />
      </div>
      {note && (
        <motion.p
          key={note}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-silver-muted italic border-l border-silver-muted/30 pl-3"
        >
          {note}
        </motion.p>
      )}
    </div>
  );
}
