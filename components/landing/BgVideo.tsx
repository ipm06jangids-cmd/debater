"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  src: string;
  /** 0..1 — actual <video> brightness/opacity */
  intensity?: number;
  /** vignette darkness — 0..1 of black at edges */
  vignette?: number;
  /** color tint overlay (cyan/gold/violet etc) */
  tint?: string;
  /** playback speed */
  speed?: number;
  /** className passthrough on outer div */
  className?: string;
}

export function BgVideo({
  src,
  intensity = 0.85,
  vignette = 0.45,
  tint,
  speed = 0.55,
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05, rootMargin: "200px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.playbackRate = speed;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, reduced, speed]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {!reduced && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: intensity,
            filter: `brightness(0.92) contrast(1.10) saturate(1.08)`,
          }}
        />
      )}
      {/* Vignette + dark fade — keeps text readable, lets center video glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 30%, rgba(10,10,10,${vignette + 0.15}) 75%, rgba(10,10,10,${Math.min(vignette + 0.35, 0.95)}) 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(10,10,10,${vignette * 0.35}) 0%, rgba(10,10,10,${vignette * 0.15}) 30%, rgba(10,10,10,${vignette * 0.15}) 70%, rgba(10,10,10,${vignette + 0.25}) 100%)`,
        }}
      />
      {tint && (
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-color opacity-30"
          style={{ background: tint }}
        />
      )}
    </div>
  );
}
