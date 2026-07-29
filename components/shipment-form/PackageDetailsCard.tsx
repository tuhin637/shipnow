"use client";

import { TextField, SelectField, QuantityField, DimensionField } from "@/components/shipment-form/fields";
import { ShipmentFormValues, WEIGHT_UNIT_OPTIONS } from "@/lib/data/shipment-form";

export function PackageDetailsCard({
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
      <h3 className="text-sm font-semibold text-ink-950">Package Details</h3>

      <TextField
        label="Item Description"
        value={values.itemDescription}
        onChange={(e) => onChange("itemDescription", e.target.value)}
        error={errors.itemDescription}
        required
      />

      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
        <QuantityField label="Quantity" value={values.quantity} onChange={(v) => onChange("quantity", v)} />
        <TextField
          label="Value"
          value={values.value}
          onChange={(e) => onChange("value", e.target.value)}
          error={errors.value}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
        <TextField
          label="Weight"
          inputMode="decimal"
          value={values.weight}
          onChange={(e) => onChange("weight", e.target.value)}
          error={errors.weight}
          required
        />
        <SelectField
          label="Units"
          options={WEIGHT_UNIT_OPTIONS}
          value={values.units}
          onChange={(e) => onChange("units", e.target.value)}
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-ink-500">Dimensions</p>
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
          <DimensionField label="Length" value={values.length} onChange={(v) => onChange("length", v)} />
          <DimensionField label="Width" value={values.width} onChange={(v) => onChange("width", v)} />
          <DimensionField label="Height" placeholder="ex. 20" value={values.height} onChange={(v) => onChange("height", v)} />
        </div>
      </div>
    </div>
  );
}
