"use client";

import { useCheckout } from "@/components/checkout/checkout-context";
import type { PaymentMethod } from "@/types";

export function PaymentQuickActions() {
  const {
    state: { payment },
    actions: { setPayment },
  } = useCheckout();

  return (
    <div className="grid grid-cols-2 gap-3">
      <AltMethodCard
        active={payment === "applePay"}
        onPick={() => setPayment("applePay")}
        method="applePay"
        title={
          <span className="inline-flex items-center gap-1">
            <AppleLogo />
            <span className="font-display text-base tracking-tight text-ink">
              Pay
            </span>
          </span>
        }
        caption="APPLE PAY"
      />
      <AltMethodCard
        active={payment === "bank"}
        onPick={() => setPayment("bank")}
        method="bank"
        title={<BankIcon />}
        caption="BANK TRANSFER"
      />
    </div>
  );
}

function AltMethodCard({
  active,
  onPick,
  method,
  title,
  caption,
}: {
  active: boolean;
  onPick: (m: PaymentMethod) => void;
  method: PaymentMethod;
  title: React.ReactNode;
  caption: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onPick(method)}
      className={`flex h-[88px] flex-col items-center justify-center gap-1 rounded-md border-2 px-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/50 ${
        active
          ? "border-navy bg-paper-muted/70"
          : "border-line/60 bg-white/70 hover:bg-white"
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          className={`grid h-4 w-4 place-items-center rounded-full border ${active ? "border-navy" : "border-line/70"}`}
        >
          {active ? <span className="h-2 w-2 rounded-full bg-navy" /> : null}
        </span>
        {title}
      </span>
      <span className="text-[10px] font-bold tracking-[0.28em] text-ink-muted">
        {caption}
      </span>
    </button>
  );
}

function AppleLogo() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
      <path
        d="M11.6 9.5c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.7-3.2.7-.7 0-1.7-.7-2.8-.7C2.7 4.8 1 6.4 1 9.4c0 1.2.3 2.6 1 3.7.6 1 1.8 2.6 3.2 2.5 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8 2.3-1.2 2.9-2.3c.7-1.1 1-2.2 1-2.3-.1-.1-2.3-.9-2.3-3.5ZM9.6 3.3c.6-.7 1-1.7.9-2.6-.8.1-1.8.6-2.4 1.3-.6.6-1.1 1.6-1 2.5.9.1 1.9-.4 2.5-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="34" height="22" viewBox="0 0 32 22" aria-hidden="true">
      <path
        d="M2 8 16 2l14 6M5 9v9M11 9v9M17 9v9M23 9v9M29 9v9M2 20h28"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
