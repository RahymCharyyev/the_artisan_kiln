"use client";

import { TextInput } from "@/components/ui/TextInput";
import type { CardFormValues } from "@/types";

export function CreditCardForm({
  value,
  errors,
  onChange,
  variant = "desktop",
}: {
  value: CardFormValues;
  errors: Partial<Record<keyof CardFormValues, string>>;
  onChange: (patch: Partial<CardFormValues>) => void;
  variant?: "desktop" | "mobile";
}) {
  const boxed = variant === "mobile";

  return (
    <div
      className={
        boxed
          ? "space-y-3 border-2 border-line bg-paper-muted/40 p-3"
          : "space-y-3 rounded-md border border-line/40 bg-white/60 p-4"
      }
    >
      <div className="flex items-center gap-3">
        <VisaBadge />
        <MasterBadge />
      </div>
      <TextInput
        label="CARD NUMBER"
        inputMode="numeric"
        placeholder="1234 4566 7723 8990"
        value={value.number}
        autoComplete="cc-number"
        error={errors.number}
        onChange={(e) => onChange({ number: formatCardTyping(e.target.value) })}
      />
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="EXPIRATION /"
          placeholder="MM/YY"
          value={value.expiry}
          autoComplete="cc-exp"
          error={errors.expiry}
          onChange={(e) =>
            onChange({ expiry: formatExpiryTyping(e.target.value) })
          }
        />
        <TextInput
          label="CVV"
          inputMode="numeric"
          placeholder="123"
          value={value.cvv}
          autoComplete="cc-csc"
          error={errors.cvv}
          onChange={(e) =>
            onChange({
              cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
            })
          }
        />
      </div>
    </div>
  );
}

function formatCardTyping(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 19);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiryTyping(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function VisaBadge() {
  return (
    <div className="inline-flex h-6 items-center rounded border border-line/60 bg-white px-2 text-[12px] font-bold italic text-[#1a1f71]">
      VISA
    </div>
  );
}

function MasterBadge() {
  return (
    <div className="inline-flex h-6 items-center gap-0.5 rounded border border-line/60 bg-white px-2">
      <span className="h-3.5 w-3.5 rounded-full bg-[#eb001b]" />
      <span className="-ml-1 h-3.5 w-3.5 rounded-full bg-[#f79e1b]" />
    </div>
  );
}
