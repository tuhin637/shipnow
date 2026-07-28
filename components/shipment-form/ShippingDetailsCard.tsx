"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import {
  SelectField,
  ReadOnlyField,
  DateField,
  TextareaField,
  FreightTypeGroup,
  ToggleSwitch,
} from "@/components/shipment-form/fields";
import { ShipmentFormValues, CARRIER_OPTIONS, SHIPPING_METHOD_OPTIONS } from "@/lib/data/shipment-form";

export function ShippingDetailsCard({
  values,
  errors,
  onChange,
}: {
  values: ShipmentFormValues;
  errors: Partial<Record<keyof ShipmentFormValues, string>>;
  onChange: <K extends keyof ShipmentFormValues>(key: K, value: ShipmentFormValues[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-ink-950">Shipping Details</h3>

      <FreightTypeGroup value={values.freightType} onChange={(v) => onChange("freightType", v)} />

      <div className="grid grid-cols-2 gap-4 tablet:grid-cols-4">
        <SelectField
          label="Carrier"
          options={CARRIER_OPTIONS}
          value={values.carrier}
          onChange={(e) => onChange("carrier", e.target.value)}
        />
        <SelectField
          label="Shipping Method"
          placeholder="Select Method"
          options={SHIPPING_METHOD_OPTIONS}
          value={values.shippingMethod}
          onChange={(e) => onChange("shippingMethod", e.target.value)}
          error={errors.shippingMethod}
          required
        />
        <ReadOnlyField label="Shipment ID" value={values.shipmentId} hint="Auto-generated" />
        <DateField label="Shipment Date" value={values.shipmentDate} onChange={(v) => onChange("shipmentDate", v)} />
      </div>

      <TextareaField
        label="Notes"
        placeholder="Add special delivery notes (optional)"
        value={values.notes}
        onChange={(e) => onChange("notes", e.target.value)}
      />

      <div className="mt-2 grid grid-cols-1 gap-6 tablet:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-2.5 text-xs font-medium text-ink-500">Additional Services</p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 tablet:grid-cols-2">
            <Checkbox
              label="Insurance Coverage"
              checked={values.insuranceCoverage}
              onChange={(e) => onChange("insuranceCoverage", e.target.checked)}
            />
            <Checkbox
              label="Temperature Control"
              checked={values.temperatureControl}
              onChange={(e) => onChange("temperatureControl", e.target.checked)}
            />
            <Checkbox
              label="Signature on Delivery"
              checked={values.signatureOnDelivery}
              onChange={(e) => onChange("signatureOnDelivery", e.target.checked)}
            />
            <Checkbox
              label="Fragile Item Handling"
              checked={values.fragileItemHandling}
              onChange={(e) => onChange("fragileItemHandling", e.target.checked)}
            />
          </div>
        </div>

        <div className="tablet:text-right">
          <p className="mb-2.5 text-xs font-medium text-ink-500">Tracking & Status Updates</p>
          <ToggleSwitch
            label="Notify Recipient via Email/SMS"
            checked={values.notifyRecipient}
            onChange={(v) => onChange("notifyRecipient", v)}
          />
        </div>
      </div>
    </div>
  );
}