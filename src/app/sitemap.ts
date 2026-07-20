import type { MetadataRoute } from "next";
import { visibleProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.domain, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.domain}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.domain}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteConfig.domain}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteConfig.domain}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = visibleProjects.map((project) => ({
    url: `${siteConfig.domain}/work/${project.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
