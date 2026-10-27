# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive `/contact` page that makes it easy to contact Wreative through WhatsApp.

**Architecture:** Create an Astro route that reuses the site's shared header and footer. Make shared section links route-aware so they continue to point to homepage sections from `/contact`, and direct the contact CTA to WhatsApp. Keep contact details static and use the existing social destinations and analytics ID.

**Tech Stack:** Astro 7, Tailwind CSS 4, existing Astro components and Google Analytics gtag.js.

---

### File structure

- Create `src/pages/contact.astro` for the page route, metadata, analytics tag, and contact content.
- Create `tests/contact-page.test.mjs` to assert the generated route, contact destinations, metadata, and preserved homepage anchor.
- Modify `src/components/Header.astro` so logo and homepage-section links work from `/contact`, and the consultation CTA opens WhatsApp from the contact page.
- Modify `src/components/Footer.astro` so homepage section links work from `/contact` and its Kontak link opens `/contact`.

### Task 1: Keep shared navigation working across routes

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Make header links route-aware**

In the frontmatter of `src/components/Header.astro`, add:

```astro
const isHomePage = Astro.url.pathname === '/'
const homeSectionHref = (id: string) => `${isHomePage ? '' : '/'}#${id}`
const consultationHref = isHomePage ? '#contact' : 'https://link.wreative.com/wa'
```

Use `homeSectionHref('home')` for the brand link and use these destinations for the existing navigation items: `homeSectionHref('services')`, `homeSectionHref('portfolio')`, `homeSectionHref('why-us')`, and `homeSectionHref('testimonials')`. Set both desktop and mobile consultation buttons to `consultationHref`. When `!isHomePage`, set `target="_blank"` and `rel="noopener noreferrer"` on those buttons; retain same-tab homepage-anchor behavior on `/`.

- [ ] **Step 2: Make footer links route-aware**

In `src/components/Footer.astro`, add:

```astro
const isHomePage = Astro.url.pathname === '/'
const homeSectionHref = (id: string) => `${isHomePage ? '' : '/'}#${id}`
```

Use `homeSectionHref('home')` for the footer brand link and use the helper for each homepage-section link. Change the Kontak link from `#contact` to `/contact`. Leave external portfolio, store, and social links unchanged.

- [ ] **Step 3: Run the Astro check and production build**

Run: `npm run build`

Expected: Astro check and static build complete without errors. This verifies both shared components compile before the route is added.

### Task 2: Add the `/contact` route

**Files:**
- Create: `src/pages/contact.astro`
- Create: `tests/contact-page.test.mjs`

- [ ] **Step 1: Write a failing generated-route regression test**

Use Node's built-in test runner to check `dist/contact/index.html` for the Indonesian document language, page title, canonical URL, Google Analytics measurement ID, WhatsApp URL, all three existing social URLs, a root-prefixed homepage section link, and the `/contact` footer link. Add a second test asserting that `dist/index.html` retains `href="#contact"`.

Run: `node --test tests/contact-page.test.mjs`

Expected before implementation: the contact-page test fails because `dist/contact/index.html` has not been generated; the homepage-anchor test passes.

- [ ] **Step 2: Create a page using the existing site shell**

Import `Header` from `../components/Header.astro`, `Footer` from `../components/Footer.astro`, and `../index.css`. Use an Indonesian document language, UTF-8 and viewport metadata, a page-specific title and description, and canonical URL `https://wreative.id/contact`.

Include the existing analytics scripts in the page head with measurement ID `G-P1RLZGG7G8`, matching the current homepage and 404 implementation.

Render `<Header />`, a semantic `<main>` with a single `<h1>`, and `<Footer />`. Add enough top padding for the fixed header and use a responsive two-column grid: the left side introduces the consultation; the right side is a visually distinct WhatsApp contact card. Stack the columns on small screens.

- [ ] **Step 3: Add the real contact actions**

Use `https://link.wreative.com/wa` as the primary link with `target="_blank"` and `rel="noopener noreferrer"`. Include secondary links only for the already-used LinkedIn (`https://www.linkedin.com/company/wreative`), Instagram (`https://www.instagram.com/wreative`), and TikTok (`https://www.tiktok.com/@wreative`) profiles. Do not add a form, email, physical address, or office hours.

- [ ] **Step 4: Run the regression test, formatting, and Astro check/build**

Run: `npx prettier --check src/pages/contact.astro src/components/Header.astro src/components/Footer.astro tests/contact-page.test.mjs && npm run build && node --test tests/contact-page.test.mjs`

Expected: Prettier reports all three files formatted; Astro check and build pass.

### Task 3: Verify the generated route and navigation

**Files:**
- Verify: `dist/contact/index.html`
- Verify: `dist/index.html`

- [ ] **Step 1: Confirm the generated contact route and metadata**

Run:

```bash
test -f dist/contact/index.html
grep -q 'https://wreative.id/contact' dist/contact/index.html
grep -q 'https://link.wreative.com/wa' dist/contact/index.html
grep -q 'G-P1RLZGG7G8' dist/contact/index.html
```

Expected: Each command exits with status 0.

- [ ] **Step 2: Confirm homepage behavior remains intact**

Run: `grep -q 'href="#contact"' dist/index.html`

Expected: The homepage still has its existing in-page consultation anchor.

- [ ] **Step 3: Review responsive layout and link behavior**

At narrow and wide viewport widths, confirm the two columns stack and expand as intended; verify header/footer section links navigate to homepage sections from `/contact`; verify the WhatsApp link opens in a new tab.
