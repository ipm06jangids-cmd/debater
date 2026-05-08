export type TintPalette = {
  label: "dawn" | "day" | "dusk" | "night";
  primary: string;
  glow: string;
  overlay: string;
};

export function getTintForHour(hour: number): TintPalette {
  if (hour >= 5 && hour < 9) {
    return { label: "dawn", primary: "#D4AF37", glow: "rgba(212, 175, 55, 0.18)", overlay: "rgba(60, 30, 20, 0.20)" };
  }
  if (hour >= 9 && hour < 17) {
    return { label: "day", primary: "#7DF9FF", glow: "rgba(125, 249, 255, 0.16)", overlay: "rgba(20, 30, 40, 0.15)" };
  }
  if (hour >= 17 && hour < 21) {
    return { label: "dusk", primary: "#FF8A65", glow: "rgba(255, 138, 101, 0.20)", overlay: "rgba(50, 20, 30, 0.22)" };
  }
  return { label: "night", primary: "#8B6BFF", glow: "rgba(139, 107, 255, 0.20)", overlay: "rgba(15, 10, 30, 0.30)" };
}

export function currentTint(): TintPalette {
  const h = typeof window !== "undefined" ? new Date().getHours() : 12;
  return getTintForHour(h);
}
