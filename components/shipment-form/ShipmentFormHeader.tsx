"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function ShipmentFormHeader() {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-ink-950 hover:bg-ink-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-display text-2xl font-bold text-ink-950">Create New Shipment</h1>
      </div>
      <p className="mt-1 flex items-center gap-1.5 pl-12 text-sm text-ink-400">
        <Link href="/dashboard" className="text-brand-600 hover:underline">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/shipments" className="text-brand-600 hover:underline">
          Shipments
        </Link>
        <span>/</span>
        <span className="text-ink-500">Create New Shipment</span>
      </p>
    </div>
  );
}