"use client";

import { AddNewTileButton } from "@/components/cart/AddNewTileButton";
import { CartTableMobile } from "@/components/cart/CartTableMobile";
import { TotalsCart } from "@/components/cart/TotalsSummary";
import {
  CheckoutPaymentSection,
  CheckoutSubmit,
  CheckoutToast,
} from "@/components/checkout";
import { useCheckout } from "@/components/checkout/checkout-context";
import { MobileProjectNotes } from "@/components/customer/MobileProjectNotes";
import { CustomerInfoFormMobile } from "@/components/customer/CustomerInfoFormMobile";

export function MobileLayout() {
  const {
    actions: { submit, patchCustomer },
    state: { customer },
  } = useCheckout();

  return (
    <div className="relative z-10 mx-auto max-w-[560px] px-2 pb-16 lg:hidden">
      <form className="space-y-4" noValidate onSubmit={submit}>
        <CustomerInfoFormMobile />

        <CartTableMobile />

        <div className="mt-3 flex items-start justify-between gap-3">
          <AddNewTileButton />
          <TotalsCart />
        </div>

        <CheckoutPaymentSection variant="mobile" />

        <MobileProjectNotes
          value={customer.notes}
          onChange={(v) => patchCustomer({ notes: v })}
        />

        <CheckoutSubmit />
      </form>

      <CheckoutToast />
    </div>
  );
}
