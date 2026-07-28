"use client";

import { TextField, PhoneField } from "@/components/shipment-form/fields";
import { ShipmentFormValues } from "@/lib/data/shipment-form";

export function SenderRecipientPanel({
  values,
  errors,
  onChange,
}: {
  values: ShipmentFormValues;
  errors: Partial<Record<keyof ShipmentFormValues, string>>;
  onChange: <K extends keyof ShipmentFormValues>(key: K, value: ShipmentFormValues[K]) => void;
}) {
  return (
    <div className="rounded-2xl bg-ink-50 p-4 desktop:p-6">
      <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2 desktop:gap-8">
        {/* Sender Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-ink-950">Sender Info</h3>
          <TextField
            variant="white"
            label="Company"
            value={values.senderCompany}
            onChange={(e) => onChange("senderCompany", e.target.value)}
            error={errors.senderCompany}
            required
          />
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
            <TextField
              variant="white"
              type="email"
              label="Email"
              value={values.senderEmail}
              onChange={(e) => onChange("senderEmail", e.target.value)}
              error={errors.senderEmail}
              required
            />
            <PhoneField
              label="Phone Number"
              value={values.senderPhone}
              onChange={(v) => onChange("senderPhone", v)}
              error={errors.senderPhone}
              required
            />
          </div>
          <TextField
            variant="white"
            label="Pickup Address"
            value={values.pickupAddress}
            onChange={(e) => onChange("pickupAddress", e.target.value)}
            error={errors.pickupAddress}
            required
          />
        </div>

        {/* Recipient Info */}
        <div className="flex flex-col gap-4 border-t border-ink-200 pt-6 desktop:border-t-0 desktop:border-l desktop:pt-0 desktop:pl-8">
          <h3 className="text-sm font-semibold text-ink-950">Recipient Info</h3>
          <TextField
            variant="white"
            label="Company"
            value={values.recipientCompany}
            onChange={(e) => onChange("recipientCompany", e.target.value)}
            error={errors.recipientCompany}
            required
          />
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
            <TextField
              variant="white"
              type="email"
              label="Email"
              value={values.recipientEmail}
              onChange={(e) => onChange("recipientEmail", e.target.value)}
              error={errors.recipientEmail}
              required
            />
            <PhoneField
              label="Phone Number"
              value={values.recipientPhone}
              onChange={(v) => onChange("recipientPhone", v)}
              error={errors.recipientPhone}
              required
            />
          </div>
          <TextField
            variant="white"
            label="Delivery Address"
            placeholder="Street address, city, state/province, ZIP code"
            value={values.deliveryAddress}
            onChange={(e) => onChange("deliveryAddress", e.target.value)}
            error={errors.deliveryAddress}
            required
          />
        </div>
      </div>
    </div>
  );
}