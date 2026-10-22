import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  BriefcaseBusiness,
  Globe,
  FileText,
  Download,
  Play,
  Orbit,
  ScanLine,
} from "lucide-react";
import { site } from "@/config/site";
import type { TeamMember } from "@/data/team";
import type {
  Build,
  DocumentResource,
  GalleryImage,
  Video,
} from "@/data/resources";
import type { DevlogPost } from "@/lib/devlog";
import { formatDate } from "@/lib/utils";
export function Status() {
  return (
    <span className="status">
      <span />
      {site.status}
    </span>
  );
}
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <div>
        <Link href="/" className="footer-brand">
          <Image src="/images/psychedelic_camels_icon-expanded.png" alt="Logo" width={200} height={200} />
        </Link>
      </div>
      <div>
        <p>{site.university}</p>
        <p>{site.course}</p>
        {site.socialLinks.map((link) => (
          <a key={link.url} href={link.url}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
export function Portal({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`portal-scene ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <div className="scene-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="portal-frame frame-back" />
      <div className="portal-frame frame-middle" />
      <div className="portal-frame frame-front">
        <div className="door-light" />
      </div>
      <div className="portal-floor" />
      <span className="scene-coordinate">37.4° / PERCEPTION STUDY</span>
      <span className="hidden-detail">THERE IS MORE THAN ONE WAY THROUGH.</span>
    </div>
  );
}
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="empty-state">
      <ScanLine size={25} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="micro">COMING SOON</span>
    </div>
  );
}
export function VideoEmbed({ video }: { video: Video }) {
  if (video.youtubeId && /^[\w-]{11}$/.test(video.youtubeId))
    return (
      <iframe
        className="video"
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
        title={video.title}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  if (video.src)
    return (
      <video
        className="video"
        controls
        preload="none"
        poster={video.poster}
        aria-label={video.title}
      >
        <source src={video.src} />
        <track kind="captions" />
      </video>
    );
  return (
    <div className="video-placeholder">
      <Portal compact />
      <div className="video-placeholder-copy">
        <span className="play-circle">
          <Play size={22} />
        </span>
        <h3>{video.title}</h3>
        <p>Footage is still on the other side.</p>
        <span className="micro">COMING SOON · NO GAMEPLAY FOOTAGE YET</span>
      </div>
      <span className="media-label">
        ABSTRACT PERCEPTION STUDY — NOT GAME ART
      </span>
    </div>
  );
}
export function MediaGallery({ images }: { images: GalleryImage[] }) {
  return images.length ? (
    <div className="gallery">
      {images.map((img) => (
        <figure key={img.id}>
          <a href={img.src}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </a>
          {img.caption && <figcaption>{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  ) : (
    <EmptyState
      title="A world taking shape"
      description="Screenshots, concept art, and visual experiments will live here as they become available."
    />
  );
}
export function DevlogPreview({ post }: { post: DevlogPost }) {
  return (
    <article className="post-preview ">
      {post.cover && (
        <Image
          src={post.cover}
          alt={post.coverAlt || ""}
          width={800}
          height={450}
        />
      )}
      <div className="post-meta ">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.tags.join(" / ")}</span>
      </div>
      <Link href={`/devlog/${post.slug}/`}>
        <h3>
          {post.title}
          <ArrowUpRight size={23} />
        </h3>
      </Link>
      <p>{post.excerpt}</p>
      <Link className="text-link" href={`/devlog/${post.slug}/`}>
        Read the entry <ArrowRight size={15} />
      </Link>
    </article>
  );
}
export function TeamProfile({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <article className="team-profile">
      <div className="avatar">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={120}
            height={120}
          />
        ) : (
          <span>{String(index + 1).padStart(2, "0")}</span>
        )}
        <span className="micro">{member.discipline}</span>
      </div>
      <h3>{member.name}</h3>
      <p className="role !mb-0 !pb-0">{member.role}</p>
      <p>{member.email && <a className="text-link" href={`mailto:${member.email}`}>{member.email} <ArrowUpRight size={16} /></a>}</p>
    </article>
  );
}
export function ResourceEntry({
  resource,
}: {
  resource: Build | DocumentResource;
}) {
  const build = "platform" in resource;
  return (
    <article className="resource-entry">
      <span className="resource-icon">
        {build ? <Download size={22} /> : <FileText size={22} />}
      </span>
      <div>
        <span className="micro">
          {build ? resource.platform : `${resource.kind} / ${resource.format}`}
        </span>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        {build && (
          <>
            <p className="resource-meta">
              {[
                resource.version,
                resource.date && formatDate(resource.date),
                resource.size,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <p>{resource.instructions}</p>
            {resource.releaseNotes && (
              <details>
                <summary>Release notes</summary>
                <p>{resource.releaseNotes}</p>
              </details>
            )}
          </>
        )}
      </div>
      <div className="resource-action">
        {resource.url ? (
          <>
            <a className="text-link" href={resource.url}>
              {build ? "Download build" : "Open file"}
              <ArrowUpRight size={16} />
            </a>
            {!build && resource.downloadUrl && (
              <a href={resource.downloadUrl} download>
                Download
              </a>
            )}
          </>
        ) : (
          <span className="coming-soon">Coming soon</span>
        )}
      </div>
    </article>
  );
}
