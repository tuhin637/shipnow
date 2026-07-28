import { Shipment, ShipmentStatus } from "@/lib/types";

export const SHIPMENT_STATUSES: ShipmentStatus[] = [
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Processing",
];

export const CARRIERS = ["FedEx", "DHL", "UPS", "USPS", "Aramex", "Local Courier"];

/**
 * These 11 records are read directly off the Figma "Shipments (Table)"
 * screenshot — id, freight type, company, broad company category, carrier,
 * specific product category, weight, route, ATD/ETA, progress, stage — per
 * assignment §5, seeded from the design rather than lorem ipsum. Note the
 * distinction Figma itself makes: `companyCategory` is the company's broad
 * industry (shown under its name), while `productCategory` is the specific
 * category of *this* shipment's cargo (its own table column) — they only
 * match when the shipment's cargo is generic to that company's industry.
 */
const SEED_SHIPMENTS: Shipment[] = [
  { id: "#SH9283746", company: "TechGear Inc.", companyCategory: "Electronics", productCategory: "Electronics", carrier: "FedEx", freightType: "Air Freight", weightKg: 1200, originCity: "Minneapolis, MN", originLabel: "Origin", destinationCity: "Kansas City, MO", destinationLabel: "Destination", atd: "Mar 20, 2035 – 10:00 AM", eta: "Mar 23, 2035 – 03:00 PM", progress: 60, status: "In Transit", stage: "Delivery", date: "2035-03-20" },
  { id: "#SH9182635", company: "StyleHub Co.", companyCategory: "Apparel", productCategory: "Apparel", carrier: "DHL", freightType: "Road Freight", weightKg: 850, originCity: "New York, NY", originLabel: "Origin", destinationCity: "Atlanta, GA", destinationLabel: "Destination", atd: "Mar 19, 2035 – 11:30 AM", eta: "Mar 22, 2035 – 01:00 PM", progress: 75, status: "Out for Delivery", stage: "Delivery", date: "2035-03-19" },
  { id: "#SH9037821", company: "FreshNest", companyCategory: "Home & Kitchen", productCategory: "Kitchen Appliances", carrier: "UPS", freightType: "Ocean Freight", weightKg: 1450, originCity: "Dallas, TX", originLabel: "Origin", destinationCity: "Miami, FL", destinationLabel: "Destination", atd: "Mar 18, 2035 – 09:00 AM", eta: "Mar 21, 2035 – 06:00 PM", progress: 100, status: "Delivered", stage: "Completed", date: "2035-03-18" },
  { id: "#SH9374652", company: "FitPlus Gear", companyCategory: "Sports & Outdoors", productCategory: "Fitness Equipment", carrier: "USPS", freightType: "Rail Freight", weightKg: 960, originCity: "Seattle, WA", originLabel: "Origin", destinationCity: "Denver, CO", destinationLabel: "Destination", atd: "Mar 21, 2035 – 08:45 AM", eta: "Mar 25, 2035 – 04:30 PM", progress: 40, status: "Processing", stage: "Pending", date: "2035-03-21" },
  { id: "#SH9457830", company: "AutoParts Pro", companyCategory: "Automotive", productCategory: "Engine Components", carrier: "Aramex", freightType: "Road Freight", weightKg: 1680, originCity: "Detroit, MI", originLabel: "Origin", destinationCity: "San Diego, CA", destinationLabel: "Destination", atd: "Mar 20, 2035 – 07:15 AM", eta: "Mar 26, 2035 – 02:00 PM", progress: 50, status: "In Transit", stage: "Delivery", date: "2035-03-20" },
  { id: "#SH8821349", company: "EcoLights", companyCategory: "Electronics", productCategory: "Electronics", carrier: "FedEx", freightType: "Air Freight", weightKg: 1100, originCity: "Austin, TX", originLabel: "Origin", destinationCity: "Phoenix, AZ", destinationLabel: "Destination", atd: "Mar 19, 2035 – 12:00 PM", eta: "Mar 21, 2035 – 05:00 PM", progress: 90, status: "Out for Delivery", stage: "Delivery", date: "2035-03-19" },
  { id: "#SH8967432", company: "GreenHaven", companyCategory: "Home & Garden", productCategory: "Home Tools", carrier: "USPS", freightType: "Road Freight", weightKg: 1250, originCity: "Portland, OR", originLabel: "Origin", destinationCity: "Salt Lake City, UT", destinationLabel: "Destination", atd: "Mar 18, 2035 – 02:45 PM", eta: "Mar 22, 2035 – 11:00 AM", progress: 65, status: "In Transit", stage: "Delivery", date: "2035-03-18" },
  { id: "#SH8893247", company: "ModaWear", companyCategory: "Apparel", productCategory: "Apparel", carrier: "DHL", freightType: "Road Freight", weightKg: 920, originCity: "Boston, MA", originLabel: "Origin", destinationCity: "Charlotte, NC", destinationLabel: "Destination", atd: "Mar 20, 2035 – 01:00 PM", eta: "Mar 23, 2035 – 08:00 AM", progress: 80, status: "Out for Delivery", stage: "Delivery", date: "2035-03-20" },
  { id: "#SH9018723", company: "SunCore Panels", companyCategory: "Electronics", productCategory: "Solar Equipment", carrier: "UPS", freightType: "Rail Freight", weightKg: 1375, originCity: "San Diego, CA", originLabel: "Origin", destinationCity: "Reno, NV", destinationLabel: "Destination", atd: "Mar 21, 2035 – 09:30 AM", eta: "Mar 24, 2035 – 01:30 PM", progress: 30, status: "Processing", stage: "Pending", date: "2035-03-21" },
  { id: "#SH8881190", company: "VitaFresh", companyCategory: "Food & Beverage", productCategory: "Perishables", carrier: "Local Courier", freightType: "Road Freight", weightKg: 980, originCity: "Nashville, TN", originLabel: "Origin", destinationCity: "Jacksonville, FL", destinationLabel: "Destination", atd: "Mar 21, 2035 – 06:00 AM", eta: "Mar 22, 2035 – 10:00 AM", progress: 85, status: "Out for Delivery", stage: "Delivery", date: "2035-03-21" },
  { id: "#SH8776103", company: "StyleDepot", companyCategory: "Fashion", productCategory: "Fashion Items", carrier: "FedEx", freightType: "Air Freight", weightKg: 1020, originCity: "Minneapolis, MN", originLabel: "Origin", destinationCity: "Kansas City, MO", destinationLabel: "Destination", atd: "Mar 19, 2035 – 10:15 AM", eta: "Mar 22, 2035 – 03:30 PM", progress: 60, status: "In Transit", stage: "Delivery", date: "2035-03-19" },
];

const EXTRA_COMPANIES = [
  "NorthPeak Supply", "BlueWave Foods", "Rapid Freight Co.", "Cascade Hardware",
  "Solaris Energy", "Harbor Textiles", "Zenith Motors", "Alpine Outfitters",
  "Metro Pharma", "Coastal Furniture", "Vertex Robotics", "Golden Grain Co.",
  "Ironclad Tools", "PureBloom Cosmetics", "Summit Electronics", "Willow Home Goods",
];
const EXTRA_CATEGORIES = [
  "Electronics", "Apparel", "Home & Kitchen", "Automotive", "Sports & Outdoors",
  "Food & Beverage", "Home & Garden", "Fashion", "Industrial", "Health & Beauty",
];
const FREIGHT_TYPES = ["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"] as const;
const CITIES: [string, string][] = [
  ["Los Angeles, CA", "Chicago, IL"], ["New York, NY", "Atlanta, GA"], ["Dallas, TX", "Miami, FL"],
  ["Seattle, WA", "Denver, CO"], ["Austin, TX", "Phoenix, AZ"], ["Detroit, MI", "San Diego, CA"],
  ["Portland, OR", "Salt Lake City, UT"], ["Boston, MA", "Charlotte, NC"], ["Tampa, FL", "Houston, TX"],
  ["Nashville, TN", "Jacksonville, FL"], ["Minneapolis, MN", "Kansas City, MO"], ["Columbus, OH", "Raleigh, NC"],
];

/** Deterministic pseudo-random generator so mock data is stable across renders/builds. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The Figma screenshot's footer reads "Show 12 of 1,240 results" — the
 * design implies a much larger dataset than the 11 seeded records. Per
 * assignment §5 ("Where the design implies a larger dataset than it
 * displays, you may generate additional records so that pagination is
 * meaningful"), extra records are generated below so the total matches
 * what the design itself states, rather than an arbitrary smaller number.
 */
function generateExtra(count: number): Shipment[] {
  const rand = mulberry32(20260726);
  const extra: Shipment[] = [];
  for (let i = 0; i < count; i++) {
    const company = EXTRA_COMPANIES[i % EXTRA_COMPANIES.length];
    const category = EXTRA_CATEGORIES[i % EXTRA_CATEGORIES.length];
    const [origin, destination] = CITIES[i % CITIES.length];
    const status = SHIPMENT_STATUSES[Math.floor(rand() * SHIPMENT_STATUSES.length)];
    const carrier = CARRIERS[Math.floor(rand() * CARRIERS.length)];
    const freightType = FREIGHT_TYPES[Math.floor(rand() * FREIGHT_TYPES.length)];
    const progress = status === "Delivered" ? 100 : status === "Processing" ? Math.floor(20 + rand() * 30) : Math.floor(45 + rand() * 50);
    const day = 10 + (i % 18);
    const stage = status === "Delivered" ? "Completed" : status === "Processing" ? "Pending" : "Delivery";
    extra.push({
      id: `#SH${8000000 + Math.floor(rand() * 1999999)}`,
      company: `${company}${i >= EXTRA_COMPANIES.length ? ` ${Math.floor(i / EXTRA_COMPANIES.length) + 1}` : ""}`,
      companyCategory: category,
      productCategory: category,
      carrier,
      freightType,
      weightKg: Math.floor(800 + rand() * 900),
      originCity: origin,
      originLabel: "Origin",
      destinationCity: destination,
      destinationLabel: "Destination",
      atd: `Mar ${day}, 2035 – 0${1 + (i % 8)}:00 AM`,
      eta: `Mar ${day + 2}, 2035 – 0${2 + (i % 6)}:30 PM`,
      progress,
      status,
      stage,
      date: `2035-03-${String(day).padStart(2, "0")}`,
    });
  }
  return extra;
}

export const SHIPMENTS: Shipment[] = [...SEED_SHIPMENTS, ...generateExtra(1229)];

/**
 * Fixed top-row metric values, read directly off the Figma "Shipments
 * (Table)" screenshot (not derived from the mock dataset — the design's
 * numbers describe a larger real system than the sample data represents).
 */
export const SHIPMENTS_METRICS = [
  {
    id: "total",
    label: "Total Shipments",
    value: "1,284",
    icon: "Truck" as const,
    deltaPct: 4.6,
    deltaDirection: "up" as const,
    deltaLabel: "this week",
  },
  {
    id: "pending",
    label: "Pending",
    value: "285",
    icon: "Clock" as const,
    deltaPct: 8.7,
    deltaDirection: "up" as const,
    deltaLabel: "this week",
  },
  {
    id: "delivery",
    label: "Delivery",
    value: "594",
    icon: "Package" as const,
    deltaPct: 4.2,
    deltaDirection: "down" as const,
    deltaLabel: "from last week",
  },
  {
    id: "completed",
    label: "Completed",
    value: "405",
    icon: "SquareCheck" as const,
    deltaPct: 3.9,
    deltaDirection: "up" as const,
    deltaLabel: "this week",
  },
];