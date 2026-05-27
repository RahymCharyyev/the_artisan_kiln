import {
  normalizeCardDigits,
  validateCardNumber,
  validateCVV,
  validateEmail,
  validateExpiry,
  validateRequired,
} from "@/lib/validation";

import { describe, expect, it } from "vitest";

describe("validateRequired", () => {
  it("returns message for whitespace-only", () => {
    expect(validateRequired("   ", "Name")).toBeDefined();
  });
  it("returns undefined for trimmed value", () => {
    expect(validateRequired("Ada", "Name")).toBeUndefined();
  });
});

describe("validateEmail", () => {
  it("requires value", () => {
    expect(validateEmail("")).toMatch(/required/i);
  });
  it("rejects malformed", () => {
    expect(validateEmail("not-an-email")).toBeDefined();
  });
  it("accepts simple valid", () => {
    expect(validateEmail("a@b.cc")).toBeUndefined();
  });
});

describe("validateCardNumber", () => {
  it("runs Luhn on known valid test number", () => {
    expect(validateCardNumber("4532015112830366")).toBeUndefined();
  });

  it("rejects failing Luhn", () => {
    expect(validateCardNumber("4532015112830367")).toBeDefined();
  });
});

describe("validateExpiry", () => {
  it("parses MM/YY and rejects past dates", () => {
    expect(validateExpiry("01/00", new Date("2010-01-01"))).toBeDefined();
  });

  it("accepts future end of month boundary", () => {
    expect(validateExpiry("12/88", new Date("2020-01-01"))).toBeUndefined();
  });
});

describe("validateCVV", () => {
  it("accepts 3 digits", () => {
    expect(validateCVV("123")).toBeUndefined();
  });
  it("rejects too short", () => {
    expect(validateCVV("12")).toBeDefined();
  });
});

describe("normalizeCardDigits", () => {
  it("strips non-digits", () => {
    expect(normalizeCardDigits("4532 0151 1283 0366")).toBe("4532015112830366");
  });
});
