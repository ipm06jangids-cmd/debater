"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MicOrb } from "./MicOrb";
import { ScoreHUD } from "./ScoreHUD";
import { RoundIndicator } from "./RoundIndicator";
import { TranscriptStream } from "./TranscriptStream";
import { PositionEntry } from "./PositionEntry";
import type { MatchState, RoundScore, Turn, Verdict } from "@/lib/types";
import type { Score } from "@/lib/prompts/judge";
import { DEFAULT_CONFIG } from "@/lib/types";
import { saveMatch, bumpStreak } from "@/lib/storage";
import { uid, wordCount } from "@/lib/utils";
import { chime, thud, vibrate } from "@/lib/audio/ui-sfx";

type Phase =
  | "intro"
  | "starting"
  | "listening"
  | "ai_speaking"
  | "scoring"
  | "verdict_loading"
  | "ended"
  | "error";

interface ElMessage {
  message: string;
  source: "user" | "ai";
}

export function DebateRoom() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<MatchState | null>(null);
  const [liveScore, setLiveScore] = useState<Score | null>(null);
  const [roundScores, setRoundScores] = useState<RoundScore[]>([]);
  const matchRef = useRef<MatchState | null>(null);
  const scoreDebounce = useRef<number | null>(null);
  const userBufferRef = useRef<string>("");
  const totalRounds = DEFAULT_CONFIG.totalRounds;

  const conversation = useConversation({
    onConnect: () => {
      setPhase("listening");
      chime();
    },
    onDisconnect: () => {
      // handled by finalize flow
    },
    onError: (e: unknown) => {
      const msg = typeof e === "string" ? e : (e as { message?: string })?.message ?? "voice error";
      setError(msg);
      setPhase("error");
    },
    onMessage: (msg: ElMessage) => handleMessage(msg),
  });

  const handleMessage = useCallback(
    async (msg: ElMessage) => {
      const m = matchRef.current;
      if (!m) return;
      const round = m.currentRound;
      const turn: Turn = {
        role: msg.source,
        text: msg.message,
        timestamp: Date.now(),
        round,
      };

      const updated: MatchState = {
        ...m,
        turns: [...m.turns, turn],
      };
      matchRef.current = updated;
      setMatch(updated);

      if (msg.source === "user") {
        userBufferRef.current = msg.message;
        scheduleLiveScore(updated);
        setPhase("ai_speaking");
      } else if (msg.source === "ai") {
        const completedRound = round;
        await scoreFinal(updated, completedRound);
        if (completedRound >= totalRounds) {
          await finalize(updated);
        } else {
          const next: MatchState = { ...updated, currentRound: completedRound + 1 };
          matchRef.current = next;
          setMatch(next);
          setPhase("listening");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function scheduleLiveScore(m: MatchState) {
    if (scoreDebounce.current) window.clearTimeout(scoreDebounce.current);
    scoreDebounce.current = window.setTimeout(async () => {
      const text = userBufferRef.current;
      if (wordCount(text) < DEFAULT_CONFIG.minWordsForScoring) return;
      const transcript = m.turns.map((t) => `[${t.role.toUpperCase()} R${t.round}] ${t.text}`).join("\n");
      try {
        const res = await fetch("/api/score", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ position: m.position, transcript, latestRebuttal: text }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as Score;
        setLiveScore(data);
      } catch {
        // ignore
      }
    }, DEFAULT_CONFIG.liveScoringDebounceMs);
  }

  async function scoreFinal(m: MatchState, round: number) {
    const lastUser = [...m.turns].reverse().find((t) => t.role === "user" && t.round === round);
    if (!lastUser) return;
    const transcript = m.turns.map((t) => `[${t.role.toUpperCase()} R${t.round}] ${t.text}`).join("\n");
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ position: m.position, transcript, latestRebuttal: lastUser.text }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as Score;
      const rs: RoundScore = { round, ...data };
      setRoundScores((prev) => [...prev, rs]);
      const nextMatch: MatchState = {
        ...m,
        roundScores: [...m.roundScores, rs],
      };
      matchRef.current = nextMatch;
      setMatch(nextMatch);
      saveMatch(nextMatch);
    } catch {
      // ignore
    }
  }

  async function finalize(m: MatchState) {
    setPhase("verdict_loading");
    try {
      await conversation.endSession();
    } catch {
      // ignore
    }
    const transcript = m.turns.map((t) => `[${t.role.toUpperCase()} R${t.round}] ${t.text}`).join("\n");
    try {
      const res = await fetch("/api/verdict", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ position: m.position, transcript, roundScores: m.roundScores }),
      });
      if (!res.ok) throw new Error("verdict failed");
      const verdict = (await res.json()) as Verdict;
      const finished: MatchState = { ...m, verdict, finishedAt: Date.now() };
      saveMatch(finished);
      bumpStreak();
      vibrate(20);
      router.push(`/verdict/${m.id}`);
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  async function start(position: string) {
    setError(null);
    const id = uid();
    const fresh: MatchState = {
      id,
      position,
      startedAt: Date.now(),
      currentRound: 1,
      totalRounds,
      turns: [],
      roundScores: [],
    };
    matchRef.current = fresh;
    setMatch(fresh);
    setPhase("starting");
    saveMatch(fresh);

    try {
      const sig = await fetch("/api/elevenlabs-signed-url");
      if (!sig.ok) throw new Error("Signed URL fetch failed. Set ELEVENLABS_AGENT_ID + ELEVENLABS_API_KEY in .env.local.");
      const { signedUrl } = (await sig.json()) as { signedUrl: string };
      await conversation.startSession({
        signedUrl,
        dynamicVariables: { position, total_rounds: totalRounds },
      });
      thud();
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  useEffect(() => {
    return () => {
      if (scoreDebounce.current) window.clearTimeout(scoreDebounce.current);
      conversation.endSession().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orbState =
    phase === "listening"
      ? "listening"
      : phase === "ai_speaking"
      ? "ai_speaking"
      : phase === "scoring" || phase === "verdict_loading"
      ? "scoring"
      : phase === "ended"
      ? "ended"
      : "idle";

  return (
    <div className="min-h-svh w-full flex flex-col items-center justify-center px-4 py-10 gap-10 relative">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" exit={{ opacity: 0, filter: "blur(8px)" }} className="w-full grid place-items-center">
            <PositionEntry onSubmit={start} />
          </motion.div>
        )}

        {phase !== "intro" && match && (
          <motion.div
            key="ring"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl flex flex-col items-center gap-8"
          >
            <div className="w-full flex flex-col items-center gap-3 text-center">
              <RoundIndicator current={match.currentRound} total={totalRounds} />
              <p className="font-display text-lg md:text-2xl text-silver/90 max-w-2xl leading-tight">
                <span className="text-silver-muted text-xs uppercase tracking-[0.3em] block mb-1">your position</span>
                "{match.position}"
              </p>
            </div>

            <div className="grid md:grid-cols-[260px_1fr] gap-8 items-center w-full">
              <div className="grid place-items-center">
                <MicOrb state={orbState} />
              </div>
              <div className="flex flex-col items-center md:items-start gap-4">
                {liveScore && (
                  <ScoreHUD
                    logic={liveScore.logic}
                    evidence={liveScore.evidence}
                    rhetoric={liveScore.rhetoric}
                    overall={liveScore.overall}
                    note={liveScore.note}
                  />
                )}
                <TranscriptStream turns={match.turns} />
              </div>
            </div>

            {phase === "verdict_loading" && (
              <p className="text-silver-muted animate-pulse">Composing the verdict…</p>
            )}

            {phase === "error" && (
              <div className="glass rounded-xl px-5 py-4 text-sm text-red-300 max-w-md">
                <strong className="block mb-1 text-red-200">Voice connection error</strong>
                {error}
              </div>
            )}

            {phase !== "verdict_loading" && phase !== "ended" && (
              <button
                onClick={() => finalize(match)}
                className="text-xs uppercase tracking-[0.25em] text-silver-muted hover:text-silver transition"
              >
                End early & get verdict
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
