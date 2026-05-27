"use client";

import { useCheckout } from "@/components/checkout/checkout-context";

import { CompactCustomerFields } from "./CompactCustomerFields";

export function CustomerInfoFormDesktop() {
  const {
    state: { customer, errors },
    actions: { patchCustomer },
  } = useCheckout();

  return (
    <CompactCustomerFields
      value={customer}
      errors={errors}
      onChange={patchCustomer}
    />
  );
}
