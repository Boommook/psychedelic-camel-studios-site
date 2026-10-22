import type { Metadata } from "next";
import { getPosts } from "@/lib/devlog";
import { PageHeader, DevlogPreview } from "@/components/shared";
export const metadata: Metadata = {
  title: "Development Log",
  description:
    "Notes, questions, and experiments from an evolving student game project.",
};
export default function Devlog() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="NOTES FROM THE PROCESS"
        title="An evolving perspective."
        description="The questions we ask. The ideas we test. A development journal from the first possibilities onward."
      />
      <div className="devlog-layout">
        <div>
          {getPosts().map((post) => (
            <DevlogPreview key={post.slug} post={post} />
          ))}
        </div>
        <aside className="devlog-aside">
          <span className="micro">CURRENT CHAPTER</span>
          <h2>At the beginning.</h2>
          <p>
            The project is in brainstorming and preproduction. Entries will
            follow its development throughout the term.
          </p>
          <span className="aside-line" />
          <p>
            Early ideas may change.
            <br />
            That’s part of the process.
          </p>
        </aside>
      </div>
    </div>
  );
}
