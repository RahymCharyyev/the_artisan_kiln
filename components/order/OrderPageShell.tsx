"use client";

import { CheckoutProvider } from "@/components/checkout";
import { CornerDecor } from "@/components/layout/CornerDecor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OrderTitle } from "@/components/layout/OrderTitle";
import { DesktopLayout } from "@/components/order/DesktopLayout";
import { MobileLayout } from "@/components/order/MobileLayout";

export function OrderPageShell() {
  return (
    <CheckoutProvider>
      <Header />
      <OrderTitle />
      <MobileLayout />
      <DesktopLayout />
      <Footer />
      <CornerDecor />
    </CheckoutProvider>
  );
}
