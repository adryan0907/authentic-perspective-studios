"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitInquiry, type InquiryState } from "@/app/contact/actions";
import { siteConfig } from "@/data/site";
import {
  buildMailto,
  fieldsFromFormData,
  projectTypes,
  timelines,
  validateInquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { cx } from "@/lib/utils";

const initialState: InquiryState = { status: "idle", errors: {} };

const inputClass =
  "w-full rounded-sm border border-line bg-ink-2 px-4 py-3 text-bone placeholder:text-stone/60 focus:border-ember focus:outline-none aria-[invalid=true]:border-red-400";
const labelClass = "mb-2 block text-sm font-medium text-bone";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-400">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const [clientErrors, setClientErrors] = useState<InquiryErrors>({});

  // Server errors win after a submit; client errors surface before that.
  const errors = { ...clientErrors, ...state.errors };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const fields = fieldsFromFormData(new FormData(event.currentTarget));
    const found = validateInquiry(fields);
    setClientErrors(found);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-invalid="true"]',
      );
      firstInvalid?.focus();
    }
  };

  if (state.status === "sent") {
    return (
      <div
        role="status"
        className="border-ember/50 bg-ink-2 rounded-md border p-8 md:p-10"
      >
        <h2 className="text-h3 font-serif italic">Thank you — message received.</h2>
        <p className="text-stone mt-4 leading-relaxed">
          We read every inquiry personally and typically reply within two
          working days. In the meantime, feel free to keep exploring the work.
        </p>
        <Link
          href="/work"
          className="text-ember hover:text-bone mt-6 inline-block text-sm underline underline-offset-4"
        >
          Browse selected work →
        </Link>
      </div>
    );
  }

  const mailtoHref = state.fields
    ? buildMailto(siteConfig.email, state.fields)
    : `mailto:${siteConfig.email}`;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from real visitors, tempting for bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {(state.status === "no-endpoint" || state.status === "error") && (
        <div
          role="alert"
          className="border-ember/50 bg-ink-2 mb-8 rounded-md border p-6"
        >
          {state.status === "no-endpoint" ? (
            <>
              <p className="text-bone font-medium">
                Direct sending is not set up yet.
              </p>
              <p className="text-stone mt-2 text-sm leading-relaxed">
                Your message was <strong>not</strong> sent automatically — but
                everything you wrote is ready to go by email instead.
              </p>
            </>
          ) : (
            <>
              <p className="text-bone font-medium">
                Something went wrong while sending.
              </p>
              <p className="text-stone mt-2 text-sm leading-relaxed">
                Your message was not delivered. Please try again, or send it
                directly by email — your text is preserved below.
              </p>
            </>
          )}
          <a
            href={mailtoHref}
            className="bg-ember text-ink mt-4 inline-block rounded-sm px-5 py-2.5 text-sm font-semibold"
          >
            Open pre-filled email
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.fields?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.fields?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="company" className={labelClass}>
            Company or organisation
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={state.fields?.company}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue={state.fields?.projectType ?? ""}
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={inputClass}
          >
            <option value="" disabled>
              Choose a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError id="projectType-error" message={errors.projectType} />
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Desired timeline *
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue={state.fields?.timeline ?? ""}
            aria-invalid={errors.timeline ? true : undefined}
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
            className={inputClass}
          >
            <option value="" disabled>
              Choose a timeline
            </option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
          <FieldError id="timeline-error" message={errors.timeline} />
        </div>

        <div>
          <label htmlFor="referral" className={labelClass}>
            How did you find us?
          </label>
          <input
            id="referral"
            name="referral"
            type="text"
            placeholder="Referral, search, social…"
            defaultValue={state.fields?.referral}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClass}>
            Tell us about the project *
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            placeholder="What are we making, for whom, and what should it achieve?"
            defaultValue={state.fields?.description}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? "description-error" : undefined}
            className={inputClass}
          />
          <FieldError id="description-error" message={errors.description} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              defaultChecked={state.fields?.privacy === "on"}
              aria-invalid={errors.privacy ? true : undefined}
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
              className="accent-ember mt-1 h-5 w-5 shrink-0"
            />
            <label htmlFor="privacy" className="text-stone text-sm leading-relaxed">
              I&rsquo;m okay with Authentic Perspective storing this message to
              respond to my inquiry. See the{" "}
              <Link href="/privacy" className="text-ember underline underline-offset-4">
                privacy note
              </Link>
              . *
            </label>
          </div>
          <FieldError id="privacy-error" message={errors.privacy} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className={cx(
            "bg-ember text-ink min-h-12 rounded-sm px-8 py-3 text-base font-semibold transition-colors",
            pending ? "cursor-wait opacity-60" : "hover:bg-bone",
          )}
        >
          {pending ? "Sending…" : "Send inquiry"}
        </button>
        <p className="text-stone text-sm">
          Prefer email or WhatsApp?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ember hover:text-bone underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          {" · "}
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember hover:text-bone underline underline-offset-4"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}
