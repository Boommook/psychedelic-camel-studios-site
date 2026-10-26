export const site = {
  studio: "Psychedelic Camel Studios",
  title: "paRAnoia",
  tagline: "Just another night on duty, what could go wrong?",
  description:
    "A student game project exploring perception, surreal environments, and the unfamiliar within the familiar.",
  course: "Technical Game Development II",
  university: "Worcester Polytechnic Institute",
  engine: "Unreal Engine",
  status: "In Development",
  phase: "Brainstorming & preproduction",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  socialLinks: [] as { label: string; url: string }[],
  externalUrls: {
    university: "https://www.wpi.edu/",
    engine: "https://www.unrealengine.com/",
  },
  themes: [
    {
      title: "A shift in perception",
      text: "Could a change in perspective reveal something that was there all along?",
    },
    {
      title: "The familiar, unfamiliar",
      text: "Exploring how everyday environments might become quietly unsettling.",
    },
    {
      title: "Space without certainty",
      text: "Considering impossible geometry, distorted time, and unreliable surroundings.",
    },
  ],
};
