# Psychedelic Camel Studios

A Next.js App Router site for the WPI Technical Game Development II project, deployed with Vercel's native Next.js integration. Server Components prerender the content at build time; only navigation and the perception toggle require client components. No database, API, accounts, or CMS.

## Run and validate

Use Node.js 20.9+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
# http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

The production build is in `.next/`. Run `npm start` to serve it locally. This project does not use `output: "export"` or generate an `out/` deployment. Any leftover local `out/` directory is obsolete. Commit `package-lock.json` and use `npm ci` for repeatable installs. Only source-controlled, trusted MDX should be added: MDX can execute code during builds.

## Deploy on Vercel

1. Push this repository to GitHub and import it into Vercel.
2. Set Root Directory to the repository root (the directory containing `package.json`, `next.config.ts`, and `src/app`). Select the **Next.js** Framework Preset. Use `npm run build` as the Build Command and the default npm installation command (or `npm ci`). Turn the **Output Directory override off**, leaving the Next.js default. Remove any previous `out` or `public` override. Do not configure Vercel to publish a static directory.
3. Set `NEXT_PUBLIC_SITE_URL` to the full production URL, e.g. `https://your-project.vercel.app`, with no trailing slash. This controls canonical metadata origins, sitemap, and robots URLs. Local development defaults to localhost.
4. Deploy. Future pushes rebuild the entire site, including newly added content. No secrets or backend configuration are needed.

The checked-in `vercel.json` explicitly selects `nextjs`, runs the production build, and resets `outputDirectory` to `null` so the framework default is used. Vercel handles `.next/` and its route manifests through the Next.js integration; do not upload `.next/` as ordinary static files. See [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build) and [project configuration](https://vercel.com/docs/project-configuration/vercel-json).

If an existing deployment is Ready but every route returns `404_NOT_FOUND`, check these settings in the Vercel project and any environment-specific overrides, then redeploy the corrected commit without the build cache. The previous README instructed Vercel to publish `out`; that instruction was for the former static export and conflicts with the current native build. Confirm the build log detects Next.js and lists the App Router routes (`/`, `/about`, `/devlog`, `/devlog/[slug]`, and `/resources`), and that the deployment output includes application routes. A prerendered/static route in the Next.js build summary is normal and does not mean the app uses static export.

## Quick content updates

### Game title and project copy

Edit `src/config/site.ts`: title, studio, tagline, description, course, university, engine, status, phase, themes, social links, and external URLs live here. The title is deliberately temporary. Keep descriptions of brainstorming ideas clearly provisional. Longer editorial copy lives in the relevant page components.

### Team

Edit `src/data/team.ts`. Replace the seven placeholder entries with real profiles, retaining five Technical and two Art disciplines as appropriate. Optional fields: `photo`, `biography`, `portfolio`, `github`, `linkedin`. Put photos in `public/images/team/` and use `/images/team/name.jpg`. Do not commit unapproved personal information.

### Devlogs

Add a file to `content/devlog/`; its filename becomes the slug. No route registration is required. The home page shows up to three latest posts, and the journal is sorted by date, newest first.

```mdx
---
title: "Your entry title"
date: "2026-10-22"
excerpt: "A brief, accurate summary."
tags: ["Design", "Preproduction"]
cover: "/images/devlog/your-image.jpg"
coverAlt: "Describe the image"
---

## Your heading

Write Markdown, lists, blockquotes, fenced code, and links here.

![Descriptive alt text](/images/devlog/your-image.jpg)

<VideoEmbed
  video={{
    id: "demo",
    title: "Prototype demonstration",
    description: "",
    youtubeId: "REAL_ID_HERE",
  }}
/>
```

`cover` and `coverAlt` are optional. Quote dates as shown. Use lowercase, hyphenated filenames. The existing entry is explicitly sample content; replace or remove it when publishing real updates. MDX is compiled only at build time. Invalid required frontmatter fails the build with a useful message.

### Resources

Edit `src/data/resources.ts`. The pages render these arrays automatically; no URL means an intentional Coming Soon state. Remove placeholder entries only when no longer useful. `id` values must be unique within each array.

- **Executable downloads:** add an entry to `builds` with `url`, `platform`, `version`, `date` (YYYY-MM-DD), optional `size`, `instructions`, and optional `releaseNotes`. Host large binaries on GitHub Releases or another download host; keep them out of this repository.
- **Videos:** set `youtubeId` to the 11-character YouTube ID, or `src` to a local `/videos/demo.mp4` URL. Optional `poster` supports local video. YouTube embeds use the privacy-enhanced domain, lazy loading, and no autoplay. Add captions to local video through the shared VideoEmbed component before publishing a video with speech.
- **Screenshots/concept art:** place files in `public/images/` and add entries to `images` with `id`, `src`, descriptive `alt`, actual `width` and `height`, and optional `caption`. The responsive gallery links to full images. It uses Next Image with unoptimized delivery; optimize large source assets before committing them.
- **Treatment document:** put the PDF in `public/documents/treatment.pdf`, then set the treatment entry's `url` to `/documents/treatment.pdf` and optionally `downloadUrl` to the same URL. Open and Download actions appear when configured.
- **Presentation slides:** add a PDF to `public/documents/` or use a public hosted presentation URL. Update the `beta-slides` entry, preserving `kind: 'Presentation'`.
- **Other artifacts:** add document entries with a title, description, kind, format, and URL. Local PDFs work through the browser's PDF viewer.

The required deliverables have explicit homes: team on About & Team; executables, beta demonstration video, treatment, beta slides, and additional artifacts on Resources.

## Design and perception effects

`src/app/globals.css` defines centralized tokens in `:root`. Override them under `html[data-perception=altered]` to change accents, portal glow, and patterns. Add future perception effects with that selector while keeping layout stable. The CSS-generated doorway is abstract decoration, not game artwork.

The header switch uses keyboard-native button interaction with switch semantics. A small inline head script reads `localStorage` before paint; subsequent switches update the root data attribute and persist the state. The root layout stays mounted across routes. Storage failure falls back gracefully. Reduced motion disables transitions and smooth scrolling.

Custom shadcn/ui Button source lives in `src/components/ui/button.tsx`; `components.json` configures aliases and tokens for future shadcn additions. Tailwind v4 is configured through the PostCSS plugin. Other reusable components are in `src/components/shared.tsx`.

## Metadata and assets

Page metadata and the generated sharing image read centralized config. `public/icon.svg` is the placeholder favicon. Set the production URL before deploying. `sitemap.xml` includes every devlog route and `robots.txt` links to it. No external fonts, stock imagery, tracking scripts, or remote services are required to render the site.

## Verification notes

After `npm run build`, run `node scripts/verify-build.mjs` to check native Next.js configuration, route manifests, primary prerendered routes, metadata routes, sample MDX rendering, internal links, and the pre-paint perception initializer with normal, altered, invalid, and blocked storage. This reads `.next/` and `public/`, never the obsolete `out/` directory. If you replace the sample post, update the sample-specific assertions in this script.

For a local production smoke check, run `npm start` after building and visit `/`, `/about/`, `/devlog/`, `/resources/`, and a devlog post. Visual checks at mobile/tablet/desktop sizes and keyboard interaction with the switch should be performed locally. Toggle a state, navigate to another page, then reload to check persistence.

`npm audit --omit=dev` reported zero vulnerabilities during implementation. The full audit reported five high-severity findings in the upstream ESLint/fast-glob/micromatch/braces development-tool chain; no patched braces release was available. These are development dependencies. Recheck upstream updates periodically; avoid the suggested forced Next.js ESLint downgrade.
