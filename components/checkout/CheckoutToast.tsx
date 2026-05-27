"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useCheckout } from "@/components/checkout/checkout-context";

export function CheckoutToast() {
  const {
    state: { toastVisible },
  } = useCheckout();

  return (
    <AnimatePresence>
      {toastVisible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-10 left-1/2 z-50 max-w-sm -translate-x-1/2 rounded-lg border border-line bg-success px-5 py-3 text-center text-[13px] font-semibold text-paper shadow-lg"
        >
          Order validated — demo confirmation queued.
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
