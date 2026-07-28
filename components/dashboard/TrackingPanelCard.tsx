"use client";

import { Search, Plus, Minus, Send, Truck } from "lucide-react";
import { TRACKED_SHIPMENT } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils/cn";

export function TrackingPanelCard() {
  const t = TRACKED_SHIPMENT;

  return (
    <div className="rounded-2xl bg-white p-4 desktop:p-5 shadow-[var(--shadow-card)]">
      {/* Static map surface with route line + marker (no mapping SDK required) */}
      <div className="relative h-[190px] w-full overflow-hidden rounded-xl bg-ink-50">
        <svg viewBox="0 0 400 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 165 L200 95" stroke="var(--color-ink-800)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M200 95 L380 20" stroke="var(--color-brand-500)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <span
          className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500 text-white"
          style={{ left: "50%", top: "50%", boxShadow: "0 0 0 8px rgba(133, 110, 244, 0.2)" }}
        >
          <Send size={13} fill="currentColor" />
        </span>

        <label className="absolute left-3 top-3 flex h-9 w-[190px] items-center gap-2 rounded-full bg-white pl-3 pr-3 shadow-[var(--shadow-card)]">
          <span className="sr-only">Search by Shipping ID</span>
          <input
            type="search"
            placeholder="Search by Shipping ID..."
            className="w-full bg-transparent text-xs text-ink-950 placeholder:text-ink-400 outline-none"
          />
          <Search size={14} className="shrink-0 text-ink-400" />
        </label>

        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg bg-white shadow-[var(--shadow-card)]">
          <button type="button" aria-label="Zoom in" className="flex h-8 w-8 items-center justify-center text-ink-500 hover:bg-ink-50">
            <Plus size={14} />
          </button>
          <div className="h-px bg-ink-100" />
          <button type="button" aria-label="Zoom out" className="flex h-8 w-8 items-center justify-center text-ink-500 hover:bg-ink-50">
            <Minus size={14} />
          </button>
        </div>
      </div>

      {/* Shipment detail card */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-ink-950">{t.id}</span>
          <div className="text-right">
            <p className="text-[11px] text-ink-400">Courier:</p>
            <p className="text-xs font-semibold text-ink-950">{t.courier}</p>
            <p className="text-[11px] text-ink-400">{t.carrier}</p>
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          {t.statusTags.map((tag, i) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium",
                i === 0 ? "bg-brand-100 text-brand-700" : "bg-ink-100 text-ink-600"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-5 h-1.5 w-full rounded-full bg-ink-100">
          <div className="h-1.5 rounded-full bg-brand-500" style={{ width: `${t.progress}%` }} />
          {/* Start marker: solid filled dot */}
          <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white bg-brand-500 shadow" />
          {/* Current position marker: truck icon */}
          <span
            className="absolute top-1/2 flex h-6 w-6 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-500 text-white shadow"
            style={{ left: `${t.progress}%` }}
          >
            <Truck size={12} />
          </span>
          {/* End marker: hollow dot */}
          <span className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-ink-200 bg-white" />
        </div>

        <div className="mt-3 flex items-start justify-between gap-3 text-xs">
          <div>
            <p className="text-ink-400">{t.origin.label}</p>
            <p className="font-medium text-ink-950">{t.origin.city}</p>
            <p className="text-[11px] text-ink-400">{t.origin.time}</p>
          </div>
          <div className="text-right">
            <p className="text-ink-400">{t.destination.label}</p>
            <p className="font-medium text-ink-950">{t.destination.city}</p>
            <p className="text-[11px] text-ink-400">{t.destination.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}