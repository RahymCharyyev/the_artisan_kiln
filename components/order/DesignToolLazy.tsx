"use client";

import dynamic from "next/dynamic";

const DesignToolPanel = dynamic(
  () =>
    import("@/components/design-tool/DesignToolPanel").then(
      (m) => m.DesignToolPanel,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[320px] items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-line/60 bg-white/40 text-[11px] font-semibold tracking-[0.28em] text-ink-muted"
        aria-busy="true"
      >
        Loading design tool…
      </div>
    ),
  },
);

export function DesignToolLazy() {
  return <DesignToolPanel />;
}
