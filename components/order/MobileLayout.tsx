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
    <div className="relative z-10 mx-auto max-w-[520px] pb-20 lg:hidden">
      <form className="space-y-5" noValidate onSubmit={submit}>
        <CustomerInfoFormMobile />

        <CartTableMobile />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
