/**
 * Content model for Authentic Perspective.
 *
 * Everything rendered on the site is typed here. The actual content lives in
 * `src/data/projects.ts` and `src/data/site.ts`.
 */

/** Aspect ratios supported by media containers (width / height). */
export type AspectRatio =
  | "16/9"
  | "21/9"
  | "4/3"
  | "3/2"
  | "4/5"
  | "2/3"
  | "1/1"
  | "9/16";

interface MediaBase {
  /** Meaningful description for screen readers. Required for all media. */
  alt: string;
  /** Aspect ratio of the media container. Defaults to 16/9 when omitted. */
  aspect?: AspectRatio;
  /** Optional caption shown below the media in galleries. */
  caption?: string;
  /**
   * Set to true while the real asset does not exist yet. The site then renders
   * an elegant labelled placeholder that shows exactly which file to add.
   * Flip to false (or remove) once the file is in place under /public.
   */
  placeholder?: boolean;
}

/** A local image, served from /public (e.g. "/media/projects/slug/cover.webp"). */
export interface ImageMedia extends MediaBase {
  type: "image";
  src: string;
}

/** A local MP4/WebM video, served from /public. */
export interface VideoMedia extends MediaBase {
  type: "video";
  src: string;
  /** Optional lighter file served to small screens. */
  mobileSrc?: string;
  /** Poster image shown before the video loads. Strongly recommended. */
  poster?: string;
  /** Optional WebVTT captions file (e.g. "/media/projects/slug/captions.vtt"). */
  captions?: string;
}

/** A Vimeo film. Paste the normal video URL, e.g. "https://vimeo.com/123456789". */
export interface VimeoMedia extends MediaBase {
  type: "vimeo";
  url: string;
  poster?: string;
}

/** A YouTube film. Paste the normal watch URL or youtu.be link. */
export interface YouTubeMedia extends MediaBase {
  type: "youtube";
  url: string;
  poster?: string;
}

/** An Instagram post or reel. Paste the public permalink. */
export interface InstagramMedia extends MediaBase {
  type: "instagram";
  url: string;
}

export type MediaItem =
  | ImageMedia
  | VideoMedia
  | VimeoMedia
  | YouTubeMedia
  | InstagramMedia;

/** One measurable or descriptive impact line — House of Yellow style proof. */
export interface ProjectImpact {
  label: string;
  value: string;
}

/** One line in the credits block of a case study. */
export interface Credit {
  role: string;
  name: string;
}

/** The four disciplines of the studio. Drives case-study layout. */
export type Discipline = "film" | "photography" | "ai" | "ux";

/** Filterable categories used on the /work archive. */
export type Category =
  | "automotive"
  | "documentary"
  | "events"
  | "multicamera"
  | "brand-content";

/**
 * "commission" = completed client work.
 * "concept"    = self-initiated or experimental concept. Concepts are labelled
 *                clearly across the site so visitors never mistake them for
 *                delivered client work.
 */
export type ProjectStatus = "commission" | "concept";

/** Extra structured content for UX case studies. */
export interface UxDetails {
  problem: string;
  audience: string;
  insight: string;
  concept: string;
  userFlow: string[];
  learnings: string;
}

/** Extra structured content for AI case studies. */
export interface AiDetails {
  conceptExplanation: string;
  /** Short excerpts of the prompt/process, shown as process notes. */
  processExcerpts: string[];
  /** Before/after pair proving the transformation. */
  before: MediaItem;
  after: MediaItem;
}

export interface Project {
  /** URL segment: /work/[slug]. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  year: number;
  status: ProjectStatus;
  /** Featured projects appear on the homepage, in array order. */
  featured: boolean;
  /** Set true to hide a project everywhere without deleting its entry. */
  hidden?: boolean;
  /** Primary discipline. Chooses the case-study layout. */
  discipline: Discipline;
  /** Secondary filter categories. */
  categories: Category[];
  /** Human-readable label, e.g. "Automotive Film". */
  categoryLabel: string;
  services: string[];
  client?: string;
  location?: string;
  /** One line, used on cards and list rows. */
  description: string;
  /** Short paragraph opening the case study. */
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  cover: ImageMedia;
  /** Short muted clip that plays on hover/in-view on project cards. */
  previewVideo?: VideoMedia;
  /** Large media at the top of the case study. Falls back to cover. */
  heroMedia?: MediaItem;
  /** Main body media: film player, photo gallery, frames, screens... */
  gallery: MediaItem[];
  /** Behind-the-scenes media. */
  btsMedia?: MediaItem[];
  credits: Credit[];
  externalLink?: string;
  prototypeLink?: string;
  /**
   * Optional proof lines shown under cards and on the case study
   * (views, delivery time, format, etc.). Only include real figures.
   */
  impact?: ProjectImpact[];
  ux?: UxDetails;
  ai?: AiDetails;
  seoTitle?: string;
  seoDescription?: string;
  /**
   * Two-tone palette for this project's labelled media placeholders,
   * so each project keeps a distinct mood before real assets arrive.
   */
  placeholderPalette: [string, string];
}
