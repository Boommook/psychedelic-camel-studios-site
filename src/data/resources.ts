type BaseResource = {
  id: string;
  title: string;
  description: string;
  url?: string;
};
export type Build = BaseResource & {
  platform: string;
  version?: string;
  date?: string;
  size?: string;
  instructions: string;
  releaseNotes?: string;
};
export type Video = BaseResource & {
  youtubeId?: string;
  src?: string;
  poster?: string;
};
export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};
export type DocumentResource = BaseResource & {
  kind: "Document" | "Presentation";
  format: string;
  downloadUrl?: string;
};
export const builds: Build[] = [
  {
    id: "playable-build",
    title: "Playable game build",
    description:
      "An executable will be shared here when a playable build is ready.",
    platform: "Platform to be confirmed",
    instructions:
      "Installation instructions will accompany each published build.",
  },
];
export const videos: Video[] = [
  {
    id: "final-beta",
    title: "Final beta demonstration",
    description:
      "A look at the game in motion. Demonstration footage will be added as development progresses.",
  },
];
export const images: GalleryImage[] = [];
export const documents: DocumentResource[] = [
  {
    id: "treatment",
    title: "Game treatment",
    description:
      "The project direction, design intentions, and proposed experience.",
    kind: "Document",
    downloadUrl: "/documents/Treatment Document.pdf",
    format: "PDF",
  },
  {
    id: "beta-slides",
    title: "Final beta presentation",
    description: "Slides accompanying the final beta presentation.",
    kind: "Presentation",
    format: "PDF / slides",
  },
  {
    id: "artifacts",
    title: "Development artifacts",
    description:
      "Design notes, experiments, and other coursework deliverables.",
    kind: "Document",
    format: "Various",
  },
];
