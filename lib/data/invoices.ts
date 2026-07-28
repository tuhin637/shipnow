import { Invoice } from "@/lib/types";

export const INVOICE_STATS = [
  { id: "paid", label: "Paid Invoices", amount: 28890, count: 350, icon: "ShieldCheck" as const },
  { id: "unpaid", label: "Unpaid Invoices", amount: 16700, count: 120, icon: "FileX2" as const },
  { id: "pending", label: "Pending Invoices", amount: 8050, count: 80, icon: "CircleDashed" as const },
  { id: "overdue", label: "Overdue Invoices", amount: 22110, count: 245, icon: "Clock" as const },
];

type SeedInvoice = Omit<Invoice, "billFrom" | "billTo" | "lineItems" | "taxRate" | "fee" | "note"> &
  Partial<Pick<Invoice, "billFrom" | "billTo" | "lineItems" | "taxRate" | "fee" | "note">>;

const SHIPNOW_LOGISTICS = {
  name: "ShipNow Logistics",
  email: "accounts@shipnow.com",
  address: "901 Distribution Ave, Charlotte, NC 28217, USA",
  phone: "+1 704-555-9911",
};

/**
 * Read directly off the Figma "Invoices & Billing" screenshots (id, company,
 * dates, amount, status). Full billing detail (Bill From/To, line items,
 * note) is authored for the four invoices below per assignment §4.7; the
 * rest get a single generated line item so every row is still selectable
 * and its totals are always computed from lineItems, never hard-coded.
 */
const SEED_INVOICES: SeedInvoice[] = [
  {
    id: "INV-1001",
    company: "TechGear Inc.",
    shippingId: "#SH9283746",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    amount: 1250.0,
    status: "Paid",
    billFrom: { name: "TechGear Inc.", email: "billing@techgear.com", address: "220 Circuit Row, Los Angeles, CA 90012, USA", phone: "+1 213-555-4410" },
    billTo: SHIPNOW_LOGISTICS,
    lineItems: [
      { description: "Wireless Router Bundle", shipmentType: "Air Freight Express", price: 250, qty: 3 },
      { description: "Smart Home Hub", shipmentType: "Air Freight Standard", price: 250, qty: 2 },
    ],
    taxRate: 0.08,
    fee: 10,
    note: "Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.",
  },
  {
    id: "INV-1002",
    company: "StyleHub Co.",
    shippingId: "#SH9182635",
    issueDate: "Mar 16, 2035",
    dueDate: "Mar 23, 2035",
    amount: 980.0,
    status: "Unpaid",
    billFrom: { name: "StyleHub Co.", email: "billing@stylehub.com", address: "48 Garment St, New York, NY 10001, USA", phone: "+1 212-555-7731" },
    billTo: SHIPNOW_LOGISTICS,
    lineItems: [
      { description: "Denim Jacket Case", shipmentType: "Road Freight Standard", price: 140, qty: 6 },
      { description: "Accessory Box", shipmentType: "Road Freight Express", price: 100, qty: 1 },
    ],
    taxRate: 0.08,
    fee: 8,
    note: "Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.",
  },
  {
    id: "INV-1003",
    company: "FreshNest",
    shippingId: "#SH9037821",
    issueDate: "Mar 14, 2035",
    dueDate: "Mar 21, 2035",
    amount: 1320.0,
    status: "Paid",
  },
  {
    id: "INV-1004",
    company: "FitPlus Gear",
    shippingId: "#SH9374652",
    issueDate: "Mar 17, 2035",
    dueDate: "Mar 24, 2035",
    amount: 1150.0,
    status: "Unpaid",
  },
  {
    id: "INV-1005",
    company: "AutoParts Pro",
    shippingId: "#SH9457830",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    amount: 1480.0,
    status: "Overdue",
    billFrom: { name: "AutoParts Pro", email: "billing@autopartspro.com", address: "77 Assembly Ave, Detroit, MI 48201, USA", phone: "+1 313-555-2290" },
    billTo: SHIPNOW_LOGISTICS,
    lineItems: [
      { description: "Brake Pad Set", shipmentType: "Road Freight Standard", price: 210, qty: 4 },
      { description: "Engine Filter Kit", shipmentType: "Road Freight Standard", price: 160, qty: 4 },
    ],
    taxRate: 0.08,
    fee: 12,
    note: "This invoice is past due. Please settle the balance immediately to avoid service suspension.",
  },
  {
    id: "INV-1006",
    company: "EcoLights",
    shippingId: "#SH8821349",
    issueDate: "Mar 13, 2035",
    dueDate: "Mar 20, 2035",
    amount: 790.0,
    status: "Paid",
  },
  {
    id: "INV-1007",
    company: "GreenHaven",
    shippingId: "#SH8967432",
    issueDate: "Mar 14, 2035",
    dueDate: "Mar 21, 2035",
    amount: 875.0,
    status: "Paid",
  },
  {
    id: "INV-1008",
    company: "ModaWear",
    shippingId: "#SH8893247",
    issueDate: "Mar 16, 2035",
    dueDate: "Mar 23, 2035",
    amount: 910.0,
    status: "Unpaid",
    billFrom: { name: "ModaWear", email: "billing@modawear.com", address: "89 Franklin St, Boston, MA 02110, USA", phone: "+1 617-555-2290" },
    billTo: SHIPNOW_LOGISTICS,
    lineItems: [
      { description: "Lightweight Hoodie Pack", shipmentType: "Road Freight Express", price: 120, qty: 3 },
      { description: "Autumn Jacket Set", shipmentType: "Road Freight Standard", price: 180, qty: 2 },
      { description: "Lightweight Hoodie Pack", shipmentType: "Road Freight Express", price: 95, qty: 2 },
    ],
    taxRate: 0.08,
    fee: 10,
    note: "Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.",
  },
  {
    id: "INV-1009",
    company: "SunCore Panels",
    shippingId: "#SH9018723",
    issueDate: "Mar 17, 2035",
    dueDate: "Mar 24, 2035",
    amount: 1600.0,
    status: "Unpaid",
  },
  {
    id: "INV-1010",
    company: "VitaFresh",
    shippingId: "#SH8881190",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    amount: 1120.0,
    status: "Overdue",
  },
  {
    id: "INV-1011",
    company: "SmartAppliance",
    shippingId: "#SH8923752",
    issueDate: "Mar 18, 2035",
    dueDate: "Mar 25, 2035",
    amount: 1050.0,
    status: "Paid",
  },
];

/** Fill in a single generated line item for any invoice that wasn't hand-authored above. */
function withLineItems(inv: SeedInvoice): Invoice {
  if (inv.lineItems && inv.billFrom && inv.billTo) return inv as Invoice;
  const price = Math.round((inv.amount / 1.08 - 10) * 100) / 100;
  return {
    ...inv,
    billFrom: {
      name: inv.company,
      email: `billing@${inv.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      address: "Address on file",
      phone: "+1 555-010-0000",
    },
    billTo: SHIPNOW_LOGISTICS,
    lineItems: [{ description: "Shipment Package", shipmentType: "Road Freight Standard", price, qty: 1 }],
    taxRate: 0.08,
    fee: 10,
    note: "Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.",
  } as Invoice;
}

export const INVOICES: Invoice[] = SEED_INVOICES.map(withLineItems);

export function calculateInvoiceTotals(invoice: Invoice) {
  const subTotal = invoice.lineItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subTotal * invoice.taxRate * 100) / 100;
  const total = Math.round((subTotal + tax + invoice.fee) * 100) / 100;
  return { subTotal, tax, total };
}