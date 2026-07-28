import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ShipmentTypeCard } from "@/components/dashboard/ShipmentTypeCard";
import { ShipmentStatisticCard } from "@/components/dashboard/ShipmentStatisticCard";
import { ProfitSummaryCard } from "@/components/dashboard/ProfitSummaryCard";
import { ProductCategoriesCard } from "@/components/dashboard/ProductCategoriesCard";
import { TrackingPanelCard } from "@/components/dashboard/TrackingPanelCard";
import { ShipmentAlertsCard } from "@/components/dashboard/ShipmentAlertsCard";
import { RecentShipmentsCard } from "@/components/dashboard/RecentShipmentsCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { DASHBOARD_METRICS } from "@/lib/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader />

      <div className="grid grid-cols-1 desktop:grid-cols-[1fr_320px] gap-5 items-start">
        {/* Main column */}
        <div className="flex flex-col gap-5 min-w-0">
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5">
            {DASHBOARD_METRICS.map((m) => (
              <MetricCard key={m.id} metric={m} />
            ))}
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
            <ShipmentStatisticCard />
            <ProfitSummaryCard />
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
            <ProductCategoriesCard />
            <TrackingPanelCard />
          </div>

          <RecentShipmentsCard />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5 min-w-0">
          <ShipmentTypeCard />
          <ShipmentAlertsCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
}
