"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ShipmentFormHeader } from "@/components/shipment-form/ShipmentFormHeader";
import { SenderRecipientPanel } from "@/components/shipment-form/SenderRecipientPanel";
import { PackageDetailsCard } from "@/components/shipment-form/PackageDetailsCard";
import { ShippingDetailsCard } from "@/components/shipment-form/ShippingDetailsCard";
import { ShipmentFormActions } from "@/components/shipment-form/ShipmentFormActions";
import { SHIPMENT_FORM_DEFAULTS, ShipmentFormValues } from "@/lib/data/shipment-form";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<keyof ShipmentFormValues, string>>;

function validate(values: ShipmentFormValues): Errors {
  const errors: Errors = {};

  if (!values.senderCompany.trim()) errors.senderCompany = "Company is required.";
  if (!values.senderEmail.trim()) errors.senderEmail = "Email is required.";
  else if (!EMAIL_RE.test(values.senderEmail)) errors.senderEmail = "Enter a valid email address.";
  if (!values.senderPhone.trim()) errors.senderPhone = "Phone number is required.";
  if (!values.pickupAddress.trim()) errors.pickupAddress = "Address is required.";

  if (!values.recipientCompany.trim()) errors.recipientCompany = "Company is required.";
  if (!values.recipientEmail.trim()) errors.recipientEmail = "Email is required.";
  else if (!EMAIL_RE.test(values.recipientEmail)) errors.recipientEmail = "Enter a valid email address.";
  if (!values.recipientPhone.trim()) errors.recipientPhone = "Phone number is required.";
  if (!values.deliveryAddress.trim()) errors.deliveryAddress = "Address is required.";

  if (!values.itemDescription.trim()) errors.itemDescription = "Item description is required.";
  if (!values.value.trim()) errors.value = "Value is required.";
  if (!values.weight.trim() || Number.isNaN(Number(values.weight)) || Number(values.weight) <= 0) {
    errors.weight = "Enter a valid weight.";
  }

  if (!values.shippingMethod.trim()) errors.shippingMethod = "Shipping method is required.";

  return errors;
}

/**
 * The Figma frame is deliberately shown *already* in an error state (§4.6):
 * Delivery Address and Shipping Method start blank with their errors
 * visible. Reproducing that means treating the form as already "submitted"
 * on first render — every other pre-filled field is valid so no other
 * error shows, matching the design exactly, while still being real,
 * live validation from that point on.
 */
export function CreateShipmentForm() {
  const router = useRouter();
  const [values, setValues] = useState<ShipmentFormValues>(SHIPMENT_FORM_DEFAULTS);
  const [submitted, setSubmitted] = useState(true);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => (submitted ? validate(values) : {}), [submitted, values]);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange<K extends keyof ShipmentFormValues>(key: K, value: ShipmentFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleDelete() {
    setValues({
      ...SHIPMENT_FORM_DEFAULTS,
      senderCompany: "",
      senderEmail: "",
      senderPhone: "",
      pickupAddress: "",
      recipientCompany: "",
      recipientEmail: "",
      recipientPhone: "",
      deliveryAddress: "",
      itemDescription: "",
      quantity: 1,
      value: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      shippingMethod: "",
      notes: "",
      insuranceCoverage: false,
      signatureOnDelivery: false,
      temperatureControl: false,
      fragileItemHandling: false,
      notifyRecipient: false,
    });
    setSubmitted(false);
    setSuccess(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(values)).length === 0) {
      setSuccess(true);
      window.setTimeout(() => router.push("/shipments"), 1100);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col gap-5">
        <ShipmentFormHeader />
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-success">
            <CheckCircle2 size={28} />
          </span>
          <h2 className="font-display text-lg font-bold text-ink-950">Shipment created</h2>
          <p className="max-w-xs text-sm text-ink-500">
            {values.shipmentId} has been added. Redirecting you to Shipments…
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <ShipmentFormHeader />

      <div className="rounded-2xl bg-white p-4 desktop:p-7 shadow-[var(--shadow-card)]">
        <h2 className="text-lg font-bold text-ink-950">Shipment Form</h2>

        {submitted && hasErrors && (
          <p className="mt-3 rounded-[10px] bg-brand-50 px-4 py-2.5 text-sm font-medium text-brand-600">
            Please fix the highlighted fields before submitting.
          </p>
        )}

        <div className="mt-5">
          <SenderRecipientPanel values={values} errors={errors} onChange={handleChange} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 desktop:grid-cols-2">
          <PackageDetailsCard values={values} errors={errors} onChange={handleChange} />
          <ShippingDetailsCard values={values} errors={errors} onChange={handleChange} />
        </div>

        <div className="mt-6">
          <ShipmentFormActions onDelete={handleDelete} />
        </div>
      </div>
    </form>
  );
}