"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Turn } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TranscriptStream({ turns }: { turns: Turn[] }) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl">
      <AnimatePresence initial={false}>
        {turns.slice(-6).map((t, i) => (
          <motion.div
            key={`${t.timestamp}-${i}`}
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "px-4 py-3 rounded-xl text-[15px] leading-relaxed max-w-[85%]",
              t.role === "user"
                ? "self-end bg-neon-cyan/10 border border-neon-cyan/25 text-silver"
                : "self-start glass text-silver/90"
            )}
          >
            <span className="block text-[9px] uppercase tracking-[0.25em] text-silver-muted mb-1">
              {t.role === "user" ? "you" : "ai"} · r{t.round}
            </span>
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
