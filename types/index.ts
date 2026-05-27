import type { TileId } from "@/data/tiles";

export type { TileId };

export interface CartLine {
  tileId: TileId;
  quantity: number;
}

export type PaymentMethod = "card" | "paypal" | "applePay" | "bank";

export interface CustomerFormValues {
  name: string;
  phone: string;
  email: string;
  shippingAddress: string;
  notes: string;
}

export interface CardFormValues {
  number: string;
  expiry: string;
  cvv: string;
}
