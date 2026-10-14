// Writes dist/client/sitemap.xml from the pre-rendered pages (runs after `vite build`).

import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE_URL = 'https://mya-ink.nl';
const ROOT = 'dist/client';
const EXCLUDE = ['/slideshow/'];

function findPages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return name === 'assets' ? [] : findPages(path);
    }
    return name === 'index.html' ? [path] : [];
  });
}

const urls = findPages(ROOT)
  .map((file) => '/' + relative(ROOT, file).replace(/index\.html$/, ''))
  .filter((path) => !EXCLUDE.includes(path))
  .sort((a, b) => a.length - b.length || a.localeCompare(b));

const lastmod = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;

writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
