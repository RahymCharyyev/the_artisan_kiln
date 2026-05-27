"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  validateCardNumber,
  validateCVV,
  validateEmail,
  validateExpiry,
  validatePhone,
  validateRequired,
} from "@/lib/validation";
import type { CardFormValues, CustomerFormValues, PaymentMethod } from "@/types";

const emptyCustomer: CustomerFormValues = {
  name: "",
  phone: "",
  email: "",
  shippingAddress: "",
  notes: "",
};

const emptyCard: CardFormValues = {
  number: "",
  expiry: "",
  cvv: "",
};

type FormErrors = Partial<CustomerFormValues> & Partial<CardFormValues>;

export interface CheckoutState {
  customer: CustomerFormValues;
  payment: PaymentMethod;
  card: CardFormValues;
  errors: FormErrors;
  toastVisible: boolean;
}

export interface CheckoutActions {
  patchCustomer: (patch: Partial<CustomerFormValues>) => void;
  patchCard: (patch: Partial<CardFormValues>) => void;
  setPayment: (method: PaymentMethod) => void;
  submit: (e: React.FormEvent) => void;
}

export interface CheckoutMeta {
  isCardPayment: boolean;
}

export interface CheckoutContextValue {
  state: CheckoutState;
  actions: CheckoutActions;
  meta: CheckoutMeta;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState(emptyCustomer);
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [card, setCard] = useState(emptyCard);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);

  const patchCustomer = useCallback((patch: Partial<CustomerFormValues>) => {
    setCustomer((c) => ({ ...c, ...patch }));
  }, []);

  const patchCard = useCallback((patch: Partial<CardFormValues>) => {
    setCard((x) => ({ ...x, ...patch }));
  }, []);

  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    const rName = validateRequired(customer.name, "Customer name");
    if (rName) next.name = rName;
    const rAddr = validateRequired(customer.shippingAddress, "Shipping address");
    if (rAddr) next.shippingAddress = rAddr;

    const p = validatePhone(customer.phone);
    if (p) next.phone = p;
    const em = validateEmail(customer.email);
    if (em) next.email = em;

    if (payment === "card") {
      const cn = validateCardNumber(card.number);
      if (cn) next.number = cn;
      const ex = validateExpiry(card.expiry);
      if (ex) next.expiry = ex;
      const cv = validateCVV(card.cvv);
      if (cv) next.cvv = cv;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [card.cvv, card.expiry, card.number, customer, payment]);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setToastVisible(true);
      window.setTimeout(() => {
        setToastVisible(false);
        setCustomer(emptyCustomer);
        setCard(emptyCard);
        setPayment("card");
        setErrors({});
      }, 2200);
    },
    [validate],
  );

  const value = useMemo<CheckoutContextValue>(
    () => ({
      state: { customer, payment, card, errors, toastVisible },
      actions: { patchCustomer, patchCard, setPayment, submit },
      meta: { isCardPayment: payment === "card" },
    }),
    [
      card,
      customer,
      errors,
      patchCard,
      patchCustomer,
      payment,
      submit,
      toastVisible,
    ],
  );

  return (
    <CheckoutContext value={value}>{children}</CheckoutContext>
  );
}

export function useCheckout(): CheckoutContextValue {
  const ctx = use(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return ctx;
}
