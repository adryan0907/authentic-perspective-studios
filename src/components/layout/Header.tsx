"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { cx } from "@/lib/utils";
import { KineticLabel } from "@/components/ui/KineticLabel";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed global navigation. Transparent over the hero, then gains a dark
 * scrim once the page scrolls so it stays legible over any media beneath it.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes (state adjusted during render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 transition-colors duration-500",
          menuOpen ? "z-[130]" : "z-[100]",
          scrolled || menuOpen
            ? "bg-ink/85 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="px-gutter flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            href="/"
            className="relative z-[1] shrink-0"
            aria-label="Authentic Perspective — home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- keep alpha intact; next/image was flattening transparent pixels to black */}
            <img
              src="/media/brand/logo.png"
              alt="Authentic Perspective"
              width={168}
              height={52}
              className="h-8 w-auto md:h-9"
              decoding="async"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "text-meta font-mono tracking-widest uppercase transition-colors",
                    active ? "text-ember" : "text-bone/80 hover:text-bone",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              data-cursor="Connect"
              className="border-bone/30 text-bone hover:border-ember hover:bg-ember hover:text-ink inline-flex h-9 w-[9.75rem] items-center overflow-hidden rounded-sm border px-3 text-sm font-medium transition-colors"
            >
              <KineticLabel>Start a project</KineticLabel>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="text-bone relative z-[1] -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={cx(
                  "bg-bone absolute left-0 block h-0.5 w-6 origin-center transition-transform duration-300",
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cx(
                  "bg-bone absolute left-0 block h-0.5 w-6 origin-center transition-transform duration-300",
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
