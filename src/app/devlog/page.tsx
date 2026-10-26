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
        title="Documenting the descent."
        description="Follow the development of paRAnoia, from early concepts to finalized puzzles, environments, and playable builds."
      />
      <div className="devlog-layout">
        <div>
          {getPosts().map((post) => (
            <DevlogPreview key={post.slug} post={post} />
          ))}
        </div>
        <aside className="devlog-aside">
          <span className="micro">CURRENT PHASE</span>
          <h2>Building Camelot Hall.</h2>
          <p>
          With the core concept established, we're exploring how to bring Twizz's increasingly unpredictable night shift to life in Unreal Engine.
          </p>
        </aside>
      </div>
    </div>
  );
}
