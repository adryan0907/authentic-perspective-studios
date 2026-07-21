import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="px-gutter py-14 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- keep alpha intact; next/image was flattening transparent pixels to black */}
            <img
              src="/media/brand/logo.png"
              alt="Authentic Perspective"
              width={200}
              height={61}
              className="h-10 w-auto max-w-[200px] self-start object-contain"
              decoding="async"
            />
            <p className="text-stone text-sm leading-relaxed">
              A creative production studio crafting cinematic films, intentional
              photography, AI-powered concepts, and interactive digital
              experiences.
            </p>
            <p className="text-stone text-sm">
              {siteConfig.location.city}, {siteConfig.location.country}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <span className="text-meta text-stone font-mono tracking-widest uppercase">
                Navigate
              </span>
              {[{ label: "Home", href: "/" }, ...siteConfig.nav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-bone/80 hover:text-bone text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="text-meta text-stone font-mono tracking-widest uppercase">
                Social
              </span>
              {Object.entries(siteConfig.socials)
                .filter(([, url]) => url)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone/80 hover:text-bone text-sm capitalize transition-colors"
                  >
                    {key}
                  </a>
                ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-meta text-stone font-mono tracking-widest uppercase">
                Contact
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-bone/80 hover:text-bone text-sm break-all transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/80 hover:text-bone text-sm transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="text-ember hover:text-bone text-sm transition-colors"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>

        <div className="border-line text-stone mt-14 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Authentic Perspective. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-bone transition-colors">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <p>Defining moments. Crafted with intention.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
