import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { builds, videos, images, documents } from "@/data/resources";
import {
  PageHeader,
  ResourceEntry,
  VideoEmbed,
  MediaGallery,
} from "@/components/shared";
export const metadata: Metadata = {
  title: "Project Resources",
  description:
    "Game builds, demonstration media, treatment documents, presentation slides, and development artifacts.",
};
export default function Resources() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="THE PROJECT ARCHIVE"
        title="From ideas to artifacts."
        description="The home for playable builds, media, and course deliverables. Resources will appear here as the project develops."
      />
      <nav className="resource-nav" aria-label="Resource sections">
        <a href="#downloads">01 / Downloads</a>
        <a href="#media">02 / Media</a>
        <a href="#documents">03 / Documents & presentations</a>
      </nav>
      <section className="section" id="downloads">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / PLAY THE PROJECT</p>
            <h2>Downloads</h2>
          </div>
          <span className="micro">NO PUBLIC BUILD YET</span>
        </div>
        {builds.map((build) => (
          <ResourceEntry key={build.id} resource={build} />
        ))}
      </section>
      <section className="section" id="media">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / SEE THE PROJECT</p>
            <h2>Media</h2>
          </div>
        </div>
        {videos.map((video) => (
          <div key={video.id} className="resource-video">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <VideoEmbed video={video} />
          </div>
        ))}
        <h3 className="gallery-heading">Screenshots & visual development</h3>
        <MediaGallery images={images} />
      </section>
      <section className="section" id="documents">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / BEHIND THE PROJECT</p>
            <h2>Documents & presentations</h2>
          </div>
        </div>
        {documents.map((doc) => (
          <ResourceEntry key={doc.id} resource={doc} />
        ))}
      </section>
      <div className="resource-footnote">
        <p>Looking for the people behind the project?</p>
        <Link href="/about/" className="text-link">
          About & Team <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
