"use client";

import { useState } from "react";
import { MoreHorizontal, Package } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PACKAGE_STATUS_ITEMS } from "@/lib/data/warehouse";
import { PackageStatus } from "@/lib/types";

const TABS: Array<PackageStatus | "All"> = ["All", "Expected", "Received", "Sent"];

const STATUS_STYLE: Record<PackageStatus, string> = {
  Sent: "bg-brand-100 text-brand-700",
  Received: "bg-success-bg text-success",
  Expected: "bg-ink-100 text-ink-600",
};

export function PackageStatusCard() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const items = tab === "All" ? PACKAGE_STATUS_ITEMS : PACKAGE_STATUS_ITEMS.filter((p) => p.status === tab);

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Package Status</h2>
        <button type="button" aria-label="More options" className="text-ink-400 hover:text-ink-700">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="no-scrollbar mt-3 flex gap-1 overflow-x-auto rounded-[10px] border border-ink-200 bg-ink-50/60 p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "h-8 shrink-0 whitespace-nowrap rounded-[8px] px-3 text-xs font-medium transition-colors",
              tab === t ? "bg-ink-950 text-white" : "text-ink-500 hover:bg-white"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {items.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Package size={16} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-950">{p.id}</p>
                <p className="truncate text-xs text-ink-400">{p.date}</p>
              </div>
            </div>
            <span className={cn("shrink-0 rounded-md px-2 py-1 text-xs font-medium", STATUS_STYLE[p.status])}>
              {p.status}
            </span>
          </li>
        ))}
        {items.length === 0 && <li className="py-4 text-center text-sm text-ink-400">No packages found.</li>}
      </ul>
    </div>
  );
}