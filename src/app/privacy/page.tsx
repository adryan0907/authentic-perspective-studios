import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Authentic Perspective handles the information you share through the contact form.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="px-gutter pt-32 pb-24 md:pt-44">
      <div className="mx-auto max-w-2xl">
        <p className="text-meta text-stone mb-6 font-mono tracking-[0.25em] uppercase">
          Privacy
        </p>
        <h1 className="text-h1 font-sans font-black tracking-tight uppercase">
          Privacy note
        </h1>

        <div className="text-stone mt-10 flex flex-col gap-6 leading-relaxed">
          <p>
            This website is intentionally light on data. We do not run
            advertising trackers, and we do not sell or share your information.
          </p>
          <p>
            <strong className="text-bone">Contact form.</strong> When you send
            an inquiry, we receive the details you fill in (name, email, and
            your message) and use them solely to respond to you. We keep
            correspondence for as long as a project conversation is active.
          </p>
          <p>
            <strong className="text-bone">Analytics.</strong> If analytics are
            enabled, we use a privacy-conscious, cookie-free setup that does
            not identify individual visitors.
          </p>
          <p>
            <strong className="text-bone">Questions or removal requests.</strong>{" "}
            Email us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ember underline underline-offset-4"
            >
              {siteConfig.email}
            </a>{" "}
            and we will handle it promptly.
          </p>
        </div>

        <Link
          href="/contact"
          className="text-ember hover:text-bone mt-12 inline-block text-sm underline underline-offset-4"
        >
          ← Back to contact
        </Link>
      </div>
    </div>
  );
}
