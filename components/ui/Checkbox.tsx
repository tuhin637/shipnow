import { InputHTMLAttributes, forwardRef, useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <label
        htmlFor={inputId}
        className="inline-flex items-center gap-2 cursor-pointer select-none text-sm text-ink-700"
      >
        <span className="relative inline-flex">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn("peer sr-only", className)}
            {...props}
          />
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-[4px] border border-ink-300 bg-white transition-colors",
              "peer-checked:bg-brand-500 peer-checked:border-brand-500 peer-checked:[&_svg]:opacity-100",
              "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-400 peer-focus-visible:outline-offset-2",
              "peer-disabled:opacity-50"
            )}
          >
            <Check size={12} className="text-white opacity-0" strokeWidth={3} />
          </span>
        </span>
        {label}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
