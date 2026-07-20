/**
 * Global site configuration — the one place to update contact details,
 * social links, navigation and the inquiry-form endpoint.
 */

export const siteConfig = {
  name: "Authentic Perspective",
  domain: "https://authenticperspectivestudios.com",
  tagline: "Defining moments. Crafted with intention.",
  description:
    "Authentic Perspective is an Eindhoven-based creative studio producing cinematic films, photography, AI-assisted concepts, and interactive digital experiences.",
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
   * Social profiles. Set a value to null to hide the link.
   * Replace the placeholder handles with the real profile URLs.
   */
  socials: {
    instagram: "https://www.instagram.com/authenticperspective",
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
