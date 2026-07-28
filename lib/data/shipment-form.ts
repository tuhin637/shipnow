import { FreightType } from "@/lib/types";

export interface ShipmentFormValues {
  // Sender Info
  senderCompany: string;
  senderEmail: string;
  senderPhone: string;
  pickupAddress: string;
  // Recipient Info
  recipientCompany: string;
  recipientEmail: string;
  recipientPhone: string;
  deliveryAddress: string;
  // Package Details
  itemDescription: string;
  quantity: number;
  value: string;
  weight: string;
  units: string;
  length: string;
  width: string;
  height: string;
  // Shipping Details
  freightType: FreightType;
  carrier: string;
  shippingMethod: string;
  shipmentId: string;
  shipmentDate: string;
  notes: string;
  insuranceCoverage: boolean;
  signatureOnDelivery: boolean;
  temperatureControl: boolean;
  fragileItemHandling: boolean;
  notifyRecipient: boolean;
}

/**
 * Seed values read directly off the Figma "Create New Shipment" frame
 * (per assignment §5). The frame is *deliberately* shown in an error
 * state (§4.6): Delivery Address and Shipping Method are left blank so
 * their "required" errors are visible by default, exactly as designed —
 * every other field is pre-filled with the design's own values.
 */
export const SHIPMENT_FORM_DEFAULTS: ShipmentFormValues = {
  senderCompany: "GreenHaven",
  senderEmail: "logistics@greenhaven.com",
  senderPhone: "408-555-7210",
  pickupAddress: "1120 Birch Street, Portland, OR 97205, USA",

  recipientCompany: "FreshNest",
  recipientEmail: "warehouse@freshnest.com",
  recipientPhone: "786-555-4432",
  deliveryAddress: "",

  itemDescription: "Premium Garden Tool Set",
  quantity: 40,
  value: "$3,200",
  weight: "125",
  units: "Kg",
  length: "80",
  width: "60",
  height: "",

  freightType: "Road Freight",
  carrier: "FedEx",
  shippingMethod: "",
  shipmentId: "#SH9583742",
  shipmentDate: "March 21, 2035",
  notes: "",
  insuranceCoverage: true,
  signatureOnDelivery: true,
  temperatureControl: true,
  fragileItemHandling: false,
  notifyRecipient: true,
};

export const FREIGHT_TYPES: FreightType[] = ["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"];

export const CARRIER_OPTIONS = ["FedEx", "DHL", "UPS", "USPS", "Aramex", "Local Courier"];

export const SHIPPING_METHOD_OPTIONS = ["Standard", "Express", "Overnight", "Economy"];

export const WEIGHT_UNIT_OPTIONS = ["Kg", "Lb"];

export const PHONE_COUNTRY_OPTIONS = [{ code: "US", dial: "+1", flag: "🇺🇸" }];