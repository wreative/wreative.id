# Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add conversion-focused `/jasa-pembuatan-website` and `/jasa-pembuatan-aplikasi` pages that explain Wreative's verified services and guide visitors to WhatsApp.

**Architecture:** Implement each route as a static Astro page using the existing shared header, footer, button, icon, stylesheet, and image assets. Add service-detail links to the current homepage service cards and list both routes in the manually maintained sitemap; avoid introducing a new abstraction or changing existing route behavior.

**Tech Stack:** Astro 7, Tailwind CSS 4, Node.js built-in test runner, Prettier.

---

### File structure

- Create `tests/service-pages.test.mjs` to verify the generated route content, metadata, primary CTA, cross-links, homepage entry points, and sitemap entries.
- Create `src/pages/jasa-pembuatan-website.astro` for the website service landing page.
- Create `src/pages/jasa-pembuatan-aplikasi.astro` for mobile and web application development.
- Modify `src/components/HomePage.astro` to associate each service card with its detail route.
- Modify `src/components/ServiceCard.astro` to render a detail link when its service has one.
- Modify `public/sitemap.xml` to make both canonical routes discoverable to search engines.

### Task 1: Add generated-site regression tests

**Files:**
- Create: `tests/service-pages.test.mjs`

- [ ] **Step 1: Write tests for both service routes**

Create `tests/service-pages.test.mjs` with the following content:

```js
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const websitePagePath = new URL('../dist/jasa-pembuatan-website/index.html', import.meta.url)
const applicationPagePath = new URL('../dist/jasa-pembuatan-aplikasi/index.html', import.meta.url)
const homePagePath = new URL('../dist/index.html', import.meta.url)
const sitemapPath = new URL('../dist/sitemap.xml', import.meta.url)

const readBuiltPage = (path, route) => {
  assert.ok(existsSync(path), `Expected the build to generate ${route}`)
  return readFileSync(path, 'utf8')
}

test('website service page has Indonesian content, metadata, and consultation CTA', () => {
  const html = readBuiltPage(websitePagePath, '/jasa-pembuatan-website')

  for (const expected of [
    '<html lang="id">',
    'https://wreative.id/jasa-pembuatan-website',
    'Jasa Pembuatan Website',
    'Company Profile',
    'Landing Page',
    'https://link.wreative.com/wa',
    'target="_blank"',
    'rel="noopener noreferrer"',
    'href="/jasa-pembuatan-aplikasi"',
  ]) {
    assert.ok(html.includes(expected), `Expected website page to include ${expected}`)
  }
})

test('application service page covers mobile and web apps with metadata and CTA', () => {
  const html = readBuiltPage(applicationPagePath, '/jasa-pembuatan-aplikasi')

  for (const expected of [
    '<html lang="id">',
    'https://wreative.id/jasa-pembuatan-aplikasi',
    'Jasa Pembuatan Aplikasi',
    'Android',
    'iOS',
    'Flutter',
    'SaaS',
    'ERP',
    'https://link.wreative.com/wa',
    'target="_blank"',
    'rel="noopener noreferrer"',
    'href="/jasa-pembuatan-website"',
  ]) {
    assert.ok(html.includes(expected), `Expected application page to include ${expected}`)
  }
})

test('homepage service cards link to both detail pages', () => {
  const html = readBuiltPage(homePagePath, '/')

  assert.ok(html.includes('href="/jasa-pembuatan-website"'))
  assert.ok(html.includes('href="/jasa-pembuatan-aplikasi"'))
  assert.ok(html.includes('href="#contact"'))
})

test('sitemap lists both service page canonical URLs', () => {
  assert.ok(existsSync(sitemapPath), 'Expected the build to copy the sitemap')
  const sitemap = readFileSync(sitemapPath, 'utf8')

  assert.ok(sitemap.includes('<loc>https://wreative.id/jasa-pembuatan-website</loc>'))
  assert.ok(sitemap.includes('<loc>https://wreative.id/jasa-pembuatan-aplikasi</loc>'))
})
```

- [ ] **Step 2: Run the tests before implementing the routes**

Run: `node --test tests/service-pages.test.mjs`

Expected: the tests fail because the two service routes and their links are not yet present in the generated build.

### Task 2: Implement the website development page

**Files:**
- Create: `src/pages/jasa-pembuatan-website.astro`

- [ ] **Step 1: Create the page shell and SEO metadata**

Import `Header` from `../components/Header.astro`, `Footer` from `../components/Footer.astro`, `Button` from `../components/Button.astro`, `Icon` from `../components/Icon.astro`, the existing `bangun-website.webp` asset, and `../index.css`.

Use these page-specific values:

```astro
const title = 'Jasa Pembuatan Website Profesional | Wreative'
const description =
  'Jasa pembuatan website profesional untuk bisnis: company profile, landing page, custom website, dan sistem internal yang cepat dan responsif.'
const canonical = 'https://wreative.id/jasa-pembuatan-website'
```

Render `<!doctype html>` with `<html lang="id">`, UTF-8 and viewport metadata, a `<title>`, description, canonical link, robots `index, follow`, and matching Open Graph type, URL, title, and description. Include the same Google Analytics ID (`G-P1RLZGG7G8`) used by the homepage and contact page.

- [ ] **Step 2: Add the conversion-first website content**

Use the shared `Header` and `Footer`, and render one semantic `<main>`. Start with a two-column responsive hero (`grid gap-12 lg:grid-cols-2`) with enough top padding for the fixed header. Use the `bangunWebsite` image as the visual preview with descriptive alt text. Use this hero copy:

```text
Eyebrow: Jasa Pembuatan Website
H1: Jasa Pembuatan Website Profesional untuk Bisnis Anda
Intro: Website yang cepat, responsif, dan sesuai kebutuhan bisnis, mulai dari company profile hingga sistem internal.
Primary CTA: Konsultasi via WhatsApp
```

Point the CTA to `https://link.wreative.com/wa` with `target="_blank"` and `rel="noopener noreferrer"`. Follow the hero with:

1. A benefits section using only existing claims: responsive design, fast performance, and SEO-friendly structure.
2. A scannable list of company profile, landing page, custom website, and internal system services.
3. A four-step process: diskusi kebutuhan, perencanaan dan UI/UX, development dan testing, launching.
4. An FAQ section covering project cost (scope-based consultation, no quoted amount), project timing (agreed after scope is defined; no fixed promise), SEO readiness, and post-launch maintenance.
5. A final consultation CTA and a link to `/jasa-pembuatan-aplikasi`.

Include `<script src="../scripts/main.js"></script>` before `</body>` so the shared mobile navigation and existing scroll interactions initialize on the new route. Use semantic headings in order and responsive Tailwind classes. Do not invent prices, delivery guarantees, or portfolio/customer claims.

- [ ] **Step 3: Run the Astro check and production build**

Run: `npm run build`

Expected: `astro check` and the static build pass, generating `dist/jasa-pembuatan-website/index.html`. The application-page test may still fail until Task 3 is complete.

### Task 3: Implement the mobile and web application page

**Files:**
- Create: `src/pages/jasa-pembuatan-aplikasi.astro`

- [ ] **Step 1: Create the page shell and SEO metadata**

Import `Header`, `Footer`, `Button`, `Icon`, the existing `mobile-app.webp` and `web-application.webp` image assets, and `../index.css`.

Use these page-specific values:

```astro
const title = 'Jasa Pembuatan Aplikasi Mobile & Web | Wreative'
const description =
  'Jasa pembuatan aplikasi Android, iOS, dan web application untuk membantu bisnis mengembangkan layanan dan mengotomatisasi proses.'
const canonical = 'https://wreative.id/jasa-pembuatan-aplikasi'
```

Render `<!doctype html>` with `<html lang="id">`, UTF-8 and viewport metadata, a `<title>`, description, canonical link, robots `index, follow`, and matching Open Graph type, URL, title, and description. Use the existing Google Analytics ID `G-P1RLZGG7G8`.

- [ ] **Step 2: Add the conversion-first application content**

Use the shared `Header` and `Footer`, and render one semantic `<main>`. Create the same responsive two-column hero layout as the website page, with a relevant mobile-app or web-application preview and descriptive alt text. Use this hero copy:

```text
Eyebrow: Jasa Pembuatan Aplikasi
H1: Jasa Pembuatan Aplikasi Mobile dan Web untuk Bisnis
Intro: Solusi aplikasi yang dibangun sesuai kebutuhan, dari aplikasi Android dan iOS hingga web application untuk mendukung proses bisnis.
Primary CTA: Diskusikan Proyek via WhatsApp
```

Point the CTA to `https://link.wreative.com/wa` with `target="_blank"` and `rel="noopener noreferrer"`. Follow the hero with:

1. A benefits section limited to existing claims: user-friendly interfaces, clean code, and maintenance support.
2. Distinct content groups for mobile apps (Android, iOS, Flutter, Play Store and App Store publishing) and web applications (dashboard, SaaS, ERP/CRM, and management systems).
3. A four-step process: diskusi kebutuhan, perencanaan dan UI/UX, development dan testing, launching.
4. An FAQ section covering supported platforms, technology choice based on needs, project cost based on scope, and maintenance after launch. Do not promise specific delivery times.
5. A final consultation CTA and a link to `/jasa-pembuatan-website`.

Include `<script src="../scripts/main.js"></script>` before `</body>` so the shared mobile navigation and existing scroll interactions initialize on the new route. Keep all statements within the project’s existing service claims. Use ordered semantic heading levels and responsive classes.

- [ ] **Step 3: Build both routes and run their regression tests**

Run: `npm run build && node --test tests/service-pages.test.mjs`

Expected: both routes are emitted; their headings, metadata, service descriptions, and WhatsApp CTA assertions pass. Assertions for homepage entry links and sitemap may remain failing until Task 4.

### Task 4: Connect the service pages to the existing site

**Files:**
- Modify: `src/components/HomePage.astro`
- Modify: `src/components/ServiceCard.astro`
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Add detail destinations to the existing service cards**

Add an optional `href?: string` and `linkLabel?: string` to the `service` shape in `ServiceCard.astro`. In `HomePage.astro`, set the `Website` service destination to `/jasa-pembuatan-website`; set both `Web Application` and `Mobile App` destinations to `/jasa-pembuatan-aplikasi`. Give them clear link labels such as `Pelajari layanan website` and `Pelajari layanan aplikasi`.

In `ServiceCard.astro`, import the existing `Button` component and render a secondary link button after the service description/items only when `service.href` is present:

```astro
{
  service.href && (
    <Button as="a" href={service.href} variant="outline" class="btn-micro-anim">
      {service.linkLabel}
    </Button>
  )
}
```

Keep existing service IDs, image rendering, list content, and homepage section anchors unchanged.

- [ ] **Step 2: Add both routes to the public sitemap**

In `public/sitemap.xml`, add a `<url>` entry for each service route, using the canonical URLs:

```xml
<url>
  <loc>https://wreative.id/jasa-pembuatan-website</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://wreative.id/jasa-pembuatan-aplikasi</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Preserve the existing homepage URL entry and valid sitemap XML structure.

- [ ] **Step 3: Build and verify routes, navigation, and sitemap**

Run:

```bash
npx prettier --check src/pages/jasa-pembuatan-website.astro src/pages/jasa-pembuatan-aplikasi.astro src/components/HomePage.astro src/components/ServiceCard.astro tests/service-pages.test.mjs
npm run build
node --test tests/contact-page.test.mjs tests/service-pages.test.mjs
```

Expected: Prettier succeeds; `astro check` and static build pass; all contact and service page tests pass; the homepage still contains `href="#contact"`; both service route URLs are in the built sitemap.

### Task 5: Review the final change set

**Files:**
- Review: all files listed in Tasks 1–4

- [ ] **Step 1: Check whitespace and scope**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the planned routes, service-card integration, sitemap entries, and service-page test are changed.

- [ ] **Step 2: Verify generated static pages**

Run:

```bash
test -f dist/jasa-pembuatan-website/index.html
test -f dist/jasa-pembuatan-aplikasi/index.html
grep -q '<loc>https://wreative.id/jasa-pembuatan-website</loc>' dist/sitemap.xml
grep -q '<loc>https://wreative.id/jasa-pembuatan-aplikasi</loc>' dist/sitemap.xml
```

Expected: all four checks exit with status 0.
