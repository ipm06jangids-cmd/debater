export type Role = "user" | "ai";

export interface Turn {
  role: Role;
  text: string;
  timestamp: number;
  round: number;
}

export interface RoundScore {
  round: number;
  logic: number;
  evidence: number;
  rhetoric: number;
  overall: number;
  note: string;
}

export interface MatchState {
  id: string;
  position: string;
  startedAt: number;
  finishedAt?: number;
  currentRound: number;
  totalRounds: number;
  turns: Turn[];
  liveScore?: Omit<RoundScore, "round">;
  roundScores: RoundScore[];
  verdict?: Verdict;
}

export interface Verdict {
  winner: "user" | "ai" | "draw";
  userOverall: number;
  aiOverall: number;
  breakdown: string[];
  bestUserLine: string;
  weakestUserLine: string;
  nextDayTopic: string;
}

export interface DebateConfig {
  totalRounds: number;
  liveScoringDebounceMs: number;
  minWordsForScoring: number;
}

export const DEFAULT_CONFIG: DebateConfig = {
  totalRounds: 5,
  liveScoringDebounceMs: 800,
  minWordsForScoring: 15,
};
