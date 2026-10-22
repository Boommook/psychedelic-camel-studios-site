import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Box, Users } from "lucide-react";
import { site } from "@/config/site";
import { members, TeamMember } from "@/data/team";
import { PageHeader, TeamProfile, Status } from "@/components/shared";
export const metadata: Metadata = {
  title: "About & Team",
  description: "The concept and seven-person student team behind the project.",
};
export default function About() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="THE PROJECT / THE PEOPLE"
        title="A shared curiosity."
        description="Seven perspectives. One project. Exploring what happens when reality stops feeling quite so certain."
      />
      <section className="about-overview section">
        <div>
          <Status />
          <h2>
            A world still
            <br />
            being imagined.
          </h2>
        </div>
        <div className="prose-copy">
          <p className="large-copy">
            {site.title} is a working title for a surreal puzzle/adventure
            concept centered on altered perception.
          </p>
          <p>
            {site.description} A horror-inspired atmosphere is one direction
            under consideration. Ideas such as changing perspectives, unreliable
            surroundings, and unfamiliar versions of familiar places are still
            being discussed.
          </p>
          <p>
            Our goal is to investigate a focused, engaging experience while
            developing our technical and artistic practice. The story,
            mechanics, and scope will evolve through design and experimentation.
          </p>
          <div className="fact-pair">
            <span>
              <Box size={17} />
              Built with {site.engine}
            </span>
            <span>
              <Users size={17} />5 technical developers · 2 artists
            </span>
          </div>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">CONCEPTS UNDER CONSIDERATION</p>
        <div className="theme-list">
          {site.themes.map((theme, i) => (
            <article key={theme.title}>
              <span className="theme-number">0{i + 1}</span>
              <h3>{theme.title}</h3>
              <p>{theme.text}</p>
            </article>
          ))}
        </div>
        <p className="concept-note">
          These themes are brainstorming prompts, not confirmed features.
        </p>
      </section>
      <section className="studio-section section">
        <p className="eyebrow">ABOUT THE STUDIO</p>
        <h2>{site.studio}</h2>
        <p className="large-copy">
          A student game development team at {site.university}, bringing
          technical development and art together for {site.course}.
        </p>
        <Link href="/devlog/" className="text-link">
          Follow our process <ArrowUpRight size={16} />
        </Link>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE TEAM</p>
            <h2>The people behind the perspective.</h2>
          </div>
          <span className="micro">05 TECHNICAL / 02 ART</span>
        </div>
        <div className="team-grid">
          {members.map((member: TeamMember, i: number) => (
            <TeamProfile key={member.id} member={member} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
