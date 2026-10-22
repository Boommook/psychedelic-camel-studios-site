import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
export type DevlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  content: string;
};
const directory = path.join(process.cwd(), "content/devlog");
export function getPosts(): DevlogPost[] {
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const source = fs
        .readFileSync(path.join(directory, name), "utf8")
        .replace(/^\uFEFF/, "");
      const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
      if (!match) throw new Error(name + ": missing YAML frontmatter");
      const data = parse(match[1]);
      const content = match[2];
      if (!data || typeof data !== "object")
        throw new Error(name + ": frontmatter must be an object");
      for (const key of ["title", "date", "excerpt"])
        if (typeof data[key] !== "string" || !data[key])
          throw new Error(
            `${name}: frontmatter ${key} must be a nonempty string`,
          );
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
        Number.isNaN(Date.parse(data.date))
      )
        throw new Error(`${name}: use a quoted YYYY-MM-DD date`);
      if (
        data.tags &&
        (!Array.isArray(data.tags) ||
          data.tags.some((tag: unknown) => typeof tag !== "string"))
      )
        throw new Error(`${name}: tags must be strings`);
      return {
        slug: name.replace(/\.mdx$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || [],
        cover: data.cover,
        coverAlt: data.coverAlt,
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}
