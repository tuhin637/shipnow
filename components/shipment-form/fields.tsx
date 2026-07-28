"use client";

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useId } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FreightType } from "@/lib/types";
import { PHONE_COUNTRY_OPTIONS } from "@/lib/data/shipment-form";

/**
 * This screen's Figma frame renders its "required" validation state in the
 * brand purple, not the app's usual semantic red (see `--color-danger`
 * elsewhere) — reproduced exactly here rather than substituted, per
 * assignment §3.1 ("do not redesign any part of the interface").
 */
const ERROR_TEXT = "text-brand-600";
const ERROR_RING = "border-brand-400 ring-2 ring-brand-100";

function FieldShell({
  label,
  required,
  error,
  hint,
  htmlFor,
  children,
}: {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-ink-500">
          {label}
          {required && <span className={ERROR_TEXT}> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className={cn("mt-1 text-xs font-medium", ERROR_TEXT)}>{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}

type Variant = "white" | "filled";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: Variant;
}

/** Single-line text input. `variant="white"` = Sender/Recipient style, `variant="filled"` = Package/Shipping style. */
export function TextField({ label, error, hint, variant = "filled", className, id, required, ...props }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} required={required} error={error} hint={hint} htmlFor={inputId}>
      <input
        id={inputId}
        aria-invalid={!!error}
        required={required}
        className={cn(
          "h-11 w-full rounded-[10px] px-3.5 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors",
          variant === "white" ? "border border-ink-200 bg-white focus:border-brand-400" : "border border-transparent bg-ink-50 focus:bg-white focus:border-brand-400",
          error && ERROR_RING,
          className
        )}
        {...props}
      />
    </FieldShell>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextareaField({ label, error, className, id, rows = 3, ...props }: TextareaFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} error={error} htmlFor={inputId}>
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          "w-full resize-none rounded-[10px] border border-transparent bg-ink-50 px-3.5 py-3 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors focus:bg-white focus:border-brand-400",
          error && ERROR_RING,
          className
        )}
        {...props}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: string[];
  variant?: Variant;
}

export function SelectField({ label, error, placeholder, options, variant = "filled", className, id, value, ...props }: SelectFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} error={error} htmlFor={inputId}>
      <span className="relative block">
        <select
          id={inputId}
          value={value}
          aria-invalid={!!error}
          className={cn(
            "h-11 w-full appearance-none rounded-[10px] pl-3.5 pr-9 text-sm outline-none transition-colors",
            value ? "text-ink-950" : "text-ink-400",
            variant === "white" ? "border border-ink-200 bg-white focus:border-brand-400" : "border border-transparent bg-ink-50 focus:bg-white focus:border-brand-400",
            error && ERROR_RING,
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
      </span>
    </FieldShell>
  );
}

/** Read-only, visually "disabled" field for system-generated values (e.g. Shipment ID). */
export function ReadOnlyField({ label, value, hint }: { label: string; value: string; hint?: string }) {
  const autoId = useId();
  return (
    <FieldShell label={label} hint={hint} htmlFor={autoId}>
      <input
        id={autoId}
        value={value}
        readOnly
        tabIndex={-1}
        className="h-11 w-full cursor-not-allowed rounded-[10px] border border-transparent bg-ink-100 px-3.5 text-sm text-ink-500 outline-none"
      />
    </FieldShell>
  );
}

export function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const autoId = useId();
  return (
    <FieldShell label={label} htmlFor={autoId}>
      <span className="relative block">
        <input
          id={autoId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-[10px] border border-transparent bg-ink-50 pl-3.5 pr-9 text-sm text-ink-950 outline-none transition-colors focus:bg-white focus:border-brand-400"
        />
        <Calendar size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
      </span>
    </FieldShell>
  );
}

export function PhoneField({
  label,
  value,
  onChange,
  error,
  required,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const autoId = useId();
  const country = PHONE_COUNTRY_OPTIONS[0];
  return (
    <FieldShell label={label} required={required} error={error} htmlFor={autoId}>
      <div
        className={cn(
          "flex h-11 items-center rounded-[10px] border border-ink-200 bg-white transition-colors focus-within:border-brand-400",
          error && ERROR_RING
        )}
      >
        <span className="flex items-center gap-1 border-r border-ink-200 pl-3 pr-2.5 text-sm text-ink-700">
          <span aria-hidden="true">{country.flag}</span>
          {country.dial}
          <ChevronDown size={13} className="text-ink-400" />
        </span>
        <input
          id={autoId}
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className="h-full min-w-0 flex-1 rounded-r-[10px] bg-transparent px-3 text-sm text-ink-950 outline-none"
        />
      </div>
    </FieldShell>
  );
}

export function DimensionField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const autoId = useId();
  return (
    <div className="w-full">
      <span className="relative block">
        <input
          id={autoId}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-[10px] border border-transparent bg-ink-50 px-3.5 pr-10 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors focus:bg-white focus:border-brand-400"
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-400">cm</span>
      </span>
      <label htmlFor={autoId} className="mt-1.5 block text-xs text-ink-400">
        {label}
      </label>
    </div>
  );
}

export function QuantityField({
  label,
  value,
  onChange,
  min = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  const autoId = useId();
  return (
    <FieldShell label={label} htmlFor={autoId}>
      <span className="relative block">
        <input
          id={autoId}
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || min)}
          className="h-11 w-full rounded-[10px] border border-transparent bg-ink-50 px-3.5 pr-9 text-sm text-ink-950 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:bg-white focus:border-brand-400"
        />
        <span className="absolute right-1.5 top-1/2 flex -translate-y-1/2 flex-col overflow-hidden rounded-[6px] border border-ink-200 bg-white">
          <button
            type="button"
            aria-label={`Increase ${label}`}
            onClick={() => onChange(value + 1)}
            className="flex h-[19px] w-6 items-center justify-center text-ink-500 hover:bg-ink-50"
          >
            <ChevronDown size={11} className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label={`Decrease ${label}`}
            onClick={() => onChange(Math.max(min, value - 1))}
            className="flex h-[19px] w-6 items-center justify-center border-t border-ink-200 text-ink-500 hover:bg-ink-50"
          >
            <ChevronDown size={11} />
          </button>
        </span>
      </span>
    </FieldShell>
  );
}

export function FreightTypeGroup({
  value,
  onChange,
}: {
  value: FreightType;
  onChange: (v: FreightType) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium text-ink-500">Freight Type</legend>
      <div role="radiogroup" className="flex flex-wrap gap-x-6 gap-y-2.5">
        {(["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"] as FreightType[]).map((type) => {
          const checked = value === type;
          return (
            <label key={type} className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-700">
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                  checked ? "border-brand-500" : "border-ink-300"
                )}
              >
                {checked && <span className="h-2 w-2 rounded-full bg-brand-500" />}
              </span>
              <input
                type="radio"
                name="freightType"
                value={type}
                checked={checked}
                onChange={() => onChange(type)}
                className="sr-only"
              />
              {type}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
      <span className="relative inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "block h-6 w-10 rounded-full transition-colors",
            "peer-checked:bg-brand-500 bg-ink-200",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-400 peer-focus-visible:outline-offset-2"
          )}
        />
        <span
          className={cn(
            "absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4"
          )}
        />
      </span>
      {label}
    </label>
  );
}