import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/sections/ContactForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Authentic Perspective — film, photography, AI-assisted creative and interactive experiences from Eindhoven.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="px-gutter pt-32 pb-24 md:pt-44">
      <header className="mb-16 md:mb-24">
        <p className="text-meta text-stone mb-6 font-mono tracking-[0.25em] uppercase">
          Contact
        </p>
        <TextReveal
          as="h1"
          lines={["Let’s create something", "worth remembering."]}
          className="text-h1 font-sans font-black tracking-tight uppercase"
        />
        <FadeIn delay={0.25}>
          <p className="text-lead text-stone measure-narrow mt-6">
            Tell us about the story, campaign, or experience you have in mind.
            The more context, the better our first reply.
          </p>
        </FadeIn>
      </header>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <FadeIn className="lg:col-span-7">
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <div className="border-line flex flex-col gap-8 border-t pt-8 lg:border-t-0 lg:pt-0">
            <div>
              <h2 className="text-meta text-stone mb-3 font-mono tracking-[0.25em] uppercase">
                Direct
              </h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-bone hover:text-ember text-lg break-all transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <h2 className="text-meta text-stone mb-3 font-mono tracking-[0.25em] uppercase">
                Studio
              </h2>
              <p className="text-bone/85 text-sm leading-relaxed">
                {siteConfig.location.city}, {siteConfig.location.country}
                <br />
                Working across the Netherlands and beyond.
              </p>
            </div>

            <div>
              <h2 className="text-meta text-stone mb-3 font-mono tracking-[0.25em] uppercase">
                Elsewhere
              </h2>
              <ul className="flex flex-col gap-2">
                {Object.entries(siteConfig.socials)
                  .filter(([, url]) => url)
                  .map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bone/85 hover:text-ember text-sm capitalize transition-colors"
                      >
                        {key} ↗
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2 className="text-meta text-stone mb-3 font-mono tracking-[0.25em] uppercase">
                Good to know
              </h2>
              <p className="text-stone text-sm leading-relaxed">
                We typically reply within two working days. For productions
                with fixed dates — events, launches, rallies — earlier contact
                means better availability.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
