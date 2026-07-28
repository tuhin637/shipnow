import { ShipmentStage } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

/**
 * Matches the Figma Shipments (Table/Grid) status indicator exactly: a
 * colored dot + plain text, no pill background — keyed on the 3-way stage
 * (Pending / Delivery / Completed), not the 4-way Dashboard status.
 */
const STAGE_DOT: Record<ShipmentStage, string> = {
  Pending: "bg-ink-400",
  Delivery: "bg-brand-400",
  Completed: "bg-success",
};

export function StatusBadge({ stage, className }: { stage: ShipmentStage; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm text-ink-600 whitespace-nowrap", className)}>
      <span className={cn("h-2 w-2 shrink-0 rounded-full", STAGE_DOT[stage])} aria-hidden="true" />
      {stage}
    </span>
  );
}