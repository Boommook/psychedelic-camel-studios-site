import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Code2,
  Users,
  Mouse,
} from "lucide-react";
import { site } from "@/config/site";
import { game } from "@/data/game";
import { videos } from "@/data/resources";
import { getPosts } from "@/lib/devlog";
import { Button } from "@/components/ui/button";
import { Status, Portal, VideoEmbed, DevlogPreview } from "@/components/shared";
export default function Home() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow">
              A {site.studio.toUpperCase()} PROJECT
            </span>
            <Status />
          </div>
          <h1 className="game-title">
            {site.title}
            <span className="title-period">.</span>
          </h1>
          <p className="hero-tagline">{site.tagline}</p>
          <p className="hero-description">{site.description}</p>
          <div className="hero-actions">
            <Button asChild>
              <Link href="/about/" >
                Explore the Project <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/devlog/">
                Development Updates <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
        <div className="hero-art">
          <Portal />
        </div>
      </section>
      <div className="project-strip">
        <div className="container strip-inner">
          <span>
            <Box size={17} />
            {site.engine}
          </span>
          <span>
            <Users size={17} />5 developers · 2 artists
          </span>
          <span>
            <Code2 size={17} />
            {site.course}
          </span>
          <span className="strip-phase">{site.phase}</span>
        </div>
      </div>
      <section className="container section intro-section">
        <div>
          <p className="eyebrow">01 / THE IDEA</p>
          <h2>
            Elevator Pitch
          </h2>
        </div>
        <div className="intro-copy my-auto">
          <p className="!text-lg">{game.elevatorPitch}</p>
          <Link href="/about/" className="text-link">
            Learn more about the project <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="container section media-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / THROUGH THE LENS</p>
            <h2>A glimpse, eventually.</h2>
          </div>
          <span className="micro">THE WORLD IS STILL IN THE MAKING</span>
        </div>
        <VideoEmbed video={videos[0]} />
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / FIELD NOTES</p>
            <h2>From the development log.</h2>
          </div>
          <Link href="/devlog/" className="text-link">
            All entries <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="home-posts w-full">
          {posts.map((post) => (
            <DevlogPreview key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <section className="container resource-callout">
        <div>
          <p className="eyebrow">THE PROJECT, IN ONE PLACE</p>
          <h2>Follow what takes shape.</h2>
          <p>
            Builds, documents, media, and course deliverables — as they become
            available.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/resources/">
            Project Resources <ArrowUpRight size={17} />
          </Link>
        </Button>
      </section>
    </>
  );
}
