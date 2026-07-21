/**
 * Global site configuration — the one place to update contact details,
 * social links, navigation and the inquiry-form endpoint.
 */

export const siteConfig = {
  name: "Authentic Perspective",
  /** Primary public host — must match the live redirect target (www). */
  domain: "https://www.authenticperspectivestudios.com",
  /** Extra names people (and Google) search for. */
  alternateNames: [
    "Authentic Perspective Studios",
    "Authentic Perspective Studio",
    "AP Studios",
  ] as const,
  tagline: "Defining moments. Crafted with intention.",
  description:
    "Authentic Perspective Studios is an Eindhoven-based creative production studio making cinematic films, photography, AI-assisted concepts, and interactive digital experiences.",
  location: {
    city: "Eindhoven",
    country: "Netherlands",
    countryCode: "NL",
  },

  /**
   * Replace with the studio's real inbox. Used for the mailto fallback and
   * shown in the footer, contact page and mobile menu.
   */
  email: "adryan@authenticperspectivestudios.com",

  /**
   * WhatsApp direct message. `href` is the wa.me deep link (digits only).
   * `display` is the human-readable number shown in the UI.
   */
  whatsapp: {
    display: "+966 55 405 6802",
    href: "https://wa.me/966554056802",
  },

  /**
   * Social profiles. Set a value to null to hide the link.
   * Replace the placeholder handles with the real profile URLs.
   */
  socials: {
    instagram: "https://www.instagram.com/ap.action",
    linkedin: "https://www.linkedin.com/company/authentic-perspective",
    vimeo: null as string | null,
    youtube: null as string | null,
  },

  /**
   * Inquiry-form endpoint.
   *
   * The contact form posts to this URL when set (e.g. a Formspree endpoint:
   * "https://formspree.io/f/XXXXXXXX"). While it is null, the form validates
   * input and then offers an honest mailto handoff instead of pretending the
   * message was delivered. See README.md → "Connecting the inquiry form".
   */
  formEndpoint: null as string | null,

  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SocialKey = keyof typeof siteConfig.socials;
