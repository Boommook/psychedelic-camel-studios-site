export type TeamMember = {
  id: string;
  name: string;
  role: string;
  discipline: "Technical" | "Art";
  photo?: string;
  biography?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
};

export const members: TeamMember[] = [
  {
    id: "member-1",
    name: "Cole Bennett",
    role: "Technical Lead",
    discipline: "Technical",
  },
  {
    id: "member-2",
    name: "Brandon Contardi",
    role: "Environment Design",
    discipline: "Technical",
  },
  {
    id: "member-3",
    name: "Berenis Tekin",
    role: "Puzzle Design",
    discipline: "Technical",
  },
  {
    id: "member-4",
    name: "Chloe Polit",
    role: "Environmental Design & Puzzle Design",
    discipline: "Technical",
  },
  {
    id: "member-5",
    name: "Domenic \"Mr. Developer\" Kramer",
    role: "Writer & Programmer",
    discipline: "Technical",
  },
  {
    id: "member-6",
    name: "Morgan Acevedo",
    role: "Writer & 3D+2D Modeler",
    discipline: "Art",
  },
  {
    id: "member-7",
    name: "Trevor Jolin",
    role: "3D Modeler & Character Design",
    discipline: "Art",
  },
];
export const team: TeamMember[] = Array.from({ length: 7 }, (_, i) => ({
  id: `member-${i + 1}`,
  name: `Team member ${String(i + 1).padStart(2, "0")}`,
  role: i < 5 ? "Technical developer" : "Artist",
  discipline: i < 5 ? "Technical" : "Art",
  biography: "Profile coming soon.",
}));
