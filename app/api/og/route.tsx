import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const winner = (searchParams.get("w") ?? "draw") as "user" | "ai" | "draw";
  const userScore = Number(searchParams.get("u") ?? "0");
  const aiScore = Number(searchParams.get("a") ?? "0");
  const position = (searchParams.get("p") ?? "an idea worth defending").slice(0, 160);
  const bestLine = (searchParams.get("q") ?? "").slice(0, 200);

  const winnerLabel =
    winner === "user" ? "You took the match." : winner === "ai" ? "The AI took it." : "Drawn.";
  const accent = winner === "user" ? "#7DF9FF" : winner === "ai" ? "#D4AF37" : "#E8E8E8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #050505 0%, #0A0A0A 45%, #0F0F12 100%)",
          padding: 64,
          color: "#E8E8E8",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 80% 0%, ${accent}33, transparent 55%), radial-gradient(ellipse at 0% 100%, #8B6BFF22, transparent 55%)`,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: accent,
                boxShadow: `0 0 28px ${accent}`,
              }}
            />
            <span style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#A3A3A3" }}>
              Sparring
            </span>
          </div>
          <span style={{ fontSize: 22, color: "#A3A3A3", letterSpacing: 6, textTransform: "uppercase" }}>
            5 rounds · live judgment
          </span>
        </div>

        <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 28, zIndex: 2 }}>
          <span style={{ fontSize: 28, color: "#A3A3A3", letterSpacing: 8, textTransform: "uppercase" }}>
            Verdict
          </span>
          <span style={{ fontSize: 96, lineHeight: 1, color: accent, textShadow: `0 0 40px ${accent}88` }}>
            {winnerLabel}
          </span>
          <span style={{ fontSize: 36, color: "#E8E8E8", lineHeight: 1.2, fontStyle: "italic", maxWidth: 1000 }}>
            "{position}"
          </span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 22, color: "#A3A3A3", letterSpacing: 6, textTransform: "uppercase" }}>
              Score
            </span>
            <div style={{ display: "flex", gap: 28, alignItems: "baseline" }}>
              <span style={{ fontSize: 80, color: "#7DF9FF", fontWeight: 600 }}>
                {Math.round(userScore)}
              </span>
              <span style={{ fontSize: 36, color: "#6B6B6B" }}>vs</span>
              <span style={{ fontSize: 80, color: "#D4AF37", fontWeight: 600 }}>
                {Math.round(aiScore)}
              </span>
            </div>
          </div>
          {bestLine && (
            <div
              style={{
                maxWidth: 540,
                fontSize: 22,
                color: "#E8E8E8",
                lineHeight: 1.4,
                fontStyle: "italic",
                borderLeft: "2px solid rgba(255,255,255,0.25)",
                paddingLeft: 18,
                display: "flex",
              }}
            >
              "{bestLine}"
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
