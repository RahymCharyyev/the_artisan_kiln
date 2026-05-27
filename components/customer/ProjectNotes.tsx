"use client";

export function ProjectNotes({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-6 flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-[0.34em] text-ink-muted">
        PROJECT NOTES
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-ink-muted">
          [
        </span>
        <textarea
          rows={5}
          className={`w-full rounded-sm border border-line bg-transparent py-3 pr-10 pl-8 text-[15px] leading-7 shadow-[inset_0_2px_0_rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 bg-[linear-gradient(transparent_1.68rem,var(--color-line)_1px)_repeat-y] bg-[length:100%_1.75rem] ${error ? "border-terracotta" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="pointer-events-none absolute right-3 top-3 font-mono text-ink-muted">
          ]
        </span>
      </div>
      {error ? (
        <span className="text-xs font-medium text-terracotta" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
