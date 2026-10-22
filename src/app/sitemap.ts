import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts } from "@/lib/devlog";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/about", "/devlog", "/resources"].map((route) => ({
      url: `${site.url}${route}/`,
    })),
    ...getPosts().map((post) => ({
      url: `${site.url}/devlog/${post.slug}/`,
      lastModified: new Date(post.date),
    })),
  ];
}
