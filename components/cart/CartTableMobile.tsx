"use client";

import { CartTableCore } from "./CartTableCore";

export function CartTableMobile() {
  return (
    <div className="-mx-1 overflow-x-auto">
      <CartTableCore variant="mobile" />
    </div>
  );
}
