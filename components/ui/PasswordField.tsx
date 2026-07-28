"use client";

import { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Label } from "@/components/ui/Input";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
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
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full h-11 rounded-[10px] border bg-ink-50 pl-3.5 pr-11 text-sm text-ink-950 placeholder:text-ink-400 outline-none transition-colors",
              "focus:bg-white focus:border-brand-400",
              error ? "border-danger bg-white" : "border-transparent",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
          >
            {visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);
PasswordField.displayName = "PasswordField";
