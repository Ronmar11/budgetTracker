// Pre-render each page to static HTML after `vite build`, so crawlers that don't run
// JavaScript (Google's OAuth brand verification, link previews, search engines) see the
// full content and links. The browser then hydrates the same markup.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = resolve(import.meta.dirname, '..');
const PAGES = [
  { html: 'index.html', module: '/src/pages/Landing.tsx', component: 'LandingPage' },
  { html: 'privacy.html', module: '/src/pages/Privacy.tsx', component: 'PrivacyPage' },
  { html: 'terms.html', module: '/src/pages/Terms.tsx', component: 'TermsPage' },
];
const MARKER = '<div id="root"></div>';

const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  for (const page of PAGES) {
    const mod = await vite.ssrLoadModule(page.module);
    const markup = renderToString(createElement(StrictMode, null, createElement(mod[page.component])));
    const file = resolve(root, 'dist', page.html);
    const html = await readFile(file, 'utf8');
    if (!html.includes(MARKER)) throw new Error(`${page.html}: ${MARKER} not found`);
    await writeFile(file, html.replace(MARKER, `<div id="root">${markup}</div>`));
    console.log(`prerendered ${page.html} (${(markup.length / 1024).toFixed(1)} kB)`);
  }
} finally {
  await vite.close();
}
