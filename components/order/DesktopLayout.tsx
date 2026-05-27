"use client";

import { AddNewTileButton } from "@/components/cart/AddNewTileButton";
import { CartTableDesktop } from "@/components/cart/CartTableDesktop";
import {
  TotalsCart,
  TotalsOrderSummary,
} from "@/components/cart/TotalsSummary";
import {
  CheckoutPaymentSection,
  CheckoutSubmit,
  CheckoutToast,
} from "@/components/checkout";
import { useCheckout } from "@/components/checkout/checkout-context";
import { CustomerInfoFormDesktop } from "@/components/customer/CustomerInfoFormDesktop";
import { DesignToolLazy } from "@/components/order/DesignToolLazy";

export function DesktopLayout() {
  const {
    actions: { submit },
  } = useCheckout();

  return (
    <div className="relative z-10 mx-auto hidden max-w-[1280px] grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(280px,0.88fr)] gap-x-4 lg:grid xl:max-w-[1320px] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1.05fr)_minmax(300px,0.9fr)] xl:gap-x-5">
      <section className="flex min-w-0 flex-col gap-2">
        <h2 className="font-display text-lg font-bold tracking-[0.1em] text-ink xl:text-xl">
          SHOPPING CART &amp; DESIGN TOOL
        </h2>
        <div className="panel-bordered overflow-hidden">
          <CartTableDesktop />
        </div>
        <AddNewTileButton />
        <div className="flex justify-end">
          <TotalsCart />
        </div>
      </section>

      <section className="flex min-w-0 flex-col gap-2 pt-7">
        <DesignToolLazy />
      </section>

      <section className="panel-bordered flex min-w-0 flex-col overflow-hidden">
        <div className="panel-header">ORDER SUMMARY</div>
        <form className="space-y-4 p-4" noValidate onSubmit={submit}>
          <CustomerInfoFormDesktop />
          <TotalsOrderSummary />
          <CheckoutPaymentSection variant="desktop" />
          <CheckoutSubmit />
        </form>
      </section>

      <CheckoutToast />
    </div>
  );
}
