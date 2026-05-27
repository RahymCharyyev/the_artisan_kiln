"use client";

import type { CustomerFormValues } from "@/types";

export interface CompactCustomerFieldsProps {
  value: CustomerFormValues;
  errors: Partial<Record<keyof CustomerFormValues, string>>;
  onChange: (patch: Partial<CustomerFormValues>) => void;
}

export function CompactCustomerFields({
  value,
  errors,
  onChange,
}: CompactCustomerFieldsProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">Customer information</legend>
      <InlineField
        label="CUSTOMER NAME"
        value={value.name}
        error={errors.name}
        autoComplete="name"
        onChange={(v) => onChange({ name: v })}
      />
      <div className="grid grid-cols-2 gap-3">
        <InlineField
          label="PHONE"
          value={value.phone}
          error={errors.phone}
          inputMode="tel"
          autoComplete="tel"
          onChange={(v) => onChange({ phone: v })}
        />
        <InlineField
          label="EMAIL"
          value={value.email}
          error={errors.email}
          autoComplete="email"
          onChange={(v) => onChange({ email: v })}
        />
      </div>
      <InlineField
        label="SHIPPING ADDRESS"
        value={value.shippingAddress}
        error={errors.shippingAddress}
        autoComplete="street-address"
        onChange={(v) => onChange({ shippingAddress: v })}
      />
      <InlineField
        label="PROJECT NOTES"
        value={value.notes}
        onChange={(v) => onChange({ notes: v })}
      />
      <FieldErrors errors={errors} />
    </fieldset>
  );
}

function InlineField({
  label,
  value,
  error,
  inputMode,
  autoComplete,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-baseline gap-1.5 border-b border-line/60 pb-0.5">
      <span className="shrink-0 text-[10px] font-bold tracking-[0.14em] text-ink">
        {label}:
      </span>
      <input
        type="text"
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`min-w-0 flex-1 bg-transparent text-[12px] text-ink focus-visible:outline-none ${error ? "text-terracotta" : ""}`}
      />
    </label>
  );
}

function FieldErrors({
  errors,
}: {
  errors: Partial<Record<keyof CustomerFormValues, string>>;
}) {
  const messages = Object.values(errors).filter((m): m is string => Boolean(m));
  if (!messages.length) return null;
  return (
    <ul className="text-[10px] text-terracotta" role="alert">
      {messages.map((msg) => (
        <li key={msg}>{msg}</li>
      ))}
    </ul>
  );
}
