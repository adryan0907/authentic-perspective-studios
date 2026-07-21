import type { Metadata } from "next";
import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Authentic Perspective works at the intersection of storytelling, visual production, design, and technology — a creative production studio based in Eindhoven.",
  alternates: { canonical: "/about" },
};

const capabilities = [
  {
    title: "Film",
    items: [
      "Brand films",
      "Documentary storytelling",
      "Automotive productions",
      "Events & aftermovies",
      "Interviews & multicamera",
    ],
  },
  {
    title: "Photography",
    items: [
      "Corporate portraits",
      "Campaign photography",
      "Lifestyle imagery",
      "Event photography",
      "Digital platform assets",
    ],
  },
  {
    title: "AI Creative",
    items: [
      "Concept development",
      "Campaign previsualisation",
      "Generative imagery",
      "Creative experimentation",
      "Production planning",
    ],
  },
  {
    title: "UX & Interactive",
    items: [
      "Digital concepts",
      "Websites",
      "User experiences",
      "Prototypes",
      "Interactive storytelling",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-44">
      {/* Philosophy */}
      <section aria-labelledby="about-heading" className="px-gutter pb-section">
        <TextReveal
          as="h1"
          lines={["Different disciplines.", "One studio."]}
          className="text-display font-sans font-black tracking-tight uppercase"
        />
        <FadeIn delay={0.3} className="mt-12 md:ml-[35%]">
          <p className="text-lead text-stone measure">
            Authentic Perspective works at the intersection of storytelling,
            visual production, design, and technology. This allows us to
            approach projects as more than isolated deliverables. We consider
            the message, audience, experience, and environment in which the
            work will live.
          </p>
        </FadeIn>
      </section>

      {/* Founder */}
      <section
        aria-labelledby="founder-heading"
        className="px-gutter py-section border-line border-t"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <FadeIn className="md:col-span-5">
            <EditorialImage
              src="/media/brand/founder-portrait.jpg"
              alt="Adryan Sedyaporna, founder of Authentic Perspective"
              label="Adryan Sedyaporna"
              subLabel="Founder · Filmmaker & digital creative"
              aspect="4/5"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
          </FadeIn>
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn>
              <h2
                id="founder-heading"
                className="text-h2 font-serif font-light tracking-tight"
              >
                The founder
              </h2>
              <p className="text-stone mt-6 leading-relaxed">
                Authentic Perspective was founded by filmmaker and digital
                creative Adryan Sedyaporna. With a background spanning visual
                production, media design, and interactive technology, the
                studio approaches every project through both a creative and
                strategic lens.
              </p>
              <p className="text-stone mt-4 leading-relaxed">
                That multidisciplinary background shapes how we work: a film is
                planned with its final platform in mind, a photography series
                is built as a system rather than a set of one-offs, and digital
                concepts are designed with the story they need to tell.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section
        aria-labelledby="collaboration-heading"
        className="px-gutter py-section border-line border-t"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            <h2
              id="collaboration-heading"
              className="text-h2 font-serif font-light tracking-tight"
            >
              How we collaborate
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-7 md:col-start-6">
            <p className="text-stone leading-relaxed">
              Every project starts with a conversation, not a quote. We want to
              understand what the work needs to achieve and who it needs to
              reach before we talk about cameras or deliverables. From there we
              keep the process transparent: a clear concept, a realistic
              production plan, and honest communication when something can be
              done better another way.
            </p>
            <p className="text-stone mt-4 leading-relaxed">
              We work directly with brands and organisations, and just as
              comfortably alongside agencies and internal creative teams who
              need a production partner that thinks along.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Capabilities */}
      <section
        aria-labelledby="capabilities-heading"
        className="px-gutter py-section border-line border-t"
      >
        <FadeIn>
          <h2
            id="capabilities-heading"
            className="text-h2 mb-12 font-sans font-bold tracking-tight"
          >
            Capabilities
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group, index) => (
            <FadeIn key={group.title} delay={index * 0.08}>
              <h3 className="text-meta text-ember mb-4 font-mono tracking-[0.25em] uppercase">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-bone/85 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Eindhoven */}
      <section
        aria-labelledby="location-heading"
        className="px-gutter py-section border-line border-t"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <FadeIn>
              <h2
                id="location-heading"
                className="text-h2 font-serif font-light tracking-tight"
              >
                Made in Eindhoven
              </h2>
              <p className="text-stone mt-6 leading-relaxed">
                The studio is based in Eindhoven — a city built on design and
                technology, which suits us well. We work across the Netherlands
                and beyond; recent productions have taken us from Brabant
                farmhouses to rally roads in Spain and Portugal.
              </p>
              <p className="text-stone mt-4 text-sm">
                {siteConfig.location.city}, {siteConfig.location.country} ·{" "}
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
            </FadeIn>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7">
            <FadeIn>
              <EditorialImage
                src="/media/brand/bts-multicamera-monitor.jpg"
                alt="Monitoring an overview camera during a multicamera production with Max, known as lutsoflove on Instagram"
                label="Multicamera production"
                subLabel="With Max (@lutsoflove)"
                aspect="4/5"
                sizes="(min-width: 768px) 21vw, 50vw"
              />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-8">
              <EditorialImage
                src="/media/brand/bts-harmony-of-hardcore.jpg"
                alt="Filmatik Productions camera crew at Harmony of Hardcore, with Adryan working as a camera operator"
                label="Harmony of Hardcore"
                subLabel="Camera op · Filmatik Productions"
                aspect="4/5"
                sizes="(min-width: 768px) 21vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Behind the scenes gallery */}
      <section
        aria-labelledby="bts-heading"
        className="px-gutter py-section border-line border-t"
      >
        <FadeIn className="mb-12 md:mb-16 md:max-w-xl">
          <h2
            id="bts-heading"
            className="text-h2 font-serif font-light tracking-tight"
          >
            Behind the scenes
          </h2>
          <p className="text-stone mt-5 leading-relaxed">
            The work between takes — briefings, camera checks, load-in days, and
            the quiet moments that shape the final frame.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          <FadeIn className="md:col-span-12">
            <EditorialImage
              src="/media/brand/bts-tracking-shot.webp"
              alt="Adryan leaning from a moving car to film a low tracking shot with a camera gimbal"
              label="Adryan Sedyaporna"
              subLabel="Low tracking shot · on the move"
              aspect="3/2"
              sizes="100vw"
              priority
            />
          </FadeIn>

          <FadeIn delay={0.05} className="md:col-span-12">
            <EditorialImage
              src="/media/brand/bts-event-floor.webp"
              alt="Camera operator reviewing settings on an arena floor during event production load-in"
              label="Event production"
              subLabel="Arena floor · load-in day"
              aspect="3/2"
              sizes="100vw"
            />
          </FadeIn>

          <FadeIn delay={0.05} className="md:col-span-4">
            <EditorialImage
              src="/media/brand/bts-trade-show.webp"
              alt="First-person view of a camera rig filming a busy trade show hall"
              label="On location"
              subLabel="Trade show coverage"
              aspect="4/5"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-4 md:mt-10">
            <EditorialImage
              src="/media/brand/bts-studio-set.webp"
              alt="Dual-camera studio setup filming a subject seated among vinyl records with magenta accent lighting"
              label="Studio production"
              subLabel="Dual camera · set build"
              aspect="4/5"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-4">
            <EditorialImage
              src="/media/brand/bts-creative-brief.webp"
              alt="Creative team gathered around a planning table with cameras and studio lights in an industrial space"
              label="Creative briefing"
              subLabel="Planning the next shoot"
              aspect="4/5"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </FadeIn>

          <FadeIn delay={0.08} className="md:col-span-5 md:col-start-2">
            <EditorialImage
              src="/media/brand/bts-production-review.webp"
              alt="Adryan reviewing footage on a tablet while holding a professional camera during a studio production"
              label="Production review"
              subLabel="Checking the take · on set"
              aspect="4/5"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </FadeIn>

          <FadeIn
            delay={0.14}
            className="flex items-end md:col-span-5 md:col-start-8"
          >
            <p className="text-stone/70 font-serif max-w-sm text-lg leading-relaxed italic md:pb-8">
              Every production leaves a trail — equipment, conversations, and
              the perspective that only shows up when you are already in the
              room.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section
        aria-label="Contact"
        className="px-gutter border-line border-t py-24 text-center md:py-32"
      >
        <FadeIn>
          <p className="text-h2 font-serif mx-auto max-w-2xl font-light italic">
            Curious what our perspective would do for your story?
          </p>
          <div className="mt-8">
            <MagneticButton href="/contact">Start a project</MagneticButton>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
