"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query without effect-driven state.
 * Returns false during SSR/hydration, then the live value.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Hydration-safe reduced-motion preference. Unlike motion's built-in hook,
 * this returns false during SSR and the hydration render, then updates —
 * so server and client markup always match.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

const noopSubscribe = () => () => {};

/** True when the visitor asked their browser to save data. */
export function useSaveData(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true,
    () => false,
  );
}
