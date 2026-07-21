"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/data/site";
import { duration, easing, stagger } from "@/lib/motion";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const menuLinks = [{ label: "Home", href: "/" }, ...siteConfig.nav];

/**
 * Full-screen mobile menu with focus trapping, Escape support and body
 * scroll locking while open.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Scroll lock + focus management.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reducedMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: duration.base, ease: easing.inOut }}
          className="bg-ink fixed inset-0 z-[120] flex flex-col overflow-y-auto pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <nav aria-label="Mobile" className="px-gutter flex flex-col gap-1">
            {menuLinks.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: duration.base,
                    ease: easing.out,
                    delay: 0.15 + index * stagger.base,
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "font-serif flex items-baseline gap-4 py-3 text-5xl tracking-tight",
                      active ? "text-ember" : "text-bone",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden className="bg-ember block h-2 w-2 rounded-full" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.base, delay: 0.45 }}
            className="px-gutter border-line mt-auto flex flex-col gap-6 border-t pt-8"
          >
            <Link
              href="/contact"
              className="bg-ember text-ink rounded-sm px-5 py-4 text-center text-base font-semibold"
            >
              Start a project
            </Link>

            <div className="flex flex-col gap-2">
              <span className="text-meta text-stone font-mono tracking-widest uppercase">
                Contact
              </span>
              <a href={`mailto:${siteConfig.email}`} className="text-bone text-sm">
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-bone/30 text-bone hover:border-ember hover:bg-ember hover:text-ink inline-flex w-fit items-center rounded-sm border px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Message on WhatsApp
              </a>
              <span className="text-stone text-sm">
                {siteConfig.location.city}, {siteConfig.location.country}
              </span>
            </div>

            <ul className="flex gap-6" aria-label="Social links">
              {Object.entries(siteConfig.socials)
                .filter(([, url]) => url)
                .map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-meta text-stone hover:text-bone font-mono tracking-widest uppercase"
                    >
                      {key}
                    </a>
                  </li>
                ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
