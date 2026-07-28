import {
  MoreHorizontal,
  PackagePlus,
  Tag,
  RotateCw,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { RECENT_ACTIVITY } from "@/lib/data/dashboard";

const ACTION_ICON: { match: string; icon: LucideIcon }[] = [
  { match: "submitted", icon: PackagePlus },
  { match: "priority tag", icon: Tag },
  { match: "return", icon: RotateCw },
  { match: "resolved", icon: CircleCheck },
];

function iconFor(action: string): LucideIcon {
  return ACTION_ICON.find((a) => action.includes(a.match))?.icon ?? PackagePlus;
}

export function RecentActivityCard() {
  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-950">Recent Activity</h2>
        <button
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50 text-ink-500 hover:bg-ink-100"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <ul className="mt-4">
        {RECENT_ACTIVITY.map((a, i) => {
          const Icon = iconFor(a.action);
          const alt = i % 2 === 1;
          return (
            <li key={a.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    alt ? "bg-ink-100 text-ink-700" : "bg-brand-100 text-brand-600"
                  )}
                >
                  <Icon size={15} />
                </span>
                {i !== RECENT_ACTIVITY.length - 1 && (
                  <span className="my-1 w-px flex-1 bg-ink-100" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 pb-4">
                <p className="text-xs leading-relaxed text-ink-700">
                  {a.actorPrefix}{" "}
                  <span className="font-semibold text-brand-500">{a.actorHandle}</span>{" "}
                  {a.action}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-400">{a.timestamp}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}