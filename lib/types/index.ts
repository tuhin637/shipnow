// ============================================================================
// Shared domain types for ShipNow
// ============================================================================

export type FreightType = "Road Freight" | "Rail Freight" | "Ocean Freight" | "Air Freight";

export type ShipmentStatus = "In Transit" | "Out for Delivery" | "Delivered" | "Processing";

/** Coarser status grouping used by Shipments screen tabs/metric cards */
export type ShipmentStage = "Pending" | "Delivery" | "Completed";

export interface Shipment {
  id: string; // e.g. #SH9283746
  company: string;
  companyLogo?: string;
  /** Broad industry shown under the company name (e.g. "Home & Kitchen") */
  companyCategory: string;
  carrier: string;
  freightType: FreightType;
  /** Specific product category shown in its own table column (e.g. "Kitchen Appliances") */
  productCategory: string;
  weightKg: number;
  originCity: string;
  originLabel: string; // "Origin"
  destinationCity: string;
  destinationLabel: string; // "Destination"
  atd: string; // Actual/Assigned time of departure
  eta: string; // Estimated time of arrival
  progress: number; // 0-100
  status: ShipmentStatus;
  stage: ShipmentStage;
  date: string; // ISO date used for filtering
}

export interface Invoice {
  id: string; // INV-1001
  company: string;
  companyLogo?: string;
  shippingId: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Pending" | "Overdue";
  billFrom: { name: string; email: string; address: string; phone: string };
  billTo: { name: string; email: string; address: string; phone: string };
  lineItems: {
    description: string;
    shipmentType: string;
    price: number;
    qty: number;
  }[];
  taxRate: number; // e.g. 0.08
  fee: number;
  note: string;
}

export interface WarehouseZoneCell {
  code: string; // A1, A2...
  full: boolean;
}

export interface WarehouseZone {
  name: string;
  cells: WarehouseZoneCell[];
  availableOf100: number;
}

export type PackageStatus = "Expected" | "Received" | "Sent";

export interface WarehouseStorageRow {
  floor: number;
  section: string;
  category: string;
  storageUsedPct: number;
  available: number;
  total: number;
}

export interface PackageStatusItem {
  id: string;
  date: string;
  status: PackageStatus;
}

export interface ActivityLogItem {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

export interface AlertItem {
  id: string;
  shipmentId: string;
  type: "Customs Clearance Delay" | "Incorrect Address Provided" | "Weather-Related Hold";
  freightType: FreightType;
  date: string;
}

/** Shipments screen view mode — see assignment §4.5 (view switcher). */
export type ShipmentsView = "table" | "grid";

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide icon name, resolved in Sidebar
  implemented: boolean;
}