import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root = path.resolve('out');
const routes = ['/', '/about/', '/devlog/', '/resources/', '/devlog/2026-10-21-project-kickoff/'];
for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing exported page ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /id="main"/, `Missing main landmark on ${route}`);
  assert.match(html, /role="switch"/, `Missing perception switch on ${route}`);
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)/g)) {
    if (href.startsWith('//')) continue;
    const target = path.join(root, decodeURIComponent(href));
    assert.ok(fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html')), `Broken local link ${href} on ${route}`);
  }
}
const article = fs.readFileSync(path.join(root, routes[4], 'index.html'), 'utf8');
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
console.log('Verified all primary pages, sample MDX content, exported internal links, and persisted-theme initialization (including blocked storage).');
