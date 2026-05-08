import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-svh grid place-items-center px-6">
      <div className="glass-strong rounded-3xl p-10 max-w-md text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-silver-muted">404</span>
        <h1 className="font-display text-4xl text-silver mt-3 leading-tight">
          That argument doesn't exist here.
        </h1>
        <p className="text-silver-muted mt-4">Step into the ring instead.</p>
        <Link
          href="/debate"
          className="btn-neon inline-block mt-8 px-8 py-3 rounded-full text-sm uppercase tracking-[0.25em]"
        >
          Begin →
        </Link>
      </div>
    </main>
  );
}
