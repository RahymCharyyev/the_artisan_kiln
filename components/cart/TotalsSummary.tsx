"use client";

import { formatUSD } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import {
  selectGrandTotal,
  selectShipping,
  selectSubtotal,
} from "@/store/selectors";

function TotalsRow({
  label,
  amount,
  highlight,
}: {
  label: string;
  amount: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 text-[11px] font-bold tracking-[0.14em] ${highlight ? "bg-paper-muted px-2 py-1.5" : ""}`}
    >
      <span className="text-ink-muted">{label}:</span>
      <span className="font-mono text-[12px] tabular-nums text-ink">
        [ {amount} ]
      </span>
    </div>
  );
}

function TotalsList({
  withDivider,
  highlightGrand,
}: {
  withDivider?: boolean;
  highlightGrand?: boolean;
}) {
  const sub = useAppSelector(selectSubtotal);
  const ship = useAppSelector(selectShipping);
  const grand = useAppSelector(selectGrandTotal);

  return (
    <div className="w-full max-w-[260px]">
      {withDivider ? <div className="mb-3 border-t-2 border-line" aria-hidden /> : null}
      <div className="flex flex-col gap-1">
        <TotalsRow label="SUBTOTAL" amount={formatUSD(sub)} />
        <TotalsRow label="SHIPPING" amount={formatUSD(ship)} />
        <TotalsRow
          label="GRAND TOTAL"
          amount={formatUSD(grand)}
          highlight={highlightGrand}
        />
      </div>
    </div>
  );
}

export function TotalsCart() {
  return <TotalsList highlightGrand />;
}

export function TotalsOrderSummary() {
  return <TotalsList withDivider highlightGrand />;
}
