"use client";

export function MobileProjectNotes({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold tracking-[0.2em] text-ink">
        PROJECT NAME / NOTES
      </p>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none border-0 border-b-2 border-ink bg-transparent py-1 text-[14px] leading-relaxed focus-visible:border-navy focus-visible:outline-none"
        aria-label="Project name and notes"
      />
      <div
        className="border-b-2 border-ink/40"
        aria-hidden
      />
    </div>
  );
}
