export type ValidationResult = string | undefined;

/** Non-empty trimmed string. */
export function validateRequired(val: string, label: string): ValidationResult {
  if (!val.trim()) return `${label} is required.`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function validateEmail(val: string): ValidationResult {
  const req = validateRequired(val, "Email");
  if (req) return req;
  const t = val.trim();
  if (!EMAIL_REGEX.test(t)) return "Enter a valid email address.";
}

export function validatePhone(val: string): ValidationResult {
  const req = validateRequired(val, "Phone");
  if (req) return req;
  const digits = val.replace(/\D/g, "");
  if (digits.length < 8) return "Enter a valid phone number.";
}

/** Digits-only card number from user input. */
export function normalizeCardDigits(input: string): string {
  return input.replace(/\D/g, "");
}

export function validateCardNumber(input: string): ValidationResult {
  const digits = normalizeCardDigits(input);
  if (!digits) return "Card number is required.";
  if (digits.length < 13 || digits.length > 19) return "Enter a complete card number.";

  if (!luhnOk(digits)) return "Card number looks invalid.";
}

function luhnOk(digits: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (Number.isNaN(n)) return false;
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

const EXPIRY_REGEX = /^(\d{2})\/(\d{2})$/;

export function validateExpiry(val: string, now: Date = new Date()): ValidationResult {
  const m = val.trim().match(EXPIRY_REGEX);
  if (!m) return "Use MM/YY format.";
  const month = Number(m[1]);
  const yy = Number(m[2]);
  if (month < 1 || month > 12) return "Invalid month.";

  const fullYear = 2000 + yy;
  const lastDay = new Date(fullYear, month, 0, 23, 59, 59, 999);
  if (lastDay < now) return "Card has expired.";
}

export function validateCVV(val: string): ValidationResult {
  const d = val.replace(/\D/g, "");
  if (!d) return "CVV is required.";
  if (d.length < 3 || d.length > 4) return "CVV must be 3 or 4 digits.";
}
