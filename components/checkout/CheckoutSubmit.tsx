"use client";

import { Button } from "@/components/ui/Button";

export function CheckoutSubmit() {
  return (
    <Button
      type="submit"
      variant="primary"
      className="w-full py-3.5 text-sm uppercase tracking-[0.32em]"
    >
      Place Secure Order
    </Button>
  );
}
