import { AlertItem, Shipment } from "@/lib/types";
import { SHIPMENTS } from "@/lib/data/shipments";

// ---------------------------------------------------------------------------
// Header metric cards
// ---------------------------------------------------------------------------
export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  deltaLabel: string;
  trend: "up" | "down";
  icon: "Truck" | "Gauge" | "DollarSign";
}

export const DASHBOARD_METRICS: MetricCardData[] = [
  {
    id: "active-shipments",
    label: "Active Shipments",
    value: "1,284",
    suffix: "shipments",
    deltaLabel: "+8.7% from last week",
    trend: "up",
    icon: "Truck",
  },
  {
    id: "delivery-performance",
    label: "Delivery Performance",
    value: "94.3%",
    suffix: "on-time",
    deltaLabel: "-1.2% from last week",
    trend: "down",
    icon: "Gauge",
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "$82,450",
    deltaLabel: "+12.4% from last month",
    trend: "up",
    icon: "DollarSign",
  },
];

// ---------------------------------------------------------------------------
// Shipment Type donut
// ---------------------------------------------------------------------------
export interface ShipmentTypeSlice {
  name: string;
  shortLabel: string;
  value: number;
  shipments: number;
  color: string;
}

export const SHIPMENT_TYPE_TOTAL = 2500;

// Ring drawing order matches the reference image (clockwise from 12 o'clock):
// Road Freight (purple) -> Air Freight (near-black) -> Ocean Freight (mid-gray) -> Rail Freight (light-gray).
// The legend grid below keeps the original 2x2 reading order (Road, Ocean, Air, Rail).
export const SHIPMENT_TYPE_DATA: ShipmentTypeSlice[] = [
  { name: "Road Freight", shortLabel: "Road Freight", value: 46, shipments: 1150, color: "var(--color-brand-500)" },
  { name: "Air Freight", shortLabel: "Air Freight", value: 28, shipments: 700, color: "var(--color-ink-950)" },
  { name: "Ocean Freight", shortLabel: "Ocean Freight", value: 17, shipments: 425, color: "var(--color-ink-500)" },
  { name: "Rail Freight", shortLabel: "Rail Freight", value: 9, shipments: 225, color: "var(--color-ink-100)" },
];

/** Legend reading order (top-left, top-right, bottom-left, bottom-right) — independent of ring order above. */
export const SHIPMENT_TYPE_LEGEND_ORDER = ["Road Freight", "Ocean Freight", "Air Freight", "Rail Freight"];

// ---------------------------------------------------------------------------
// Shipment Statistic (gradient bar chart)
// ---------------------------------------------------------------------------
export const SHIPMENT_STATISTIC = {
  total: "4,352",
  deltaLabel: "+8.7%",
  range: "Last Year",
  highlight: { month: "May", value: 3124, yearLabel: "May 2030" },
  yMax: 4800,
  data: [
    { month: "Jan", value: 1300 },
    { month: "Feb", value: 1900 },
    { month: "Mar", value: 1050 },
    { month: "Apr", value: 1700 },
    { month: "May", value: 3124 },
    { month: "Jun", value: 2600 },
    { month: "Jul", value: 3600 },
    { month: "Aug", value: 4352 },
  ],
};

// ---------------------------------------------------------------------------
// Profit Summary (grouped bars)
// ---------------------------------------------------------------------------
export const PROFIT_SUMMARY = {
  total: "$624,550",
  deltaLabel: "+5.62%",
  range: "Last 8 Months",
  revenueTotal: "$87,524",
  costTotal: "$45,680",
  highlightMonth: "May",
  data: [
    { month: "Jan", revenue: 62000, cost: 38000 },
    { month: "Feb", revenue: 58000, cost: 35000 },
    { month: "Mar", revenue: 71000, cost: 41000 },
    { month: "Apr", revenue: 66000, cost: 39000 },
    { month: "May", revenue: 87524, cost: 45680 },
    { month: "Jun", revenue: 79000, cost: 43000 },
    { month: "Jul", revenue: 74000, cost: 40000 },
    { month: "Aug", revenue: 82000, cost: 44000 },
  ],
};

// ---------------------------------------------------------------------------
// Product Categories (small donut + legend)
// ---------------------------------------------------------------------------
export interface ProductCategory {
  name: string;
  products: number;
  pct: number;
  color: string;
}

export const PRODUCT_CATEGORIES_TOTAL = 1000;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: "Electronics", products: 240, pct: 24, color: "var(--color-brand-500)" },
  { name: "Home & Kitchen", products: 200, pct: 20, color: "var(--color-brand-200)" },
  { name: "Apparel", products: 180, pct: 18, color: "var(--color-ink-950)" },
  { name: "Beauty & Health", products: 140, pct: 14, color: "var(--color-ink-500)" },
  { name: "Sports & Outdoors", products: 120, pct: 12, color: "var(--color-ink-200)" },
  { name: "Automotive", products: 120, pct: 12, color: "var(--color-ink-100)" },
];

// ---------------------------------------------------------------------------
// Live tracking panel
// ---------------------------------------------------------------------------
export const TRACKED_SHIPMENT = {
  id: "#SH8743921",
  courier: "Daniel Cooper",
  carrier: "SkyLogix Express",
  statusTags: ["In Transit", "On Schedule"],
  progress: 58,
  origin: { city: "San Francisco, CA, USA", time: "Mar 19, 2035 - 10:30 AM", label: "Origin" },
  destination: {
    city: "New York, NY, USA",
    time: "Mar 23, 2035 - 03:00 PM (estimated)",
    label: "Destination",
  },
};

// ---------------------------------------------------------------------------
// Shipment alerts
// ---------------------------------------------------------------------------
export const ALERT_SUMMARY = {
  total: 12,
  breakdown: [
    { type: "Customs Clearance Delay", count: 5 },
    { type: "Incorrect Address Provided", count: 4 },
    { type: "Weather-Related Hold", count: 3 },
  ],
};

export const SHIPMENT_ALERTS: AlertItem[] = [
  { id: "al-1", shipmentId: "#SH8743921", type: "Customs Clearance Delay", freightType: "Ocean Freight", date: "Mar 20" },
  { id: "al-2", shipmentId: "#SH8725810", type: "Incorrect Address Provided", freightType: "Road Freight", date: "Mar 20" },
  { id: "al-3", shipmentId: "#SH8730043", type: "Weather-Related Hold", freightType: "Air Freight", date: "Mar 19" },
  { id: "al-4", shipmentId: "#SH8710654", type: "Incorrect Address Provided", freightType: "Rail Freight", date: "Mar 18" },
];

// ---------------------------------------------------------------------------
// Recent shipments table
// ---------------------------------------------------------------------------
// Previously duplicated a handful of records here with different mock values
// (weight/route/dates) than the canonical list in lib/data/shipments.ts for
// the same IDs. Deriving from the single source of truth instead, per the
// assignment's "keep all data in a dedicated directory, separated by domain"
// guidance — one domain (shipments), one array.
export const RECENT_SHIPMENTS: Shipment[] = SHIPMENTS.slice(0, 5);

// ---------------------------------------------------------------------------
// Recent activity timeline
// ---------------------------------------------------------------------------
export interface ActivityFeedItem {
  id: string;
  actorPrefix: string; // "User", "Customer Support", "Administrator"
  actorHandle: string; // "@TechGuru99"
  action: string;
  timestamp: string;
}

export const RECENT_ACTIVITY: ActivityFeedItem[] = [
  { id: "ac-1", actorPrefix: "User", actorHandle: "@TechGuru99", action: "submitted a bulk shipment request", timestamp: "12:00 PM" },
  { id: "ac-2", actorPrefix: "Customer Support", actorHandle: "@SupportKen", action: "added a priority tag to Order ID 77889IKL", timestamp: "11:30 AM" },
  { id: "ac-3", actorPrefix: "User", actorHandle: "@SallyMae88", action: "initiated a return process for Order ID 445560H", timestamp: "11:00 AM" },
  { id: "ac-4", actorPrefix: "Administrator", actorHandle: "@AdminLisa", action: "resolved a delivery issue for Order ID 12345XYZ", timestamp: "10:15 AM" },
];
