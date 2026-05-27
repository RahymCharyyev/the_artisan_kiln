"use client";

import type { PaymentMethod } from "@/types";

/** Top row in mock: Credit/Debit + PayPal only. */
export function PaymentMethodPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-[11px] font-bold tracking-[0.22em] text-ink">
        SELECT PAYMENT METHOD:
      </legend>
      <div className="grid grid-cols-2 gap-2">
        <PaymentRadio
          name="pay"
          value="card"
          label="CREDIT / DEBIT CARD"
          checked={value === "card"}
          onChange={onChange}
        />
        <PaymentRadio
          name="pay"
          value="paypal"
          label="PAYPAL"
          checked={value === "paypal"}
          onChange={onChange}
          accessory={<PayPalGlyph />}
        />
      </div>
    </fieldset>
  );
}

function PaymentRadio({
  name,
  value,
  label,
  checked,
  onChange,
  accessory,
}: {
  name: string;
  value: PaymentMethod;
  label: string;
  checked: boolean;
  onChange: (m: PaymentMethod) => void;
  accessory?: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-2 border px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy/40 ${
        checked ? "border-navy bg-white" : "border-line/70 bg-white/60 hover:bg-white"
      }`}
    >
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={() => onChange(value)}
          className="h-3.5 w-3.5 accent-navy"
        />
        <span>{label}</span>
      </span>
      {accessory}
    </label>
  );
}

function PayPalGlyph() {
  return (
    <span className="rounded bg-[#003087] px-1 py-0.5 text-[8px] font-bold text-white">
      PayPal
    </span>
  );
}
