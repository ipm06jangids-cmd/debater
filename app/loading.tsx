export default function Loading() {
  return (
    <div className="min-h-svh grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-neon-cyan/30 border-t-neon-cyan animate-spin" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-silver-muted">Loading</span>
      </div>
    </div>
  );
}
