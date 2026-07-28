import { MoreHorizontal } from "lucide-react";
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORIES_TOTAL } from "@/lib/data/dashboard";

export function ProductCategoriesCard() {
  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Product Categories</h2>
        <button
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50 text-ink-500 hover:bg-ink-100"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-ink-400">Total Products</p>
        <p className="font-display text-2xl font-bold text-ink-950">
          {PRODUCT_CATEGORIES_TOTAL.toLocaleString()}
        </p>
      </div>

      {/* Equal-width color-palette strip, matching the Figma swatch row */}
      <div className="mt-4 flex h-11 w-full gap-1.5">
        {PRODUCT_CATEGORIES.map((c) => (
          <span
            key={c.name}
            className="h-full flex-1 rounded-md"
            style={{ backgroundColor: c.color }}
            title={`${c.name} ${c.pct}%`}
          />
        ))}
      </div>

      <ul className="mt-5 space-y-3">
        {PRODUCT_CATEGORIES.map((c) => (
          <li key={c.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium text-ink-950">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
            <span className="flex items-center gap-2 text-xs">
              <span className="rounded-md bg-ink-100 px-2 py-1 text-ink-600">{c.products} products</span>
              <span className="font-semibold text-ink-950">{c.pct}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}