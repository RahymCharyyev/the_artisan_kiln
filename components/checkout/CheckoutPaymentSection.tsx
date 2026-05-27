"use client";

import { CreditCardForm } from "@/components/payment/CreditCardForm";
import { MobilePaymentPicker } from "@/components/payment/MobilePaymentPicker";
import { PaymentMethodPicker } from "@/components/payment/PaymentMethodPicker";
import { useCheckout } from "@/components/checkout/checkout-context";

import { PaymentQuickActions } from "./PaymentQuickActions";

export function CheckoutPaymentSection({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const {
    state: { payment, card, errors },
    actions: { setPayment, patchCard },
    meta: { isCardPayment },
  } = useCheckout();

  if (variant === "mobile") {
    return (
      <div className="space-y-3">
        <MobilePaymentPicker value={payment} onChange={setPayment} />
        {isCardPayment ? (
          <CreditCardForm
            value={card}
            errors={errors}
            onChange={patchCard}
            variant="mobile"
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PaymentMethodPicker value={payment} onChange={setPayment} />
      {isCardPayment ? (
        <CreditCardForm value={card} errors={errors} onChange={patchCard} />
      ) : null}
      <PaymentQuickActions />
    </div>
  );
}
