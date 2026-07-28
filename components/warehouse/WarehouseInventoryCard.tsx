import { MoreHorizontal } from "lucide-react";
import { WAREHOUSE_INVENTORY, WAREHOUSE_INVENTORY_TOTAL, InventoryFill } from "@/lib/data/warehouse";

/**
 * The Figma bars each use a distinct fill texture (solid / diagonal stripe /
 * dots) rather than a plain solid color. Reproduced with CSS gradients
 * instead of a chart-library pattern fill, consistent with how
 * `ProductCategoriesCard` already stands in for a category breakdown
 * elsewhere in this codebase.
 */
const FILL_STYLE: Record<InventoryFill, React.CSSProperties> = {
  "solid-brand": { backgroundColor: "var(--color-brand-500)" },
  "stripe-brand": {
    backgroundColor: "var(--color-brand-500)",
    backgroundImage:
      "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0 4px, transparent 4px 9px)",
  },
  "solid-ink": { backgroundColor: "var(--color-ink-950)" },
  "stripe-ink": {
    backgroundColor: "var(--color-ink-950)",
    backgroundImage:
      "repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 9px)",
  },
  "solid-gray": { backgroundColor: "var(--color-ink-300)" },
  "dot-gray": {
    backgroundColor: "var(--color-ink-200)",
    backgroundImage: "radial-gradient(rgba(41,41,41,0.45) 1px, transparent 1.4px)",
    backgroundSize: "7px 7px",
  },
};

export function WarehouseInventoryCard() {
  const maxPct = Math.max(...WAREHOUSE_INVENTORY.map((c) => c.pct));

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink-950">Warehouse Inventory</h2>
        <button type="button" aria-label="More options" className="text-ink-400 hover:text-ink-700">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <p className="mt-1 text-2xl font-bold text-ink-950">
        {WAREHOUSE_INVENTORY_TOTAL.toLocaleString()}
        <span className="ml-1.5 text-sm font-medium text-ink-400">packages</span>
      </p>

      <div className="mt-6 grid flex-1 grid-cols-3 gap-3 tablet:grid-cols-6">
        {WAREHOUSE_INVENTORY.map((c) => (
          <div key={c.name} className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-ink-500">{c.name}</p>
            <div className="flex h-24 w-full items-end overflow-hidden rounded-md bg-ink-50">
              <div
                className="w-full rounded-md"
                style={{ height: `${(c.pct / maxPct) * 100}%`, ...FILL_STYLE[c.fill] }}
                role="img"
                aria-label={`${c.name}: ${c.pct}%, ${c.count.toLocaleString()} packages`}
              />
            </div>
            <p className="text-xs text-ink-500">
              <span className="font-semibold text-ink-950">{c.pct}%</span> · {c.count.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}