import type { Metadata } from "next";
import { members, TeamMember } from "@/data/team";
import { game } from "@/data/game";
import { PageHeader, TeamProfile } from "@/components/shared";

export const metadata: Metadata = {
  title: "About & Team",
  description:
    "Elevator pitch, gameplay, narrative, and the seven-person student team behind the project.",
};

const sections = [
  {
    eyebrow: "01 / ELEVATOR PITCH",
    title: "Elevator pitch.",
    copy: game.elevatorPitch,
  },
  {
    eyebrow: "02 / GAMEPLAY",
    title: "Gameplay overview.",
    copy: game.gameplayOverview,
  },
  {
    eyebrow: "03 / NARRATIVE",
    title: "Game narrative.",
    copy: game.narrative,
  },
];

export default function About() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="THE PROJECT / THE PEOPLE"
        title="A shared curiosity."
        description="The pitch, how it plays, and the story — and the seven people building it."
      />
      {sections.map((section) => (
        <section className="about-overview section" key={section.eyebrow}>
          <div>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
          </div>
          <div className="prose-copy">
            <p className="micro">PLACEHOLDER</p>
            <p className="large-copy">{section.copy}</p>
          </div>
        </section>
      ))}
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE TEAM</p>
            <h2>The people behind the perspective.</h2>
          </div>
          <span className="text-xs">5 TECHNICAL / 2 ART</span>
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
