import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** The site is a single page; the nav entries are in-page anchors, which are
 *  not separate URLs and so do not belong in the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
