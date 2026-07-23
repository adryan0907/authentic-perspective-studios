"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/data/site";
import { duration, easing } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Persistent WhatsApp shortcut — fixed in the corner so visitors can message
 * while scrolling, the same always-on contact pattern as modern agency sites.
 */
export function WhatsAppFab() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.a
      href={siteConfig.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="WhatsApp"
      aria-label={`Message Authentic Perspective on WhatsApp (${siteConfig.whatsapp.display})`}
      initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: duration.base,
        ease: easing.out,
        delay: 0.8,
      }}
      className="bg-ember text-ink hover:bg-bone focus-visible:bg-bone fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[110] flex h-14 w-14 items-center justify-center rounded-sm shadow-none transition-colors duration-300 md:right-[max(1.5rem,env(safe-area-inset-right))] md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:h-14 md:w-14"
    >
      <WhatsAppIcon className="h-7 w-7" />
      {!reducedMotion && (
        <span
          aria-hidden
          className="bg-ember absolute inset-0 -z-10 animate-ping rounded-sm opacity-20"
        />
      )}
    </motion.a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.7 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74 2.49 1.08 2.49.72 2.94.67.45-.05 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.17-.47-.29z" />
    </svg>
  );
}
