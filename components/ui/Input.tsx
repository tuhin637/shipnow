import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils/cn";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-sm font-medium text-ink-950 mb-1.5", className)}
      {...props}
    />
  );
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/** Text input with optional label + error message, per the ShipNow form spec. */
export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId}>
            {label}
            {props.required && <span className="text-danger"> *</span>}
          </Label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "w-full h-11 rounded-[10px] border bg-ink-50 px-3.5 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors",
            "focus:bg-white focus:border-brand-400",
            error ? "border-danger bg-white" : "border-transparent",
            className
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-danger">
            {error}
          </p>
        ) : hint ? (
          <p className="mt-1 text-xs text-ink-400">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Field.displayName = "Field";
