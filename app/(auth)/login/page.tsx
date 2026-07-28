"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { Field } from "@/components/ui/Input";
import { PasswordField } from "@/components/ui/PasswordField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LEN = 8;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!email.trim()) {
      next.email = "Email address is required.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < MIN_PASSWORD_LEN) {
      next.password = `Password must be at least ${MIN_PASSWORD_LEN} characters.`;
    }
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // No backend: simulate a session in localStorage-free way via a cookie-less
    // in-memory flag is not persistable across navigation, so we use
    // sessionStorage which is permitted outside of artifacts (real app, not an artifact).
    try {
      window.sessionStorage.setItem(
        "shipnow_session",
        JSON.stringify({ email, remember, at: Date.now() })
      );
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-dvh w-full flex flex-col tablet:flex-row bg-white">
      {/* Left / hero panel */}
      <section className="relative bg-brand-500 px-6 py-8 tablet:w-1/2 tablet:px-10 tablet:py-10 desktop:px-14 desktop:py-12 flex flex-col">
        <Logo variant="onBrand" size="md" className="tablet:hidden justify-center" />
        <Logo variant="onBrand" size="xl" className="hidden tablet:flex justify-center" />

        {/* Hero image block: main photo is narrower than the panel, leaving
            room on the right for the inset photo to overhang the top-right
            corner — matches the Figma collage exactly. */}
        <div className="mt-12 tablet:mt-16 relative w-[62%] max-w-[280px] mx-auto tablet:w-[58%] tablet:max-w-[240px] desktop:w-[440px] desktop:max-w-none">
          <div className="relative aspect-[29/27] w-full overflow-hidden rounded-xl shadow-lg desktop:aspect-auto desktop:h-[400px]">
            <Image
              src="/images/login-hero-main.jpg"
              alt="Delivery van loaded with parcels on a city street"
              fill
              sizes="(min-width: 1440px) 440px, (min-width: 768px) 24vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -top-[12%] right-[-22%] w-[42%] aspect-[103/160] overflow-hidden rounded-lg border-[3px] border-white shadow-xl">
            <Image
              src="/images/login-hero-inset.jpg"
              alt="Customer checking a delivery on their phone"
              fill
              sizes="16vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-10 tablet:mt-14 text-center desktop:w-[487px] mx-auto">
          <h1 className="font-display text-2xl tablet:text-[26px] font-extrabold text-white">
            Welcome to ShipNow
          </h1>
          <p className="mt-3 text-sm text-white/85 max-w-sm mx-auto">
            Manage your shipments, fleet, and warehouse in one smart dashboard.
          </p>
        </div>
      </section>

      {/* Right / form panel */}
      <section className="flex flex-1 items-center justify-center bg-white px-6 py-10 tablet:px-10 desktop:px-16">
        <div className="w-full max-w-[380px]">
          <div className="flex justify-center mb-6">
            <LogoMark size={26} />
          </div>

          <h2 className="text-center font-display text-xl font-bold text-ink-950">
            Welcome Back
          </h2>
          <p className="mt-1.5 text-center text-sm text-ink-500">
            Log in to continue managing your logistics with ShipNow
          </p>

          <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
            <Field
              label="Email Address"
              type="email"
              placeholder="Enter a valid email address"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <PasswordField
              label="Password"
              placeholder="Create a strong password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <div className="flex items-center justify-between pt-1">
              <Checkbox
                label="Remember Me"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-brand-500 hover:text-brand-600"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Logging in…" : "Login"}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-ink-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-brand-500 hover:text-brand-600">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}