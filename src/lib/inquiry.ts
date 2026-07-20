/**
 * Inquiry-form model and validation, shared by the client form and the
 * server action so both always agree.
 */

export const projectTypes = [
  "Film or video",
  "Photography",
  "AI creative",
  "UX or interactive",
  "Multidisciplinary project",
  "Something else",
] as const;

export const timelines = [
  "As soon as possible",
  "Within 1–2 months",
  "Within 3–6 months",
  "Flexible / exploring",
] as const;

export interface InquiryFields {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  description: string;
  referral: string;
  privacy: string;
  /** Honeypot — must stay empty. Bots that fill it are silently dropped. */
  website: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(fields: InquiryFields): InquiryErrors {
  const errors: InquiryErrors = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }
  if (!emailPattern.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address so we can reply.";
  }
  if (!projectTypes.includes(fields.projectType as (typeof projectTypes)[number])) {
    errors.projectType = "Please choose the option that fits best.";
  }
  if (!timelines.includes(fields.timeline as (typeof timelines)[number])) {
    errors.timeline = "Please pick a rough timeline.";
  }
  if (fields.description.trim().length < 20) {
    errors.description =
      "A few sentences about the project help us prepare a useful reply (at least 20 characters).";
  }
  if (fields.privacy !== "on") {
    errors.privacy = "Please confirm you are okay with us storing your message.";
  }

  return errors;
}

export function fieldsFromFormData(formData: FormData): InquiryFields {
  const get = (key: string) => String(formData.get(key) ?? "");
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    projectType: get("projectType"),
    timeline: get("timeline"),
    description: get("description"),
    referral: get("referral"),
    privacy: get("privacy"),
    website: get("website"),
  };
}

/** Build a pre-filled mailto link as the no-backend fallback. */
export function buildMailto(email: string, fields: InquiryFields): string {
  const subject = `Project inquiry — ${fields.projectType || "New project"}`;
  const body = [
    `Name: ${fields.name}`,
    fields.company && `Company: ${fields.company}`,
    `Project type: ${fields.projectType}`,
    `Timeline: ${fields.timeline}`,
    fields.referral && `Found us via: ${fields.referral}`,
    "",
    fields.description,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
