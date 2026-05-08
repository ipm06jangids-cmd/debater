"use client";

import { useEffect, useState } from "react";
import { getStreak } from "@/lib/storage";

export function useStreak(): number {
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    setStreak(getStreak());
    const onStorage = () => setStreak(getStreak());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return streak;
}
