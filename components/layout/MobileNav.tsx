"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS, UTILITY_NAV_ITEMS } from "@/lib/data/nav";
import { NAV_ICON_MAP } from "@/components/layout/nav-icons";
import { cn } from "@/lib/utils/cn";

/** Sticky top bar shown below the `tablet` breakpoint; opens the drawer. */
export function MobileTopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="tablet:hidden sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-100 bg-white px-4">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-[8px] text-ink-950 hover:bg-ink-50"
        >
          <Menu size={22} />
        </button>
        <Logo size="sm" />
        <button
          type="button"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-[8px] text-ink-950 hover:bg-ink-50"
        >
          <Search size={19} />
        </button>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "tablet:hidden fixed inset-0 z-50 transition-[visibility]",
        open ? "visible" : "invisible delay-300"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Scrim */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "absolute left-0 top-0 h-dvh w-[280px] max-w-[85vw] overflow-y-auto bg-ink-950 px-5 py-5",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <Logo variant="light" size="sm" />
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] text-ink-300 hover:bg-ink-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <button
          type="button"
          className="mt-6 flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 hover:bg-ink-900"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
            JD
          </span>
          <span className="flex flex-col items-start text-left">
            <span className="text-sm font-semibold text-white">John Doe</span>
            <span className="text-xs text-ink-400">Admin</span>
          </span>
          <ChevronDown size={16} className="ml-auto text-ink-400" />
        </button>

        <div className="my-5 h-px bg-ink-800" />

        <nav className="flex flex-col gap-1" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICON_MAP[item.icon];
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium",
                  active ? "bg-brand-500 text-white" : "text-ink-300 hover:bg-ink-900 hover:text-white"
                )}
              >
                {Icon && <Icon size={19} strokeWidth={2} />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="my-5 h-px bg-ink-800" />

        <nav className="flex flex-col gap-1" aria-label="Utility">
          {UTILITY_NAV_ITEMS.map((item) => {
            const Icon = NAV_ICON_MAP[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-300 hover:bg-ink-900 hover:text-white"
              >
                {Icon && <Icon size={19} strokeWidth={2} />}
                {item.label}
                {item.badge ? (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[11px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl bg-ink-900 p-4">
          <p className="text-sm font-semibold text-white">Loving ShipNow Free?</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-400">
            Go Pro to access priority support, real-time tracking, and full analytics.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-[10px] bg-white py-2.5 text-sm font-semibold text-ink-950 hover:bg-ink-100"
          >
            Go Pro Today
          </button>
        </div>
      </div>
    </div>
  );
}
