import { site } from "@/config/site";

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
  actionLabel: string;
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
export const playtestBuild: Build = {
  id: "playtest-build",
  title: "paRAnoia Playtesting Build",
  description:
    "Play the current playtesting build of paRAnoia, available on itch.io.",
  platform: "Windows PC",
  date: "2026-11-18",
  size: "167 KB",
  url: site.externalUrls.playtest,
  instructions:
    "Visit itch.io to download the playtesting build for Windows PC.",
  actionLabel: "Download Playtesting Build",
};
export const alphaBuild: Build = {
  id: "alpha-build",
  title: "paRAnoia Alpha Build",
  description: "Play an early version of paRAnoia, available on itch.io.",
  platform: "Windows PC",
  url: "https://boommook.itch.io/paranoia-alpha",
  instructions: "Visit itch.io to download the alpha build for Windows PC.",
  actionLabel: "Download Alpha Build",
};
export const builds: Build[] = [playtestBuild, alphaBuild];
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
