import { MoreHorizontal, CircleCheck, PackagePlus, Truck, FileText, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { WAREHOUSE_ACTIVITY_LOG } from "@/lib/data/warehouse";

const ACTION_ICON: { match: string; icon: LucideIcon; style: string }[] = [
  { match: "confirmed receipt", icon: CircleCheck, style: "bg-ink-950 text-white" },
  { match: "added", icon: PackagePlus, style: "bg-brand-100 text-brand-600" },
  { match: "dispatched", icon: Truck, style: "bg-ink-950 text-white" },
  { match: "created a shipment", icon: FileText, style: "bg-ink-950 text-white" },
  { match: "flagged", icon: TriangleAlert, style: "bg-warning-bg text-warning" },
];

function iconFor(action: string) {
  return ACTION_ICON.find((a) => action.includes(a.match)) ?? ACTION_ICON[0];
}

export function WarehouseActivityLogCard() {
  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Warehouse Activity Log</h2>
        <button type="button" aria-label="More options" className="text-ink-400 hover:text-ink-700">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <ul className="mt-4 flex flex-col">
        {WAREHOUSE_ACTIVITY_LOG.map((item, i) => {
          const { icon: Icon, style } = iconFor(item.action);
          return (
            <li key={item.id} className={cn("flex gap-3 py-3", i !== 0 && "border-t border-ink-100")}>
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", style)}>
                <Icon size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink-700">
                  <span className="font-medium text-brand-600">{item.actor}</span> {item.action}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">{item.timestamp}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}