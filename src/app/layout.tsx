import type { Metadata } from "next";
import { site } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/shared";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.title} — ${site.studio}`,
    template: `%s | ${site.studio}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.title} — ${site.studio}`,
    description: site.description,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.title} — ${site.tagline}`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/psychedelic_camels_icon.png" },
};
const themeScript = `(function(){try{document.documentElement.dataset.perception=localStorage.getItem('perception')==='altered'?'altered':'normal'}catch(e){}})()`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
