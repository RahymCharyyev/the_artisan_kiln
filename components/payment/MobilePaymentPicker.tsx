"use client";

import type { PaymentMethod } from "@/types";

const OPTIONS: {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "card",
    label: "CREDIT / DEBIT CARD",
    icon: <CardIcon />,
  },
  {
    value: "paypal",
    label: "PAYPAL",
    icon: (
      <span className="rounded bg-[#003087] px-1.5 py-0.5 text-[8px] font-bold text-white">
        PayPal
      </span>
    ),
  },
  {
    value: "applePay",
    label: "APPLE PAY",
    icon: <span className="text-lg">&#63743;</span>,
  },
  {
    value: "bank",
    label: "BANK TRANSFER",
    icon: <BankIcon />,
  },
];

export function MobilePaymentPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  return (
    <fieldset className="panel-bordered overflow-hidden">
      <legend className="block w-full border-b-2 border-line bg-[#EAE0C4] px-2 py-2 text-center text-[10px] font-bold tracking-[0.2em] text-ink">
        SELECT PAYMENT METHOD:
      </legend>
      <div className="grid grid-cols-4 divide-x-2 divide-line">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex min-h-[88px] cursor-pointer flex-col items-center justify-center gap-1 px-1 py-2 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-navy/50 ${
              value === opt.value ? "bg-[#EAE0C4]" : "bg-paper"
            }`}
          >
            <input
              type="radio"
              name="pay-mobile"
              className="h-3 w-3 accent-navy"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="flex h-8 items-center justify-center">{opt.icon}</span>
            <span className="text-[8px] font-bold leading-tight tracking-[0.08em]">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CardIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
      <rect x="1" y="3" width="26" height="14" rx="2" fill="#2b3a67" />
      <rect x="1" y="8" width="26" height="4" fill="#d8a83a" opacity="0.9" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="26" height="18" viewBox="0 0 32 22" aria-hidden="true">
      <path
        d="M2 8 16 2l14 6M5 9v9M11 9v9M17 9v9M23 9v9M29 9v9M2 20h28"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}
