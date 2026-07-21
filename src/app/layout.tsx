import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default:
      "Authentic Perspective Studios — Film, Photography, AI & UX | Eindhoven",
    template: "%s — Authentic Perspective Studios",
  },
  description: siteConfig.description,
  applicationName: "Authentic Perspective Studios",
  keywords: [
    "Authentic Perspective",
    "Authentic Perspective Studios",
    "AP Studios",
    "filmmaker Eindhoven",
    "videography Eindhoven",
    "photography Eindhoven",
    "creative studio Netherlands",
    "brand films",
    "aftermovies",
  ],
  openGraph: {
    type: "website",
    siteName: "Authentic Perspective Studios",
    locale: "en_NL",
    url: siteConfig.domain,
    title:
      "Authentic Perspective Studios — Film, Photography, AI & UX | Eindhoven",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Authentic Perspective Studios — Film, Photography, AI & UX | Eindhoven",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a08",
};

/**
 * Structured data for the studio. Only facts provided by the studio are
 * included — no invented street addresses, ratings or reviews.
 */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.domain}/#organization`,
      name: siteConfig.name,
      legalName: "Authentic Perspective",
      alternateName: [...siteConfig.alternateNames],
      description: siteConfig.description,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.whatsapp.display,
      slogan: siteConfig.tagline,
      logo: `${siteConfig.domain}/media/brand/logo.png`,
      image: `${siteConfig.domain}/media/brand/bts-tracking-shot.webp`,
      areaServed: {
        "@type": "Country",
        name: siteConfig.location.country,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
      knowsAbout: [
        "Film production",
        "Videography",
        "Photography",
        "AI-assisted creative production",
        "UX design",
        "Interactive design",
      ],
      sameAs: Object.values(siteConfig.socials).filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.domain}/#website`,
      name: "Authentic Perspective Studios",
      alternateName: [...siteConfig.alternateNames, siteConfig.name],
      url: siteConfig.domain,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.domain}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.domain}/#studio`,
      name: "Authentic Perspective Studios",
      alternateName: [...siteConfig.alternateNames, siteConfig.name],
      url: siteConfig.domain,
      image: `${siteConfig.domain}/media/brand/bts-tracking-shot.webp`,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.whatsapp.display,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
      areaServed: siteConfig.location.country,
      parentOrganization: { "@id": `${siteConfig.domain}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
