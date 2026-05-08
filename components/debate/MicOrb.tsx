"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MicOrbProps {
  state: "idle" | "listening" | "ai_speaking" | "scoring" | "ended";
  level?: number;
  onClick?: () => void;
  size?: number;
}

export function MicOrb({ state, level = 0, onClick, size = 220 }: MicOrbProps) {
  const colorByState: Record<MicOrbProps["state"], string> = {
    idle: "rgba(232,232,232,0.55)",
    listening: "rgba(125,249,255,0.95)",
    ai_speaking: "rgba(212,175,55,0.95)",
    scoring: "rgba(139,107,255,0.85)",
    ended: "rgba(232,232,232,0.4)",
  };
  const color = colorByState[state];
  const ringScale = 1 + Math.min(level, 1) * 0.18;

  return (
    <button
      onClick={onClick}
      aria-label={
        state === "idle"
          ? "Start debate"
          : state === "listening"
          ? "Listening — tap to interrupt"
          : "Debate orb"
      }
      className="relative grid place-items-center rounded-full focus:outline-none focus:ring-2 focus:ring-neon-cyan/40"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 80px 10px ${color}, inset 0 0 60px 8px ${color}` }}
        animate={{ scale: state === "ai_speaking" ? [1, 1.05, 1] : ringScale }}
        transition={{ duration: state === "ai_speaking" ? 1.6 : 0.4, repeat: state === "ai_speaking" ? Infinity : 0, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.78,
          height: size * 0.78,
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 60%), ${color}`,
          filter: "blur(0.4px)",
        }}
        animate={{ scale: state === "listening" ? [1, 1.04, 1] : 1 }}
        transition={{ duration: 1.2, repeat: state === "listening" ? Infinity : 0, ease: "easeInOut" }}
      />
      <div
        className={cn(
          "absolute rounded-full glass-strong",
          "grid place-items-center text-center px-4"
        )}
        style={{ width: size * 0.55, height: size * 0.55 }}
      >
        <span className="font-display text-sm md:text-base text-silver/90 leading-tight">
          {state === "idle" && "Tap to begin"}
          {state === "listening" && "Listening"}
          {state === "ai_speaking" && "AI arguing"}
          {state === "scoring" && "Judging"}
          {state === "ended" && "Done"}
        </span>
      </div>
    </button>
  );
}
