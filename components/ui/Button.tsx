import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50";

const variants: Record<"primary" | "secondary" | "ghost" | "danger", string> = {
  primary:
    "bg-navy text-paper px-5 py-2.5 tracking-wide hover:bg-navy-dark shadow-sm",
  secondary:
    "border-2 border-line bg-paper px-4 py-2 text-ink hover:bg-paper-muted",
  ghost: "bg-transparent px-2 py-1 text-ink hover:bg-paper-muted",
  danger:
    "border-2 border-terracotta text-terracotta px-3 py-1.5 hover:bg-terracotta/10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  ref,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
