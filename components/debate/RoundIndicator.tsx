"use client";

import { cn } from "@/lib/utils";

export function RoundIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Round ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              active ? "w-10 bg-neon-cyan shadow-[0_0_12px_rgba(125,249,255,0.6)]" : done ? "w-6 bg-silver/60" : "w-6 bg-silver/15"
            )}
          />
        );
      })}
      <span className="ml-3 text-[10px] tracking-[0.25em] uppercase text-silver-muted">
        Round {current}/{total}
      </span>
    </div>
  );
}
