import { DebateRoom } from "@/components/debate/DebateRoom";
import Link from "next/link";

export const metadata = {
  title: "Sparring · Live Debate",
};

export default function DebatePage() {
  return (
    <main className="relative min-h-svh">
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-5 flex items-center justify-between glass">
        <Link href="/" className="font-display text-lg tracking-wide text-silver hover:text-white transition">
          Sparring
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-silver-muted hover:text-silver transition"
        >
          ← Exit
        </Link>
      </header>
      <div className="pt-24">
        <DebateRoom />
      </div>
    </main>
  );
}
