import { type InputHTMLAttributes, useId, type Ref } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export function TextInput({
  ref,
  label,
  error,
  id,
  className = "",
  ...props
}: TextInputProps) {
  const gen = useId();
  const fid = id ?? gen;

  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-muted">
        {label}
      </span>
      <span className="relative">
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none font-mono text-ink-muted">
          [
        </span>
        <input
          ref={ref}
          id={fid}
          className={`w-full rounded-sm border border-line bg-transparent py-2.5 pr-10 pl-7 text-[15px] text-ink shadow-[inset_0_2px_0_rgba(0,0,0,0.04)] placeholder:text-ink-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 ${error ? "border-terracotta" : ""} ${className}`}
          {...props}
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none font-mono text-ink-muted">
          ]
        </span>
      </span>
      {error ? (
        <span className="text-xs font-medium text-terracotta" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
