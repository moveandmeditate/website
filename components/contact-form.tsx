"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContact } from "@/lib/contact-action";
import { INTERESTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: undefined as unknown as ContactInput["interest"],
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  const interest = watch("interest");

  const onSubmit = (values: ContactInput) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitContact(values);
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        setServerError(res.error);
      }
    });
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-bg p-8 border border-line-2 text-center"
      >
        <CheckCircle2 className="size-10 text-gold-dk mx-auto mb-4" aria-hidden />
        <h3 className="font-serif text-[1.6rem] text-ink">Thank you.</h3>
        <p className="mt-3 text-[13px] leading-[1.8] text-muted max-w-prose mx-auto">
          Your note is on its way to Amisha and the team. We&apos;ll reply within one working day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[11px] tracking-[0.24em] font-medium border-b border-ink pb-1 hover:text-gold-dk hover:border-gold-dk transition-colors"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg p-6 sm:p-7 border border-line-2 space-y-4"
      aria-describedby={serverError ? "contact-server-error" : undefined}
    >
      {/* Honeypot — hidden from sighted users + screen readers */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className="rounded-none border-line-2 focus-visible:border-ink"
            {...register("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="rounded-none border-line-2 focus-visible:border-ink"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            className="rounded-none border-line-2 focus-visible:border-ink"
            {...register("phone")}
          />
        </Field>
        <Field id="interest" label="I'm interested in" error={errors.interest?.message}>
          <Select
            value={interest}
            onValueChange={(val) =>
              setValue("interest", val as ContactInput["interest"], { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="interest"
              aria-invalid={!!errors.interest}
              className="rounded-none border-line-2 focus-visible:border-ink w-full"
            >
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              {INTERESTS.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={4}
          aria-invalid={!!errors.message}
          className="rounded-none border-line-2 focus-visible:border-ink resize-y min-h-[120px]"
          {...register("message")}
        />
      </Field>

      {serverError && (
        <p
          id="contact-server-error"
          role="alert"
          className="text-[12px] text-red-600"
        >
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full sm:w-auto rounded-none bg-ink text-bg tracking-[0.22em] text-[11px] font-medium hover:bg-ink-2"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" aria-hidden /> SENDING…
          </>
        ) : (
          <>
            SEND MESSAGE
            <Send className="size-4 ml-2" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-[10px] tracking-[0.22em] uppercase text-muted font-medium">
        {label}
      </Label>
      <div className="mt-1">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className={cn("mt-1.5 text-[11px] text-red-600")}
        >
          {error}
        </p>
      )}
    </div>
  );
}
