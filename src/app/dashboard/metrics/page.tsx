export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-notion-black">Metrics & Analytics</h1>
      </div>
      <div className="rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-12 text-center shadow-none">
        <p className="text-base font-medium text-warm-gray-500">Detailed event tracking and revenue metrics are planned for upcoming releases.</p>
      </div>
    </div>
  );
}