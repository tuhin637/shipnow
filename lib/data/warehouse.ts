import {
  WarehouseZone,
  WarehouseStorageRow,
  PackageStatusItem,
  ActivityLogItem,
  FreightType,
} from "@/lib/types";

export const FREIGHT_TABS: FreightType[] = ["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"];

export const WAREHOUSE_STATS = [
  { id: "sku", label: "Total SKU", value: "285", suffix: null, trendPct: "+2.58%", trendLabel: "" },
  { id: "qty", label: "Quantity on Hand", value: "12,450", suffix: "units", trendPct: "+4.37%", trendLabel: "" },
  { id: "capacity", label: "Capacity Usage", value: "62.5%", suffix: "Full", trendPct: "+1.54%", trendLabel: "" },
] as const;

export type InventoryFill = "solid-brand" | "stripe-brand" | "solid-ink" | "stripe-ink" | "solid-gray" | "dot-gray";

export const WAREHOUSE_INVENTORY_TOTAL = 10000;

export const WAREHOUSE_INVENTORY = [
  { name: "Electronics", pct: 25, count: 2500, fill: "solid-brand" as InventoryFill },
  { name: "Apparel", pct: 20, count: 2000, fill: "stripe-brand" as InventoryFill },
  { name: "Home & Kitchen", pct: 18, count: 1800, fill: "solid-ink" as InventoryFill },
  { name: "Beauty & Health", pct: 15, count: 1500, fill: "stripe-ink" as InventoryFill },
  { name: "Automotive Parts", pct: 12, count: 1200, fill: "solid-gray" as InventoryFill },
  { name: "Sports Equipment", pct: 10, count: 1000, fill: "dot-gray" as InventoryFill },
];

/** Loaded/empty shelves — 40 / 64 = 62.5%, consistent with the "Capacity Usage" stat card. */
export const CAPACITY_USAGE = { totalPct: 62.5, loadedShelves: 40, emptyShelves: 24 };

export const PACKAGE_STATUS_ITEMS: PackageStatusItem[] = [
  { id: "PKG-HK77420", date: "March 20, 2035 – 05:30 PM", status: "Sent" },
  { id: "PKG-A50812", date: "March 21, 2035 – 01:45 PM", status: "Received" },
  { id: "PKG-E10293", date: "March 22, 2035 – 09:00 AM", status: "Expected" },
  { id: "PKG-D33871", date: "March 22, 2035 – 11:20 AM", status: "Expected" },
  { id: "PKG-C90441", date: "March 19, 2035 – 03:10 PM", status: "Received" },
  { id: "PKG-F11209", date: "March 18, 2035 – 10:05 AM", status: "Sent" },
];

export const WAREHOUSE_STORAGE_ROWS: WarehouseStorageRow[] = [
  { floor: 1, section: "A1 – A10", category: "Electronics", storageUsedPct: 80, available: 20, total: 100 },
  { floor: 2, section: "B1 – B10", category: "Apparel", storageUsedPct: 60, available: 40, total: 100 },
  { floor: 1, section: "C1 – C10", category: "Home & Kitchen", storageUsedPct: 90, available: 10, total: 100 },
  { floor: 3, section: "D1 – D10", category: "Automotive Parts", storageUsedPct: 50, available: 50, total: 100 },
  { floor: 2, section: "E1 – E10", category: "Beauty & Health", storageUsedPct: 70, available: 30, total: 100 },
  { floor: 3, section: "F1 – F10", category: "Sports Equipment", storageUsedPct: 55, available: 45, total: 100 },
];

function makeCells(prefix: string, count: number, fullIndexes: number[]): { code: string; full: boolean }[] {
  return Array.from({ length: count }, (_, i) => ({
    code: `${prefix}${i + 1}`,
    full: fullIndexes.includes(i + 1),
  }));
}

/** Only "Floor 1" is shown in the Figma frame; Floor 2/3 are reasonable generated variants (assignment §5). */
export const WAREHOUSE_MAP_FLOORS: Record<"Floor 1" | "Floor 2" | "Floor 3", WarehouseZone[]> = {
  "Floor 1": [
    { name: "Electronics", cells: makeCells("A", 3, [2]), availableOf100: 20 },
    { name: "Home & Kitchen", cells: makeCells("C", 3, [1, 3]), availableOf100: 10 },
    { name: "Automotive Parts", cells: makeCells("D", 3, []), availableOf100: 50 },
    { name: "Sports Equipment", cells: makeCells("F", 3, [3]), availableOf100: 45 },
    { name: "Apparel", cells: makeCells("B", 10, [3, 4, 8, 9]), availableOf100: 20 },
    { name: "Beauty & Health", cells: makeCells("E", 4, [2]), availableOf100: 30 },
  ],
  "Floor 2": [
    { name: "Electronics", cells: makeCells("A", 3, []), availableOf100: 55 },
    { name: "Home & Kitchen", cells: makeCells("C", 3, [1]), availableOf100: 35 },
    { name: "Automotive Parts", cells: makeCells("D", 3, [1, 2]), availableOf100: 15 },
    { name: "Sports Equipment", cells: makeCells("F", 3, []), availableOf100: 60 },
    { name: "Apparel", cells: makeCells("B", 10, [1, 2, 3, 4, 5]), availableOf100: 10 },
    { name: "Beauty & Health", cells: makeCells("E", 4, [4]), availableOf100: 40 },
  ],
  "Floor 3": [
    { name: "Electronics", cells: makeCells("A", 3, [1, 2, 3]), availableOf100: 5 },
    { name: "Home & Kitchen", cells: makeCells("C", 3, []), availableOf100: 65 },
    { name: "Automotive Parts", cells: makeCells("D", 3, [3]), availableOf100: 40 },
    { name: "Sports Equipment", cells: makeCells("F", 3, [1]), availableOf100: 30 },
    { name: "Apparel", cells: makeCells("B", 10, [6, 7]), availableOf100: 45 },
    { name: "Beauty & Health", cells: makeCells("E", 4, []), availableOf100: 55 },
  ],
};

export const WAREHOUSE_ACTIVITY_LOG: ActivityLogItem[] = [
  {
    id: "act-1",
    actor: "Leo Fernandez",
    action: "confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)",
    timestamp: "01:45 PM",
  },
  {
    id: "act-2",
    actor: "Ava Martinez",
    action: "added 25 units of Smart Router Kit to Section A1 (Electronics)",
    timestamp: "09:15 AM",
  },
  {
    id: "act-3",
    actor: "Oscar Liem",
    action: "dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)",
    timestamp: "05:30 PM",
  },
  {
    id: "act-4",
    actor: "Dina Choi",
    action: "created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)",
    timestamp: "04:10 PM",
  },
  {
    id: "act-5",
    actor: "Priya Nair",
    action: "flagged low stock for Yoga Mat Pro in Section F1 (Sports Equipment)",
    timestamp: "02:05 PM",
  },
];