import { EditorialImage } from "@/components/media/EditorialImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function StudioIntro() {
  return (
    <section
      aria-labelledby="studio-heading"
      className="px-gutter py-section border-line border-t"
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        <FadeIn className="md:col-span-4 md:col-start-1">
          <EditorialImage
            src="/media/brand/bts-production-review.webp"
            alt="Adryan reviewing footage on a tablet while holding a professional camera during a studio production"
            label="Production review"
            subLabel="Checking the take · on set"
            aspect="4/5"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </FadeIn>

        <div className="md:col-span-6 md:col-start-6">
          <FadeIn>
            <h2
              id="studio-heading"
              className="text-h2 font-serif font-light tracking-tight"
            >
              Behind the lens
            </h2>
            <p className="text-lead text-stone mt-6 leading-relaxed">
              Authentic Perspective was founded by filmmaker and digital
              creative Adryan Sedyaporna. With a background spanning visual
              production, media design, and interactive technology, the studio
              approaches every project through both a creative and strategic
              lens.
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <MagneticButton href="/about" variant="outline">
              About the studio
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
