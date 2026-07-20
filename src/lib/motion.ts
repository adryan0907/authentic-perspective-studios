/**
 * Shared motion tokens. Every animated component reads from these values so
 * the motion language of the site can be tuned in one place.
 */

export const easing = {
  /** Main brand ease — confident deceleration. */
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0.05, 0.36, 1] as const,
};

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
};

export const stagger = {
  tight: 0.05,
  base: 0.09,
  loose: 0.15,
};

/** Default translate distance (px) for entrance reveals. */
export const distance = {
  sm: 16,
  md: 32,
  lg: 64,
};

export const spring = {
  /** Used by the perspective lens and magnetic buttons. */
  soft: { stiffness: 120, damping: 20, mass: 0.6 },
  snappy: { stiffness: 300, damping: 30, mass: 0.5 },
};

/** Standard viewport config for whileInView reveals. */
export const inView = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;

/** Shared entrance variant used across sections. */
export const fadeRise = {
  hidden: { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.out },
  },
};
