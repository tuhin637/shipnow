"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS, UTILITY_NAV_ITEMS } from "@/lib/data/nav";
import { NAV_ICON_MAP } from "@/components/layout/nav-icons";
import { cn } from "@/lib/utils/cn";

function NavLink({
  href,
  icon,
  label,
  active,
  badge,
}: {
  href: string;
  icon: string;
  label: string;
  active: boolean;
  badge?: number;
}) {
  const Icon = NAV_ICON_MAP[icon];
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      title={label}
      className={cn(
        "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors",
        "tablet:justify-center tablet:px-0 desktop:justify-start desktop:px-3",
        active
          ? "bg-brand-100 text-ink-950"
          : "text-ink-500 hover:bg-ink-50 hover:text-ink-950"
      )}
    >
      {Icon && (
        <Icon
          size={19}
          className={cn("shrink-0", active ? "text-brand-600" : "text-ink-400 group-hover:text-ink-600")}
          strokeWidth={2}
        />
      )}
      <span className="tablet:hidden desktop:inline truncate">{label}</span>
      {badge ? (
        <span className="ml-auto tablet:hidden desktop:inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-100 px-1.5 text-[11px] font-semibold text-brand-600">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

/** Shared desktop (1440) / tablet (768, icon rail) sidebar. Hidden on mobile. */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden tablet:flex tablet:w-[84px] desktop:w-[260px]",
        "shrink-0 flex-col bg-white border-r border-ink-100 px-3 py-5 desktop:px-5 desktop:py-6",
        "h-dvh sticky top-0 overflow-y-auto"
      )}
    >
      <div className="tablet:flex tablet:justify-center desktop:justify-start">
        <Logo variant="dark" size="sm" className="desktop:hidden" />
        <Logo variant="dark" size="md" className="hidden desktop:flex" />
      </div>

      {/* User */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2.5 rounded-[10px] px-2 py-2 tablet:justify-center desktop:justify-start hover:bg-ink-50"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
          JD
        </span>
        <span className="hidden desktop:flex flex-col items-start text-left">
          <span className="text-sm font-semibold text-ink-950">John Doe</span>
          <span className="text-xs text-ink-400">Admin</span>
        </span>
        <ChevronDown size={16} className="hidden desktop:block ml-auto text-ink-400" />
      </button>

      <div className="my-5 h-px bg-ink-100" />

      {/* Primary nav */}
      <nav className="flex flex-col gap-1" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href || pathname.startsWith(item.href + "/")}
          />
        ))}
      </nav>

      <div className="my-5 h-px bg-ink-100" />

      <nav className="flex flex-col gap-1" aria-label="Utility">
        {UTILITY_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Go Pro promo — desktop only, tablet rail has no room */}
      <div className="mt-auto hidden desktop:block pt-6">
        <div className="rounded-2xl bg-ink-950 p-4">
          <p className="text-sm font-semibold text-white">
            Loving ShipNow Free?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-300">
            Go Pro to access priority support, real-time tracking, and full
            analytics.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-[10px] bg-white py-2.5 text-sm font-semibold text-ink-950 hover:bg-ink-100"
          >
            Go Pro Today
          </button>
        </div>
      </div>
    </aside>
  );
}