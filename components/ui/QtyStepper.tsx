"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export function IconButton({
  ref,
  ariaLabel,
  children,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white/40 text-ink transition hover:bg-paper-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy disabled:opacity-35 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export interface QtyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChangeQty: (n: number) => void;
  ref?: Ref<HTMLInputElement>;
}

export function QtyStepper({
  ref,
  value,
  onChangeQty,
  className = "",
  ...props
}: QtyInputProps) {
  const v =
    typeof value === "number" ? value : Number.parseInt(String(value), 10) || 0;

  return (
    <div className="flex items-center gap-2">
      <IconButton
        ariaLabel="Decrease quantity"
        onClick={() => onChangeQty(Math.max(0, v - 1))}
        type="button"
      >
        −
      </IconButton>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-ink-muted">
          [
        </span>
        <input
          ref={ref}
          inputMode="numeric"
          className={`w-[110px] rounded-sm border border-line bg-transparent py-2 pr-12 pl-8 text-center tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/35 ${className}`}
          value={Number.isFinite(v) ? v : ""}
          onChange={(e) =>
            onChangeQty(Math.max(0, Math.floor(Number(e.target.value) || 0)))
          }
          {...props}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-ink-muted">
          ]
        </span>
      </div>

      <IconButton
        ariaLabel="Increase quantity"
        onClick={() => onChangeQty(v + 1)}
        type="button"
      >
        +
      </IconButton>
    </div>
  );
}
