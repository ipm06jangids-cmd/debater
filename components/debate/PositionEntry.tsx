"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getDailyPrompt, getRandomPromptDifferentFrom } from "@/lib/prompts/daily-prompts";

interface Props {
  onSubmit: (position: string) => void;
}

export function PositionEntry({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [suggested, setSuggested] = useState<string>(() => getDailyPrompt());

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl flex flex-col gap-6 items-center text-center"
    >
      <div className="text-[10px] uppercase tracking-[0.4em] text-silver-muted">step 1 of 2</div>
      <h2 className="font-display text-3xl md:text-5xl leading-[1.05] shimmer-text">
        State the position you'll defend.
      </h2>
      <p className="text-silver-muted max-w-lg">
        AI will argue the strongest possible counter — five rounds, voice only. Speak naturally. We score every rebuttal in real time.
      </p>
      <div className="w-full glass-strong rounded-2xl p-1.5">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Social media has done more harm than good for democracy."
          className="w-full bg-transparent rounded-xl px-5 py-4 text-base md:text-lg text-silver placeholder:text-silver-dim outline-none resize-none"
          rows={3}
          maxLength={280}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 justify-center">
        <button
          onClick={() => setValue(suggested)}
          className="text-xs uppercase tracking-[0.2em] text-silver-muted hover:text-silver transition"
        >
          Use today's prompt →
        </button>
        <span className="text-silver-dim text-xs">·</span>
        <button
          onClick={() => {
            const next = getRandomPromptDifferentFrom(suggested);
            setSuggested(next);
            setValue(next);
          }}
          className="text-xs uppercase tracking-[0.2em] text-silver-muted hover:text-silver transition"
        >
          Surprise me →
        </button>
      </div>

      <button
        onClick={() => value.trim().length > 8 && onSubmit(value.trim())}
        disabled={value.trim().length < 8}
        className="btn-neon px-10 py-4 rounded-full font-display tracking-wider text-lg disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Step into the ring
      </button>
    </motion.div>
  );
}
