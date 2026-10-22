import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root = path.resolve('.next/server/app');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const config = readJson('.next/required-server-files.json').config;
assert.ok(!config.output, 'Expected a native Next.js build with default output');
const vercel = readJson('vercel.json');
assert.equal(vercel.framework, 'nextjs');
assert.equal(vercel.outputDirectory, null);
const appPaths = readJson('.next/server/app-paths-manifest.json');
for (const route of ['/page', '/about/page', '/devlog/page', '/devlog/[slug]/page', '/resources/page', '/robots.txt/route', '/sitemap.xml/route', '/opengraph-image/route']) {
  assert.ok(appPaths[route], `Missing App Router entry ${route}`);
  assert.ok(fs.existsSync(path.resolve('.next/server', appPaths[route])), `Missing compiled route ${route}`);
}
const prerender = readJson('.next/prerender-manifest.json');
const normalize = route => route.replace(/\/$/, '') || '/';
const pageFile = route => path.join(root, route === '/' ? 'index.html' : `${normalize(route)}.html`);
const routes = ['/', '/about/', '/devlog/', '/resources/', '/devlog/2026-10-21-project-kickoff/'];
for (const route of routes) {
  assert.ok(prerender.routes[normalize(route)], `Missing prerendered route ${route}`);
  const file = pageFile(route);
  assert.ok(fs.existsSync(file), `Missing prerendered page ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /id="main"/, `Missing main landmark on ${route}`);
  assert.match(html, /role="switch"/, `Missing perception switch on ${route}`);
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)/g)) {
    if (href.startsWith('//')) continue;
    const target = decodeURIComponent(href);
    const exists = target.startsWith('/_next/')
      ? fs.existsSync(path.join('.next', target.slice('/_next/'.length)))
      : fs.existsSync(path.join('public', target)) || Object.hasOwn(prerender.routes, normalize(target));
    assert.ok(exists, `Broken local link ${href} on ${route}`);
  }
}
const article = fs.readFileSync(pageFile(routes[4]), 'utf8');
assert.match(article, /Questions we are exploring/);
assert.match(article, /sample development entry/);
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const initializer = [...home.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]).find(script => script.includes("localStorage.getItem('perception')"));
assert.ok(initializer, 'Missing pre-paint theme initializer');
for (const [stored, expected] of [[null, 'normal'], ['normal', 'normal'], ['altered', 'altered'], ['invalid', 'normal']]) {
  const document = { documentElement: { dataset: {} } };
  vm.runInNewContext(initializer, { document, localStorage: { getItem: () => stored } });
  assert.equal(document.documentElement.dataset.perception, expected);
}
vm.runInNewContext(initializer, { document: { documentElement: { dataset: {} } }, localStorage: { getItem() { throw new Error('Storage blocked'); } } });
console.log('Verified native Next.js configuration, compiled App Router entries, prerendered pages, sample MDX content, internal links, and persisted-theme initialization (including blocked storage).');
