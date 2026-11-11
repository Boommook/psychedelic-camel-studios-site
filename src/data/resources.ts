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
    id: "alpha-build",
    title: "paRAnoia Alpha Build",
    description:
      "Play an early version of paRAnoia, available on itch.io.",
    platform: "Windows PC",
    url: "https://boommook.itch.io/paranoia-alpha",
    instructions:
      "Visit itch.io to download the alpha build for Windows PC.",
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
    id: "alpha-slides",
    title: "paRAnoia Alpha Presentation",
    description: "Explore the team's alpha presentation on Google Slides.",
    kind: "Presentation",
    format: "Google Slides",
    url: "https://docs.google.com/presentation/d/14hpVd3AqQEUUKtDA5AxaWehZ-CtP75MTTWa9jwbi68E/edit?usp=sharing",
  },
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
