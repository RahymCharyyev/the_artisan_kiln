"use client";

import { useCheckout } from "@/components/checkout/checkout-context";

import { CustomerInfoFields } from "./CustomerInfoFields";

export function CustomerInfoFormMobile() {
  const {
    state: { customer, errors },
    actions: { patchCustomer },
  } = useCheckout();

  return (
    <CustomerInfoFields
      value={customer}
      errors={errors}
      onChange={patchCustomer}
      includeNotes={false}
    />
  );
}
