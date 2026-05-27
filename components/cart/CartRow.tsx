"use client";

import { motion } from "framer-motion";

import { formatUSD } from "@/lib/format";
import { TilePatternImage } from "@/components/ui/TilePatternImage";

export interface CartRowProps {
  variant?: "desktop" | "mobile";
  name: string;
  swatchSrc: string;
  patternSrc: string;
  unitPrice: number;
  quantity: number;
  onQty: (n: number) => void;
  onRemove: () => void;
  onAddInc: () => void;
}

export const ROW_TEMPLATE_DESKTOP =
  "grid grid-cols-[minmax(88px,1fr)_56px_minmax(76px,88px)_minmax(80px,92px)_52px] items-center gap-1.5";

export const ROW_TEMPLATE_MOBILE =
  "grid grid-cols-[minmax(88px,1fr)_56px_minmax(76px,88px)_minmax(80px,92px)_52px] items-stretch gap-0";

export { ROW_TEMPLATE_DESKTOP as ROW_TEMPLATE };

export function CartRow({
  variant = "desktop",
  name,
  swatchSrc,
  patternSrc,
  unitPrice,
  quantity,
  onQty,
  onRemove,
  onAddInc,
}: CartRowProps) {
  const isMobile = variant === "mobile";
  const rowTemplate = isMobile ? ROW_TEMPLATE_MOBILE : ROW_TEMPLATE_DESKTOP;
  const cell = isMobile ? "border border-line p-1.5 flex flex-col justify-center" : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className={`${rowTemplate} ${isMobile ? "" : "border-b border-line/50 px-2 py-3.5 last:border-b-0"}`}
    >
      <div className={`flex flex-col items-center gap-1 text-center ${cell}`}>
        <TilePatternImage
          src={swatchSrc}
          className={`rounded-sm border border-line object-cover ${isMobile ? "h-9 w-9" : "h-10 w-10"}`}
        />
        <span className="text-[8px] font-bold leading-tight tracking-[0.1em]">
          {name.toUpperCase()}
        </span>
      </div>

      <div className={`flex justify-center ${cell}`}>
        <TilePatternImage
          src={patternSrc}
          className={`rounded-sm border border-line object-cover ${isMobile ? "h-12 w-12" : "h-14 w-14"}`}
        />
      </div>

      <div className={cell}>
        <BracketField
          ariaLabel={`Quantity for ${name}`}
          value={String(quantity)}
          compact={isMobile}
          onChange={(s) =>
            onQty(Math.max(0, Math.floor(Number(s.replace(/\D/g, "")) || 0)))
          }
        />
      </div>

      <div className={`text-center ${cell}`}>
        <BracketDisplay value={formatUSD(unitPrice)} compact={isMobile} />
      </div>

      <div className={`flex flex-col items-center gap-1 ${cell}`}>
        <ActionBtn tone="add" label="ADD" onClick={onAddInc} ariaLabel={`Add ${name}`} />
        <ActionBtn tone="remove" label="REMOVE" onClick={onRemove} ariaLabel={`Remove ${name}`} />
      </div>
    </motion.div>
  );
}

function ActionBtn({
  tone,
  label,
  onClick,
  ariaLabel,
}: {
  tone: "add" | "remove";
  label: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  const colors =
    tone === "add"
      ? "border-fern bg-fern/10 text-fern"
      : "border-terracotta bg-terracotta/10 text-terracotta";
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`grid h-7 w-7 place-items-center rounded-sm border-2 ${colors} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40`}
    >
      {tone === "add" ? (
        <span className="text-sm font-bold leading-none">+</span>
      ) : (
        <TrashIcon />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}

function BracketField({
  ariaLabel,
  value,
  onChange,
  compact,
}: {
  ariaLabel: string;
  value: string;
  onChange: (s: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="relative w-full text-center">
      <span className="font-mono text-ink">[</span>
      <input
        aria-label={ariaLabel}
        value={value}
        inputMode="numeric"
        onChange={(e) => onChange(e.target.value)}
        className={`mx-0.5 w-[calc(100%-1.25rem)] border-0 bg-transparent text-center font-mono tabular-nums focus-visible:outline-none ${compact ? "text-[11px]" : "text-[12px]"}`}
      />
      <span className="font-mono text-ink">]</span>
    </div>
  );
}

function BracketDisplay({
  value,
  compact,
}: {
  value: string;
  compact?: boolean;
}) {
  return (
    <span className={`font-mono tabular-nums ${compact ? "text-[11px]" : "text-[12px]"}`}>
      [{value}]
    </span>
  );
}

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 7h14M9 7V5h6v2M8 7l1 15h6l1-15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
