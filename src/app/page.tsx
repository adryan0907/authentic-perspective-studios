import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Hero } from "@/sections/Hero";
import { PerspectiveStatement } from "@/sections/PerspectiveStatement";
import { SelectedWork } from "@/sections/SelectedWork";
import { Disciplines } from "@/sections/Disciplines";
import { Process } from "@/sections/Process";
import { StudioIntro } from "@/sections/StudioIntro";
import { Collaborations } from "@/sections/Collaborations";
import { FinalCta } from "@/sections/FinalCta";

export const metadata: Metadata = {
  title: {
    absolute:
      "Authentic Perspective Studios — Film, Photography, AI & UX | Eindhoven",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PerspectiveStatement />
      <SelectedWork />
      <Disciplines />
      <Process />
      <StudioIntro />
      <Collaborations />
      <FinalCta />
    </>
  );
}
