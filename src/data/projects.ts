import type { Project } from "@/types/content";

/**
 * ============================================================================
 * PORTFOLIO CONTENT — the single source of truth for every project.
 * ============================================================================
 *
 * HOW TO ADD A PROJECT
 *   1. Copy an existing entry and give it a unique `slug`.
 *   2. Create a matching media folder: /public/media/projects/<slug>/
 *   3. Fill in the text fields. `description` is one line; `summary`,
 *      `challenge`, `approach` and `outcome` are short paragraphs.
 *   4. Pick a `discipline` ("film" | "photography" | "ai" | "ux") — this
 *      chooses the case-study layout — and the filter `categories`.
 *
 * HOW TO REORDER FEATURED PROJECTS
 *   Featured projects appear on the homepage in the order of this array.
 *   Set `featured: true/false` to include or exclude a project.
 *
 * HOW TO REPLACE A COVER IMAGE
 *   Export a 1600×2000 (4/5) or 1920×1080 (16/9) WebP, drop it at the path in
 *   `cover.src`, then remove `placeholder: true` from that media object.
 *
 * HOW TO ADD A LOCAL VIDEO
 *   { type: "video", src: "/media/projects/<slug>/film.mp4",
 *     poster: "/media/projects/<slug>/film-poster.webp",
 *     mobileSrc: "/media/projects/<slug>/film-mobile.mp4",   // optional
 *     alt: "What the film shows", aspect: "16/9" }
 *   Keep hover previews under ~3 MB (see README for export settings).
 *
 * HOW TO ADD A VIMEO OR YOUTUBE FILM
 *   { type: "vimeo",   url: "https://vimeo.com/123456789",  alt: "..." }
 *   { type: "youtube", url: "https://youtu.be/XXXXXXXXXXX", alt: "..." }
 *
 * HOW TO ADD AN INSTAGRAM REEL / POST
 *   { type: "instagram", url: "https://www.instagram.com/reel/XXXX/",
 *     alt: "What the reel shows", aspect: "9/16" }
 *
 * HOW TO ADD IMPACT METRICS (optional, House of Yellow style)
 *   impact: [
 *     { label: "Views", value: "1.2M" },
 *     { label: "Delivery", value: "2 wks production" },
 *   ]
 *   Only include numbers you can stand behind.
 *
 * HOW TO MARK A PROJECT AS A CONCEPT
 *   Set `status: "concept"`. The site labels it "Studio concept" everywhere
 *   so it is never mistaken for delivered client work.
 *
 * HOW TO ADD PHOTOGRAPHY
 *   Add image items to `gallery`. The photography layout renders them as an
 *   editorial gallery with an accessible lightbox.
 *
 * HOW TO ADD CREDITS
 *   credits: [{ role: "Direction", name: "Authentic Perspective" }, ...]
 *
 * HOW TO HIDE AN UNFINISHED PROJECT
 *   Set `hidden: true`. It disappears from every page and the sitemap without
 *   deleting the entry.
 * ============================================================================
 */

export const projects: Project[] = [
  {
    slug: "roxmeister-supermoto",
    title: "ROXMEISTER",
    year: 2025,
    status: "commission",
    featured: true,
    discipline: "film",
    categories: ["automotive", "events"],
    categoryLabel: "Supermoto Recap",
    services: ["Direction", "Cinematography", "Drone", "Edit & Grade"],
    client: "ROXMEISTER",
    location: "Netherlands",
    description:
      "A high-energy recap of a supermoto race weekend, shot trackside and from the air.",
    summary:
      "Supermoto lives on the edge between tarmac and dirt. This recap condenses a full race weekend into a film that moves the way the racing feels: low, fast and sideways.",
    challenge:
      "A street circuit gives you no second takes. Riders pass in a blur, the light shifts all day, and the best moments — a wheelie past the crowd, three bikes deep into one corner — last a fraction of a second. The film had to feel as quick as the racing without becoming a highlight dump.",
    approach:
      "We shot from the fences with long lenses for compression, went low at the apex for lean angle, and put a drone up to show how the course cuts through the industrial surroundings. Panned motion blur keeps the speed in every frame, and the edit cuts on the engine notes rather than over them.",
    outcome:
      "A recap film that carries the energy of the event to riders, sponsors and spectators — built to announce the next edition and cut down for social.",
    cover: {
      type: "image",
      src: "/media/projects/roxmeister/cover.webp",
      alt: "Supermoto rider panning through the trees at speed, red bike against green forest",
      aspect: "4/5",
    },
    previewVideo: undefined,
    heroMedia: {
      type: "image",
      src: "/media/projects/roxmeister/hero.webp",
      alt: "Pack of supermoto riders leaning hard through a street-circuit corner",
      aspect: "21/9",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/roxmeister/film.mp4",
        poster: "/media/projects/roxmeister/cover.webp",
        alt: "ROXMEISTER — supermoto recap film",
      },
      {
        type: "image",
        src: "/media/projects/roxmeister/frame-01.webp",
        alt: "Drone view of a pink supermoto cutting past industrial warehouses",
        aspect: "16/9",
      },
      {
        type: "image",
        src: "/media/projects/roxmeister/frame-02.webp",
        alt: "Black-and-white still of two riders in motion blur",
        aspect: "16/9",
      },
    ],
    credits: [
      { role: "Direction & Cinematography", name: "Authentic Perspective" },
      { role: "Edit & Colour", name: "Authentic Perspective" },
      { role: "Client", name: "ROXMEISTER" },
    ],
    seoDescription:
      "Supermoto recap film for ROXMEISTER — high-energy race weekend storytelling shot trackside and by drone, by Authentic Perspective, Eindhoven.",
    placeholderPalette: ["#3a1f0e", "#120c07"],
  },

  {
    slug: "woonboerderij-schijndel",
    title: "Woonboerderij Schijndel",
    year: 2025,
    status: "commission",
    featured: true,
    discipline: "film",
    categories: ["documentary", "brand-content"],
    categoryLabel: "Documentary / Brand Story",
    services: ["Concept", "Documentary Direction", "Interviews", "Edit & Grade"],
    client: "Woonboerderij Schijndel",
    location: "Schijndel, Netherlands",
    description:
      "A human-centred film introducing a unique living and care environment.",
    summary:
      "A converted farmhouse in Schijndel offers a form of living and care that is hard to explain in a brochure. This film lets residents, family and caregivers explain it themselves.",
    challenge:
      "Care communication easily becomes either clinical or sentimental. The film needed to earn trust with honesty — real routines, real voices — while still feeling warm enough to reassure families making a difficult decision.",
    approach:
      "We spent time on location before bringing a camera, so filming days felt familiar rather than staged. Observational scenes of daily life are paired with quiet, seated interviews, graded warm and natural to match the building itself.",
    outcome:
      "A brand story used on the website and in family conversations, replacing abstract descriptions of care with faces, routines and a genuine sense of place.",
    cover: {
      type: "image",
      src: "/media/projects/woonboerderij/cover.webp",
      alt: "Resident of Woonboerderij Schijndel interviewed outdoors on the farmhouse grounds",
      aspect: "4/5",
    },
    previewVideo: undefined,
    heroMedia: {
      type: "image",
      src: "/media/projects/woonboerderij/hero.webp",
      alt: "Aerial view of the Woonboerderij farmhouse, gardens and pool",
      aspect: "21/9",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/woonboerderij/film.mp4",
        poster: "/media/projects/woonboerderij/film-poster.webp",
        alt: "Woonboerderij Schijndel — brand documentary",
      },
      {
        type: "image",
        src: "/media/projects/woonboerderij/frame-01.webp",
        alt: "Aerial view across the farmhouse roof, solar panels and garden",
        aspect: "16/9",
      },
      {
        type: "image",
        src: "/media/projects/woonboerderij/frame-02.webp",
        alt: "Garden, pool and swing set under the trees at Woonboerderij Schijndel",
        aspect: "3/2",
      },
    ],
    btsMedia: [
      {
        type: "image",
        src: "/media/projects/woonboerderij/bts-01.webp",
        alt: "Interview setup in the farmhouse living room",
        aspect: "3/2",
        placeholder: true,
      },
    ],
    credits: [
      { role: "Direction & Interviews", name: "Authentic Perspective" },
      { role: "Camera & Edit", name: "Authentic Perspective" },
      { role: "Client", name: "Woonboerderij Schijndel" },
    ],
    seoDescription:
      "Documentary brand story for Woonboerderij Schijndel — a human-centred film about a unique living and care environment, by Authentic Perspective.",
    placeholderPalette: ["#2e2415", "#100d08"],
  },

  {
    slug: "cadushi-residents",
    title: "Cadushi Residents",
    year: 2025,
    status: "commission",
    featured: true,
    discipline: "film",
    categories: ["events", "brand-content", "documentary"],
    categoryLabel: "Social / Interviews",
    services: [
      "Series Concept",
      "Creative Interviews",
      "Social Direction",
      "Edit & Grade",
    ],
    client: "Cadushi Music",
    location: "Eindhoven, Netherlands",
    description:
      "A resident DJ interview series for Eindhoven techno collective Cadushi — starting with the ROBOITH pilot reel.",
    summary:
      "Cadushi Music wanted to bring their community closer to the people behind the decks. We built a social-first interview series with the in-house residents who shape the collective’s sound — no stage lights, no crowd noise, just conversations about music, process and belonging.",
    challenge:
      "Techno collectives are often only visible on peak-night energy. Cadushi needed content that still felt like Cadushi — raw, personal, and culturally sharp — while working as Instagram Reels that introduce residents to both longtime dancers and new listeners.",
    approach:
      "We designed a quiet interview format for the residents who define the night: seated conversations, intimate framing, and edits cut for social delivery. The pilot episode features ROBOITH and sets the tone for the wider resident series.",
    outcome:
      "The ROBOITH pilot launched on Cadushi’s Instagram as episode one of the resident series, credited Authentic Perspective on the post, and sparked strong community response in-thread — positioning the collective’s residents as people, not only line-up names.",
    impact: [
      { label: "Format", value: "Resident series" },
      { label: "Pilot", value: "ROBOITH" },
      { label: "Platform", value: "Instagram Reels" },
      { label: "Delivery", value: "Social-first edit" },
    ],
    cover: {
      type: "image",
      src: "/media/projects/cadushi-residents/cover.webp",
      alt: "Cadushi Music resident interview — ROBOITH pilot still",
      // Homepage WorkCard sits in a wide column — 9/16 blows past the viewport.
      aspect: "4/5",
    },
    previewVideo: {
      type: "video",
      src: "/media/projects/cadushi-residents/film.mp4",
      poster: "/media/projects/cadushi-residents/film-poster.webp",
      alt: "Cadushi Residents — ROBOITH pilot preview",
      aspect: "4/5",
    },
    heroMedia: {
      type: "image",
      src: "/media/projects/cadushi-residents/hero.webp",
      alt: "Cadushi Music resident interview series — quiet conversation framing",
      aspect: "9/16",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/cadushi-residents/film.mp4",
        poster: "/media/projects/cadushi-residents/film-poster.webp",
        alt: "Cadushi Music — PILOT: ROBOITH resident interview",
        aspect: "9/16",
      },
    ],
    credits: [
      { role: "Concept & Interviews", name: "Authentic Perspective" },
      { role: "Camera & Edit", name: "Authentic Perspective" },
      { role: "Client", name: "Cadushi Music" },
      { role: "Pilot resident", name: "ROBOITH" },
    ],
    externalLink: "https://www.instagram.com/reel/DPldboiiH2e/",
    seoDescription:
      "Cadushi Music resident DJ interview series — social content and creative interviews for Eindhoven’s techno collective, by Authentic Perspective.",
    placeholderPalette: ["#1a1420", "#08060c"],
  },

  {
    slug: "digital-screen-pwmi",
    title: "Digital Screen PWMI",
    year: 2025,
    status: "concept",
    featured: true,
    discipline: "ux",
    categories: ["brand-content"],
    categoryLabel: "UX / Immersive Public Media",
    services: [
      "UX Research",
      "Interaction Design",
      "Concept Development",
      "Prototyping",
      "Public Installation Concept",
    ],
    client: "PWMI / T+Huis",
    location: "Woensel-Zuid, Eindhoven",
    description:
      "An interactive neighbourhood screen that makes PWMI and T+Huis visible without relying on dense Dutch text.",
    summary:
      "A Fontys ICT InnovationLab Media Design project for PWMI and the T+Huis: how interactive, visual communication can help residents of Woensel-Zuid — especially people with a migration background and limited Dutch — discover local projects, events and community support.",
    challenge:
      "PWMI and T+Huis offer real opportunities in the neighbourhood, but information often stays behind language barriers, posters and websites. Residents who pass through public spaces every day rarely connect with what is available to them.",
    approach:
      "We researched personas and journeys with the partner organisations, then designed a gesture-first digital screen for high-traffic public spaces. The first moment is playful — “Spot yourself?” with a live camera and hand-wave prompt — before opening a visual content grid of local projects, events and resident stories, with language options built into the chrome.",
    outcome:
      "An interactive concept tested with classmates, PWMI and passers-by in a real setting (TRL 5–6). Featured in Fontys Innovations Insight June ’25 — Immersive Technologies / Media Design — and ready to grow into a working neighbourhood installation.",
    cover: {
      type: "image",
      src: "/media/projects/digital-screen-pwmi/cover.webp",
      alt: "Mother and child facing a digital kiosk that asks Spot yourself? at a station platform",
      aspect: "4/5",
    },
    previewVideo: {
      type: "video",
      src: "/media/projects/digital-screen-pwmi/film.mp4",
      poster: "/media/projects/digital-screen-pwmi/cover.webp",
      alt: "Digital Screen PWMI concept film preview",
      aspect: "4/5",
    },
    heroMedia: {
      type: "image",
      src: "/media/projects/digital-screen-pwmi/hero.webp",
      alt: "Woman and child interacting with a purple content grid on a public digital screen as a train passes",
      aspect: "21/9",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/digital-screen-pwmi/film.mp4",
        poster: "/media/projects/digital-screen-pwmi/film-poster.webp",
        alt: "Digital Screen PWMI — concept film",
        caption: "Concept film — attracting attention, then inviting interaction",
        aspect: "16/9",
      },
      {
        type: "image",
        src: "/media/projects/digital-screen-pwmi/frame-01.webp",
        alt: "Child reaching toward the live Spot yourself? camera feed on the kiosk",
        caption: "Gesture-first invitation",
        aspect: "4/5",
      },
      {
        type: "image",
        src: "/media/projects/digital-screen-pwmi/screen-home.webp",
        alt: "Digital screen UI showing community story cards and language buttons",
        caption: "Visual content grid + language switch",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/digital-screen-pwmi/frame-03.webp",
        alt: "Wide view of the station kiosk showing the purple neighbourhood content interface",
        caption: "In situ — public & social services context",
        aspect: "16/9",
      },
      {
        type: "image",
        src: "/media/projects/digital-screen-pwmi/frame-04.webp",
        alt: "Mother and child watching the interactive screen while a train blurs past",
        caption: "Designed for passers-by, not forms",
        aspect: "3/2",
      },
    ],
    credits: [
      { role: "UX, Research & Concept", name: "Authentic Perspective" },
      { role: "Partners", name: "PWMI · T+Huis · Logo Lumens" },
      { role: "Programme", name: "Fontys ICT InnovationLab — Media Design" },
    ],
    externalLink: "https://www.fontysictinnovationlab.nl/innovations-insight/innovations-insight-june-25/projects-eindhoven/digital-screen-pwmi/",
    ux: {
      problem:
        "Useful neighbourhood services stay invisible when communication depends on dense Dutch text, websites and static posters.",
      audience:
        "Residents of Woensel-Zuid — especially people with a migration background and limited Dutch — plus families and passers-by in public spaces.",
      insight:
        "People notice themselves first. A playful mirror moment (“Spot yourself?” + wave) creates attention without reading, then the screen can open visual stories about local projects, events and neighbours.",
      concept:
        "An interactive public screen that starts with a gesture invitation, then shows easy-to-scan community content: local projects, the PWMI platform, upcoming events and short resident interviews — with language options in the navigation.",
      userFlow: [
        "Passer-by notices the live camera feed and Spot yourself? prompt",
        "They wave — the screen acknowledges the gesture",
        "The interface opens a visual grid of neighbourhood stories and events",
        "Language buttons switch the chrome without forcing a text-heavy start",
        "Cards lead to projects, events or resident interviews",
        "Home returns them to the attract-loop for the next person",
      ],
      learnings:
        "Testing with PWMI and people walking by confirmed the attract-loop works when the first second is visual and playful. Next iterations would deepen real content feeds and harden the prototype for continuous public use.",
    },
    seoDescription:
      "Digital Screen PWMI — interactive public UX concept for PWMI and T+Huis in Woensel-Zuid, by Authentic Perspective (Fontys ICT InnovationLab).",
    placeholderPalette: ["#2a1f3d", "#0c0a10"],
  },

  {
    slug: "boost-innovation-grant",
    title: "Boost Innovation Grant",
    year: 2024,
    status: "commission",
    featured: true,
    discipline: "film",
    categories: ["multicamera", "documentary", "events"],
    categoryLabel: "Surprise Recap / Multicamera",
    services: ["Multicamera Production", "Surprise Direction", "Edit", "Motion Titles"],
    client: "Boost Innovation Grant",
    location: "Eindhoven, Netherlands",
    description:
      "A surprise recap capturing student teams as they discover they have won the innovation grant.",
    summary:
      "Boost Innovation Grant surprises winning student teams with the news — and we were there with cameras to catch the first reaction. A recap that moves from the walk-up to the champagne spray to the quiet moment after.",
    challenge:
      "A surprise reveal only happens once. The production had to stay invisible until the right second, then move fast enough to catch genuine reactions without turning the moment into a staged performance.",
    approach:
      "A small multicamera crew embedded with the Boost team: walking shots into each location, a wide for the group reaction, and a closer camera for faces. The edit keeps the energy of the day while letting each team’s personality come through.",
    outcome:
      "A surprise recap film that celebrates the winners, gives Boost a memorable artefact of the grant round, and works as announcement content across channels.",
    cover: {
      type: "image",
      src: "/media/projects/boost-innovation-grant/cover.webp",
      alt: "Student teams cheering with champagne as Boost Innovation Grant signs are held high",
      aspect: "4/5",
    },
    previewVideo: undefined,
    heroMedia: {
      type: "image",
      src: "/media/projects/boost-innovation-grant/hero.webp",
      alt: "Winning teams celebrating the Boost Innovation Grant surprise reveal",
      aspect: "21/9",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/boost-innovation-grant/film.mp4",
        poster: "/media/projects/boost-innovation-grant/episode-poster.webp",
        alt: "Boost Innovation Grant — surprise recap film",
      },
      {
        type: "image",
        src: "/media/projects/boost-innovation-grant/frame-01.webp",
        alt: "Boost team member speaking outdoors in a branded polo",
        aspect: "16/9",
      },
      {
        type: "image",
        src: "/media/projects/boost-innovation-grant/frame-02.webp",
        alt: "Aero Team Eindhoven celebrating with the Innovation Grant award in their workshop",
        aspect: "3/2",
      },
    ],
    credits: [
      { role: "Production & Direction", name: "Authentic Perspective" },
      { role: "Edit & Titles", name: "Authentic Perspective" },
      { role: "Client", name: "Boost Innovation Grant" },
    ],
    seoDescription:
      "Surprise recap film for the Boost Innovation Grant — capturing student teams as they discover they have won, produced by Authentic Perspective, Eindhoven.",
    placeholderPalette: ["#33270f", "#110e07"],
  },

  {
    slug: "djaygear",
    title: "DJayGear",
    year: 2024,
    status: "commission",
    featured: true,
    discipline: "film",
    categories: ["brand-content"],
    categoryLabel: "Brand Film / Product",
    services: ["Concept", "Product Cinematography", "Edit & Grade", "Sound Design"],
    client: "DJayGear",
    description:
      "Product-led storytelling for a brand serving DJs and music creators.",
    summary:
      "Gear for DJs should be filmed the way it is used: in the dark, under moving light, loud. A product film that treats controllers and decks as instruments rather than electronics.",
    challenge:
      "Product film easily drifts into catalogue footage. DJayGear needed material that works hard on product pages yet still feels like culture — something a DJ would actually watch to the end.",
    approach:
      "Macro cinematography of jog wheels, faders and pads, cut to an original mix and lit like a club rather than a studio. Performance inserts with a working DJ anchor the gear in real hands.",
    outcome:
      "A brand film plus a set of product-page loops and social cut-downs, giving the store a consistent cinematic layer across its catalogue.",
    cover: {
      type: "image",
      src: "/media/projects/djaygear/cover.webp",
      alt: "Hands working a DJayGear-branded CDJ — finger on cue, jog wheel in frame",
      aspect: "4/5",
    },
    previewVideo: {
      type: "video",
      src: "/media/projects/djaygear/film.mp4",
      poster: "/media/projects/djaygear/cover.webp",
      alt: "DJayGear brand film preview",
      aspect: "4/5",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/djaygear/film.mp4",
        poster: "/media/projects/djaygear/cover.webp",
        alt: "DJayGear — brand film",
      },
      {
        type: "image",
        src: "/media/projects/djaygear/frame-01.webp",
        alt: "Technician in a DJayGear hoodie working CDJs at the branded workshop bench",
        aspect: "16/9",
      },
      {
        type: "image",
        src: "/media/projects/djaygear/frame-02.webp",
        alt: "Rows of DJayGear flightcases stacked in the warehouse racks",
        aspect: "16/9",
      },
    ],
    credits: [
      { role: "Concept & Cinematography", name: "Authentic Perspective" },
      { role: "Edit, Grade & Sound", name: "Authentic Perspective" },
      { role: "Client", name: "DJayGear" },
    ],
    seoDescription:
      "Product-led brand film for DJayGear — cinematic storytelling for DJs and music creators, produced by Authentic Perspective.",
    placeholderPalette: ["#3b130e", "#120808"],
  },

  {
    slug: "photography-press-fashion",
    title: "Press & Fashion",
    year: 2025,
    status: "commission",
    featured: true,
    discipline: "photography",
    categories: ["brand-content", "events"],
    categoryLabel: "Press Kit / Fashion Photography",
    services: [
      "DJ Press Kits",
      "Fashion & Streetwear",
      "Editorial Portraits",
      "Lifestyle Photography",
    ],
    location: "Netherlands",
    description:
      "Selected photography — DJ press kits, streetwear and fashion portraits shot for artists and brands.",
    summary:
      "A growing selection of stills from press and fashion work: artist portraits, group looks, and lifestyle frames built for releases, campaigns and social kits. More series (including Frenky backpack and Bylin) will land here as they wrap.",
    challenge:
      "Press and fashion images need to feel editorial and usable — strong enough for a cover, clean enough for a kit, and consistent enough to hold a brand together across platforms.",
    approach:
      "Natural light where it serves the subject, deliberate framing for crop flexibility, and a mix of colour and black-and-white finishes depending on the brief — from streetwear action to quiet portraiture.",
    outcome:
      "A live selection of press and fashion frames on the studio site, with room to expand as new product and brand series are delivered.",
    cover: {
      type: "image",
      src: "/media/projects/photography-press-fashion/cover.webp",
      alt: "Black-and-white press portrait of a man in a hoodie against a soft outdoor backdrop",
      aspect: "4/5",
    },
    heroMedia: {
      type: "image",
      src: "/media/projects/photography-press-fashion/hero.webp",
      alt: "Three people in dark streetwear on a train platform under overhead wires",
      aspect: "3/2",
    },
    gallery: [
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-01.webp",
        alt: "Two skaters in streetwear posing outdoors with boards",
        caption: "Lifestyle — streetwear duo",
        aspect: "4/5",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-02.webp",
        alt: "Skater carving on a paved track with a blue stripe",
        caption: "Action — streetwear in motion",
        aspect: "4/5",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-03.webp",
        alt: "Back of a Puin Collective t-shirt in an industrial urban setting",
        caption: "Brand detail — Puin Collective",
        aspect: "3/2",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-04.webp",
        alt: "Fashion group frame from a press and streetwear session",
        caption: "Press kit — group look",
        aspect: "3/2",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-05.webp",
        alt: "Three people in dark streetwear on a train platform under overhead wires",
        caption: "Editorial — platform group",
        aspect: "3/2",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-06.webp",
        alt: "Black-and-white press portrait of a man in a hoodie",
        caption: "Press portrait",
        aspect: "4/5",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-07.webp",
        alt: "Fashion portrait from a press and streetwear session",
        caption: "Fashion portrait",
        aspect: "4/5",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-08.webp",
        alt: "Black-and-white fashion portrait of a woman in a ribbed tank top",
        caption: "Fashion portrait",
        aspect: "4/5",
      },
      {
        type: "image",
        src: "/media/projects/photography-press-fashion/frame-09.webp",
        alt: "Portrait frame from a DJ press and fashion session",
        caption: "Press / fashion",
        aspect: "4/5",
      },
    ],
    credits: [
      { role: "Photography", name: "Authentic Perspective" },
    ],
    seoDescription:
      "Press kit and fashion photography by Authentic Perspective — DJ portraits, streetwear and editorial stills.",
    placeholderPalette: ["#1a1a1a", "#0a0a0a"],
  },

  {
    slug: "losjes-encore",
    title: "Losjes / Encore",
    year: 2023,
    status: "commission",
    featured: true,
    discipline: "film",
    categories: ["events", "multicamera"],
    categoryLabel: "4-Angle Multicamera / Encore",
    services: [
      "4-Angle Multicamera Direction",
      "Live Coverage Analysis",
      "Highlight Edit & Grade",
    ],
    client: "Encore",
    location: "Eindhoven, Netherlands",
    description:
      "Four-angle multicamera coverage for Encore — booth, crowd and stage cut into a tight highlight film.",
    summary:
      "Encore needed a highlight that felt like being in the room, not watching from the back. We ran a four-angle multicamera setup, analysed the coverage for the strongest perspective switches, and cut a fast Instagram-ready highlight that moves with the set.",
    challenge:
      "A single camera flattens a night like this. The booth, the crowd reaction and the lighting all need their own angle — then the edit has to decide, moment by moment, which perspective carries the energy without losing the pulse of the track.",
    approach:
      "Four synced angles: booth-facing for hands and gear, DJ-facing for performance, a wider room shot for scale, and a crowd-embedded camera for reaction. We analysed the takes for switch points on drops and gestures, then graded cool and punchy for social delivery.",
    outcome:
      "An Encore highlight film built from deliberate multicamera analysis — ready for Instagram and further cut-downs — and a repeatable four-angle setup for future editions alongside Losjes coverage.",
    cover: {
      type: "image",
      src: "/media/projects/losjes-encore/cover.webp",
      alt: "DJ facing the crowd from the ENCORE booth with arms raised",
      aspect: "4/5",
    },
    previewVideo: {
      type: "video",
      src: "/media/projects/losjes-encore/film.mp4",
      poster: "/media/projects/losjes-encore/cover.webp",
      alt: "Encore four-angle multicamera highlight preview",
      aspect: "4/5",
    },
    heroMedia: {
      type: "image",
      src: "/media/projects/losjes-encore/hero.webp",
      alt: "DJ pointing to the crowd behind a lit mixer under blue stage lights",
      aspect: "21/9",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/losjes-encore/film.mp4",
        poster: "/media/projects/losjes-encore/aftermovie-poster.webp",
        alt: "Encore — four-angle multicamera highlight film",
        caption: "Encore highlight — four-angle multicamera coverage",
      },
      {
        type: "image",
        src: "/media/projects/losjes-encore/frame-01.webp",
        alt: "Low booth angle on the DJ mid-set under blue stage lights",
        aspect: "16/9",
        caption: "Booth angle — hands, mixer and stage lights",
      },
      {
        type: "image",
        src: "/media/projects/losjes-encore/frame-02.webp",
        alt: "DJ focused on the mixer in purple and blue light",
        aspect: "3/2",
        caption: "Performance angle — close on the set",
      },
    ],
    credits: [
      { role: "4-Angle Multicamera Direction", name: "Authentic Perspective" },
      { role: "Edit & Grade", name: "Authentic Perspective" },
      { role: "Client", name: "Encore" },
    ],
    seoDescription:
      "Four-angle multicamera highlight film for Encore — live coverage analysed and cut for Instagram by Authentic Perspective, Eindhoven.",
    placeholderPalette: ["#33101d", "#0f080c"],
  },

  {
    slug: "tickle-beard",
    title: "Tickle Beard",
    year: 2025,
    status: "concept",
    featured: false,
    hidden: true,
    discipline: "ai",
    categories: ["brand-content"],
    categoryLabel: "AI-Assisted Campaign Concept",
    services: ["Concept Development", "AI Previsualisation", "Art Direction", "Copy"],
    location: "Eindhoven, Netherlands",
    description:
      "A playful commercial concept combining Eindhoven identity, storytelling, and creative AI.",
    summary:
      "A self-initiated campaign concept for a fictional Eindhoven barber brand — built end-to-end with AI-assisted previsualisation to show how we develop, test and pitch campaign ideas before a single shoot day is booked.",
    challenge:
      "Clients often can't see a campaign until it is too expensive to change. We wanted to prove that a full campaign world — casting, sets, grading, copy — can be previsualised convincingly enough to make decisions on, at a fraction of production cost.",
    approach:
      "We wrote the campaign as if commissioned: audience, tone, tagline, shot list. Generative imagery was used strictly as previsualisation — iterating on casting types, locations and colour until the boards felt shootable, with every frame documented from prompt to pick.",
    outcome:
      "A complete previsualised campaign that demonstrates our AI-assisted concepting workflow. Presented as a studio concept, not client work — and designed to be shot for real with a produced budget.",
    cover: {
      type: "image",
      src: "/media/projects/tickle-beard/cover.webp",
      alt: "AI-previsualised barbershop scene in warm cinematic light",
      aspect: "4/5",
      placeholder: true,
    },
    gallery: [
      {
        type: "image",
        src: "/media/projects/tickle-beard/board-01.webp",
        alt: "Campaign board: barber chair hero frame with tagline lockup",
        aspect: "16/9",
        placeholder: true,
      },
      {
        type: "image",
        src: "/media/projects/tickle-beard/board-02.webp",
        alt: "Campaign board: close-up beard trim with amber rim light",
        aspect: "3/2",
        placeholder: true,
      },
      {
        type: "image",
        src: "/media/projects/tickle-beard/board-03.webp",
        alt: "Campaign board: exterior shopfront at night, Eindhoven street",
        aspect: "16/9",
        placeholder: true,
      },
    ],
    credits: [
      { role: "Concept & Art Direction", name: "Authentic Perspective" },
      { role: "AI Previsualisation", name: "Authentic Perspective" },
    ],
    ai: {
      conceptExplanation:
        "Tickle Beard is a fictional barber brand invented to stress-test our AI previsualisation workflow. Every image in this case study is generated, iterated and graded as previsualisation — the deliverable is the workflow itself: a campaign a client can approve before production begins.",
      processExcerpts: [
        "Frame 01 — “1970s barbershop interior, single tungsten practical, haze, 35mm, warm amber grade” — 14 iterations to settle casting and lens height.",
        "Frame 02 — casting pass: same seed, five beard archetypes, judged against the audience profile before art-directing wardrobe.",
        "Grade pass — all selects pulled through one colour reference so the boards read as a single campaign, not separate generations.",
      ],
      before: {
        type: "image",
        src: "/media/projects/tickle-beard/before.webp",
        alt: "Early raw generation: flat lighting, inconsistent set dressing",
        aspect: "16/9",
        placeholder: true,
      },
      after: {
        type: "image",
        src: "/media/projects/tickle-beard/after.webp",
        alt: "Final previsualised frame: art-directed, graded, campaign-ready",
        aspect: "16/9",
        placeholder: true,
      },
    },
    seoDescription:
      "Tickle Beard — an AI-assisted campaign concept by Authentic Perspective, combining Eindhoven identity, storytelling and generative previsualisation.",
    placeholderPalette: ["#38220b", "#110d06"],
  },

  {
    slug: "psv-generations-united",
    title: "PSV Generations United",
    year: 2025,
    status: "concept",
    featured: true,
    discipline: "ux",
    categories: ["brand-content"],
    categoryLabel: "UX / Interactive Experience",
    services: [
      "UX Research",
      "Concept Design",
      "Prototyping",
      "Interaction Design",
      "Concept Film",
    ],
    location: "Eindhoven, Netherlands",
    description:
      "A digital concept designed to connect generations of PSV supporters — with a concept film and interactive app prototype.",
    summary:
      "A self-initiated interactive concept exploring how PSV could connect supporters across generations — pairing season-ticket veterans with young fans through shared match memories, meetups and a living club community. The case study includes a short concept film and a clickable app walkthrough.",
    challenge:
      "Football clubs sit on decades of emotional history, but their digital platforms mostly serve tickets and merchandise. How might a club turn belonging into a product that bridges a 70-year-old season-ticket holder and a first-season young fan?",
    approach:
      "We mapped supporter journeys across three generations, then designed around matching, chat and accessible meetups near Philips Stadion. A short concept film grounds the idea in real supporter emotion; the app prototype shows how those connections could live day to day.",
    outcome:
      "A concept film, interactive prototype and design system demonstrating the idea end-to-end. Developed independently as a studio concept — not commissioned by or affiliated with PSV — to show how we approach interactive storytelling for organisations with deep communities.",
    cover: {
      type: "image",
      src: "/media/projects/psv-generations-united/cover.webp",
      alt: "PSV supporters laughing together, scarves and striped jerseys in frame",
      aspect: "4/5",
    },
    previewVideo: {
      type: "video",
      src: "/media/projects/psv-generations-united/film.mp4",
      poster: "/media/projects/psv-generations-united/cover.webp",
      alt: "PSV Generations United concept film preview",
      aspect: "4/5",
    },
    heroMedia: {
      type: "image",
      src: "/media/projects/psv-generations-united/hero.webp",
      alt: "Four generations of PSV fans on a city sidewalk, smiling in club colours",
      aspect: "21/9",
    },
    gallery: [
      {
        type: "video",
        src: "/media/projects/psv-generations-united/film.mp4",
        poster: "/media/projects/psv-generations-united/film-poster.webp",
        alt: "PSV Generations United — concept film",
        caption: "Concept film — the emotional brief for the product",
        aspect: "16/9",
      },
      {
        type: "video",
        src: "/media/projects/psv-generations-united/walkthrough.mp4",
        poster: "/media/projects/psv-generations-united/walkthrough-poster.webp",
        alt: "PSV Generations United — app walkthrough",
        caption: "App walkthrough — matching, chat and matchday meetups",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/psv-generations-united/screen-match.webp",
        alt: "Supporter Match screen showing Jan, 68, with Connect and Skip actions",
        caption: "Supporter Match",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/psv-generations-united/screen-chat.webp",
        alt: "Chat screen after a match, discussing the 1988 European Cup final",
        caption: "Chat",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/psv-generations-united/screen-map.webp",
        alt: "Meetups map around Philips Stadium with Get Directions",
        caption: "Meeting points",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/psv-generations-united/screen-meetups.webp",
        alt: "Available meetups list with Join Meetup actions",
        caption: "Meetups",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/psv-generations-united/screen-join.webp",
        alt: "Join Meetup form with mobility assistance and seating preferences",
        caption: "Join meetup",
        aspect: "9/16",
      },
      {
        type: "image",
        src: "/media/projects/psv-generations-united/screen-home.webp",
        alt: "Home screen with supporter profile and quick actions for meetups and transport",
        caption: "Home",
        aspect: "9/16",
      },
    ],
    credits: [
      { role: "Research, UX & Prototype", name: "Authentic Perspective" },
      { role: "Concept Film", name: "Authentic Perspective" },
    ],
    prototypeLink: undefined,
    ux: {
      problem:
        "Club platforms serve transactions, not belonging. Older supporters hold the club's living memory; younger fans have no easy way to meet them.",
      audience:
        "Three generations of PSV supporters: long-time season-ticket holders, match-going parents, and first-season young fans.",
      insight:
        "In supporter interviews, every generation described the same matches — but remembered completely different details. The overlap, not the archive itself, is the product.",
      concept:
        "PSV Generations matches supporters across ages, opens a chat around shared club history, and makes pre-match meetups accessible — including mobility assistance and seated options around Philips Stadion.",
      userFlow: [
        "Supporter opens Home and reviews a suggested Supporter Match",
        "They Connect (or Skip) based on shared interests",
        "A chat opens around classic matches and living memories",
        "Meetups lists gatherings near Philips Stadion",
        "Join Meetup captures preferences like mobility assistance",
        "Directions and day-of support bring both generations together",
      ],
      learnings:
        "Matching and chat make the emotional brief tangible; accessibility options on Join Meetup were the detail older testers cared about most. A future iteration would deepen the voice-memory flow for telling match stories without typing.",
    },
    seoDescription:
      "PSV Generations United — an independent UX concept by Authentic Perspective, with concept film and app prototype connecting generations of supporters.",
    placeholderPalette: ["#25150f", "#0d0908"],
  },
];

/** Projects that are visible on the site (not hidden). */
export const visibleProjects = projects.filter((p) => !p.hidden);

/** Featured projects for the homepage, in array order. */
export const featuredProjects = visibleProjects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return visibleProjects.find((p) => p.slug === slug);
}

/** Previous/next neighbours for case-study footer navigation (wraps around). */
export function getAdjacentProjects(slug: string): {
  previous: Project;
  next: Project;
} {
  const index = visibleProjects.findIndex((p) => p.slug === slug);
  const count = visibleProjects.length;
  return {
    previous: visibleProjects[(index - 1 + count) % count],
    next: visibleProjects[(index + 1) % count],
  };
}
