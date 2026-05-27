"use client";

import type { CustomerFormValues } from "@/types";

export interface CustomerInfoFieldsProps {
  value: CustomerFormValues;
  errors: Partial<Record<keyof CustomerFormValues, string>>;
  onChange: (patch: Partial<CustomerFormValues>) => void;
  /** Mobile mock: name, phone, email, address only (notes at bottom). */
  includeNotes?: boolean;
}

export function CustomerInfoFields({
  value,
  errors,
  onChange,
  includeNotes = false,
}: CustomerInfoFieldsProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Customer information</legend>

      <UnderlineField
        label="CUSTOMER NAME"
        value={value.name}
        autoComplete="name"
        error={errors.name}
        onChange={(v) => onChange({ name: v })}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <UnderlineField
          label="PHONE"
          value={value.phone}
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone}
          onChange={(v) => onChange({ phone: v })}
        />
        <UnderlineField
          label="EMAIL"
          value={value.email}
          autoComplete="email"
          error={errors.email}
          onChange={(v) => onChange({ email: v })}
        />
      </div>

      <UnderlineField
        label="SHIPPING ADDRESS"
        value={value.shippingAddress}
        autoComplete="street-address"
        error={errors.shippingAddress}
        onChange={(v) => onChange({ shippingAddress: v })}
      />

      {includeNotes ? (
        <UnderlineField
          label="PROJECT NOTES"
          value={value.notes}
          onChange={(v) => onChange({ notes: v })}
        />
      ) : null}

      <FieldErrors errors={errors} />
    </fieldset>
  );
}

function UnderlineField({
  label,
  value,
  inputMode,
  autoComplete,
  error,
  onChange,
}: {
  label: string;
  value: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold tracking-[0.2em] text-ink">
        {label}
      </span>
      <input
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-0.5 w-full border-0 border-b-2 border-ink bg-transparent py-1 text-[14px] text-ink focus-visible:border-navy focus-visible:outline-none ${error ? "border-terracotta" : ""}`}
      />
      {error ? (
        <span role="alert" className="mt-0.5 block text-[10px] text-terracotta">
          {error}
        </span>
      ) : null}
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
    <ul className="space-y-0.5 text-[11px] text-terracotta" role="alert">
      {messages.map((msg) => (
        <li key={msg}>{msg}</li>
      ))}
    </ul>
  );
}
