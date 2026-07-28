import Link from "next/link";
import { Plus } from "lucide-react";
import { ViewSwitcher } from "@/components/shipments/ViewSwitcher";
import type { ShipmentsView } from "@/lib/types";

export function ShipmentsHeader({
  view,
  onViewChange,
}: {
  view: ShipmentsView;
  onViewChange: (v: ShipmentsView) => void;
}) {
  return (
    <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-950">Shipments</h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
          <Link href="/dashboard" className="hover:text-ink-600">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-ink-500">Shipments</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Not part of the Figma frame — required by assignment §4.5. Built
            to look native to the design system: same pill/segmented control
            language used elsewhere (status chips, filter buttons). */}
        <ViewSwitcher view={view} onChange={onViewChange} />

        <Link
          href="/shipments/new"
          className="flex h-11 items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-ink-950 px-5 text-sm font-medium text-white hover:bg-ink-800"
        >
          <Plus size={17} />
          New Shipment
        </Link>
      </div>
    </div>
  );
}