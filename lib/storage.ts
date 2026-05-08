import type { MatchState } from "./types";

const KEYS = {
  streak: "sparring:streak",
  lastDay: "sparring:lastDay",
  history: "sparring:history",
  match: (id: string) => `sparring:match:${id}`,
  audio: "sparring:audio",
} as const;

function isClient() {
  return typeof window !== "undefined";
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getStreak(): number {
  if (!isClient()) return 0;
  return Number(localStorage.getItem(KEYS.streak) ?? "0");
}

export function bumpStreak(): number {
  if (!isClient()) return 0;
  const today = todayKey();
  const last = localStorage.getItem(KEYS.lastDay);
  if (last === today) return Number(localStorage.getItem(KEYS.streak) ?? "0");
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  const current = Number(localStorage.getItem(KEYS.streak) ?? "0");
  const next = last === yesterday ? current + 1 : 1;
  localStorage.setItem(KEYS.streak, String(next));
  localStorage.setItem(KEYS.lastDay, today);
  return next;
}

export function saveMatch(match: MatchState): void {
  if (!isClient()) return;
  localStorage.setItem(KEYS.match(match.id), JSON.stringify(match));
  const list = JSON.parse(localStorage.getItem(KEYS.history) ?? "[]") as string[];
  if (!list.includes(match.id)) {
    list.unshift(match.id);
    localStorage.setItem(KEYS.history, JSON.stringify(list.slice(0, 50)));
  }
}

export function loadMatch(id: string): MatchState | null {
  if (!isClient()) return null;
  const raw = localStorage.getItem(KEYS.match(id));
  return raw ? (JSON.parse(raw) as MatchState) : null;
}

export function getAudioPref(): boolean {
  if (!isClient()) return false;
  return localStorage.getItem(KEYS.audio) === "on";
}

export function setAudioPref(on: boolean): void {
  if (!isClient()) return;
  localStorage.setItem(KEYS.audio, on ? "on" : "off");
}
