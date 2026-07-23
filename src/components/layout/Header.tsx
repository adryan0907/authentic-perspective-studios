"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { siteConfig } from "@/data/site";
import { cx } from "@/lib/utils";
import { KineticLabel } from "@/components/ui/KineticLabel";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { MobileMenu } from "./MobileMenu";

/**
 * Cinematic slate navigation — brand-led, asymmetrical, and sharper than a
 * centered-logo agency bar. Transparent over the hero; floats as an inset
 * panel once the page scrolls.
 */
export function Header() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const elevated = scrolled || menuOpen;

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 transition-[padding] duration-500 ease-[var(--ease-out-soft)]",
          menuOpen ? "z-[130]" : "z-[100]",
          elevated ? "px-3 pt-3 md:px-5 md:pt-4" : "px-0 pt-0",
        )}
      >
        <div
          className={cx(
            "relative flex w-full max-w-full items-center justify-between gap-4 transition-all duration-500 ease-[var(--ease-out-soft)] md:gap-8",
            elevated
              ? "border-line bg-ink/90 h-14 rounded-sm border px-4 backdrop-blur-xl md:h-16 md:px-6"
              : "h-16 bg-transparent px-gutter md:h-20",
          )}
        >
          {/* Brand — primary signal, never centered-logo agency template */}
          <Link
            href="/"
            className="group relative z-[1] flex shrink-0 items-center gap-3"
            aria-label="Authentic Perspective — home"
            data-cursor="Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- keep alpha intact; next/image was flattening transparent pixels to black */}
            <img
              src="/media/brand/logo.png"
              alt="Authentic Perspective"
              width={168}
              height={52}
              className="h-7 w-auto max-w-[min(42vw,9.5rem)] transition-opacity duration-300 group-hover:opacity-90 sm:h-8 sm:max-w-none md:h-9"
              decoding="async"
            />
            <span
              aria-hidden
              className="bg-line hidden h-8 w-px md:block"
            />
            <span className="text-meta text-stone/80 hidden font-mono tracking-[0.18em] uppercase md:block">
              {siteConfig.location.city}
            </span>
          </Link>

          {/* Desktop nav — slate-indexed links with sliding active mark */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          >
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item, index) => {
                const active = pathname.startsWith(item.href);
                const n = String(index + 1).padStart(2, "0");
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      data-cursor={item.label}
                      className={cx(
                        "relative flex items-baseline gap-2 px-4 py-2 transition-colors duration-300",
                        active
                          ? "text-bone"
                          : "text-bone/55 hover:text-bone",
                      )}
                    >
                      <span
                        className={cx(
                          "font-mono text-[0.58rem] tracking-widest transition-colors",
                          active ? "text-ember" : "text-stone/50",
                        )}
                      >
                        {n}
                      </span>
                      <span className="text-meta font-mono tracking-[0.16em] uppercase">
                        {item.label}
                      </span>
                      {active && !reducedMotion && (
                        <motion.span
                          layoutId="nav-active"
                          className="bg-ember absolute inset-x-3 -bottom-0.5 h-px"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      {active && reducedMotion && (
                        <span className="bg-ember absolute inset-x-3 -bottom-0.5 h-px" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="relative z-[1] flex items-center gap-3">
            <Link
              href="/contact"
              data-cursor="Connect"
              className="bg-ember text-ink hover:bg-bone hidden h-10 w-[10.5rem] items-center justify-center overflow-hidden rounded-sm text-sm font-semibold transition-colors duration-300 md:inline-flex"
            >
              <KineticLabel>Start a project</KineticLabel>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="text-bone border-line hover:border-bone/40 relative flex h-10 items-center gap-2.5 rounded-sm border px-3 md:hidden"
            >
              <span className="text-meta font-mono tracking-[0.16em] uppercase">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span aria-hidden className="relative block h-2.5 w-4">
                <span
                  className={cx(
                    "bg-bone absolute left-0 block h-px w-4 origin-center transition-transform duration-300",
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cx(
                    "bg-bone absolute left-0 block h-px w-4 origin-center transition-all duration-300",
                    menuOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45"
                      : "bottom-0 w-2.5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
