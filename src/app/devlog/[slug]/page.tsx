import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts, getPost } from "@/lib/devlog";
import { formatDate } from "@/lib/utils";
import { VideoEmbed } from "@/components/shared";
export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <article className="container article-page">
      <Link href="/devlog/" className="text-link">
        <ArrowLeft size={16} />
        Back to the journal
      </Link>
      <header className="article-header">
        <div className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.tags.join(" / ")}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
      </header>
      {post.cover && (
        <Image
          className="article-cover"
          src={post.cover}
          alt={post.coverAlt || ""}
          width={1200}
          height={675}
          priority
        />
      )}
      <div className="prose">
        <MDXRemote
          source={post.content}
          components={{
            VideoEmbed,
            img: (props) => (
              <Image
                src={typeof props.src === "string" ? props.src : ""}
                alt={props.alt || ""}
                width={1200}
                height={675}
                sizes="(max-width: 800px) 100vw, 760px"
              />
            ),
          }}
        />
      </div>
      <div className="article-end">
        <span className="micro">END OF ENTRY</span>
        <Link href="/resources/" className="text-link">
          Explore project resources ?
        </Link>
      </div>
    </article>
  );
}
