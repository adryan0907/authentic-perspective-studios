"use server";

import { siteConfig } from "@/data/site";
import {
  fieldsFromFormData,
  validateInquiry,
  type InquiryErrors,
  type InquiryFields,
} from "@/lib/inquiry";

export interface InquiryState {
  status: "idle" | "sent" | "invalid" | "no-endpoint" | "error";
  errors: InquiryErrors;
  /** Echo of the submitted fields, used for the mailto fallback. */
  fields?: InquiryFields;
}

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const fields = fieldsFromFormData(formData);

  // Honeypot: pretend success so bots learn nothing.
  if (fields.website.trim() !== "") {
    return { status: "sent", errors: {} };
  }

  const errors = validateInquiry(fields);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, fields };
  }

  // Without a configured endpoint we never claim the message was sent.
  // The form then offers a pre-filled email instead.
  if (!siteConfig.formEndpoint) {
    return { status: "no-endpoint", errors: {}, fields };
  }

  try {
    const response = await fetch(siteConfig.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        company: fields.company,
        projectType: fields.projectType,
        timeline: fields.timeline,
        description: fields.description,
        referral: fields.referral,
      }),
    });
    if (!response.ok) {
      return { status: "error", errors: {}, fields };
    }
    return { status: "sent", errors: {} };
  } catch {
    return { status: "error", errors: {}, fields };
  }
}
