"use client";

import { useState } from "react";
import { WarehouseHeader } from "@/components/warehouse/WarehouseHeader";
import { WarehouseStats } from "@/components/warehouse/WarehouseStats";
import { WarehouseInventoryCard } from "@/components/warehouse/WarehouseInventoryCard";
import { CapacityUsageCard } from "@/components/warehouse/CapacityUsageCard";
import { PackageStatusCard } from "@/components/warehouse/PackageStatusCard";
import { WarehouseStorageTable } from "@/components/warehouse/WarehouseStorageTable";
import { WarehouseMapCard } from "@/components/warehouse/WarehouseMapCard";
import { WarehouseActivityLogCard } from "@/components/warehouse/WarehouseActivityLogCard";
import type { FreightType } from "@/lib/types";

export default function WarehousePage() {
  const [freight, setFreight] = useState<FreightType>("Road Freight");

  return (
    <div className="flex flex-col gap-5">
      <WarehouseHeader active={freight} onChange={setFreight} />

      <div className="warehouse-grid">
        <div data-area="stats">
          <WarehouseStats />
        </div>

        <div data-area="inventory">
          <WarehouseInventoryCard />
        </div>

        <div data-area="side">
          <CapacityUsageCard />
          <PackageStatusCard />
        </div>

        <div data-area="storage">
          <WarehouseStorageTable />
        </div>

        <div data-area="map">
          <WarehouseMapCard />
        </div>

        <div data-area="activity">
          <WarehouseActivityLogCard />
        </div>
      </div>
    </div>
  );
}