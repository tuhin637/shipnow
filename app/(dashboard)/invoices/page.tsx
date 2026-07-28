"use client";

import { useState } from "react";
import { InvoicesHeader } from "@/components/invoices/InvoicesHeader";
import { InvoiceStats } from "@/components/invoices/InvoiceStats";
import { InvoicesListCard } from "@/components/invoices/InvoicesListCard";
import { InvoiceDetailsCard } from "@/components/invoices/InvoiceDetailsCard";
import { INVOICES } from "@/lib/data/invoices";
import type { Invoice } from "@/lib/types";

export default function InvoicesPage() {
  const [selected, setSelected] = useState<Invoice>(
    INVOICES.find((i) => i.id === "INV-1008") ?? INVOICES[0]
  );

  return (
    <div className="flex flex-col gap-5">
      <InvoicesHeader />
      <InvoiceStats />

      <div className="grid grid-cols-1 items-start gap-5 desktop:grid-cols-[1.6fr_1fr]">
        <InvoicesListCard selectedId={selected.id} onSelect={setSelected} />
        <InvoiceDetailsCard invoice={selected} />
      </div>
    </div>
  );
}