# Site-Wide Section Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-time reveal to every meaningful main-content section on Wreative's five public routes, including each route's second section.

**Architecture:** Reuse the existing `data-reveal` observer, shared timing tokens, and reduced-motion behavior. Add reveal markers to section headings and meaningful content groups, with short capped delays only on actual card/list sequences; preserve the homepage hero sequence and avoid changes to copy, layout, header, footer, and decorative-only elements.

**Tech Stack:** Astro 7, Tailwind CSS 4, plain CSS, browser `IntersectionObserver`, Node.js built-in test runner.

---

## File structure

- Modify `tests/design-motion.test.mjs` to assert that every rendered `<section>` on all five routes contains at least one reveal target.
- Modify `src/components/HomePage.astro` to reveal its section headings and content groups, including the services, portfolio, differentiators, workflow, testimonials, and FAQ sections.
- Modify `src/components/TestimonialSection.astro`, `src/components/ServiceCard.astro`, `src/components/ValuePoint.astro`, `src/components/TestimonialQuote.astro`, and `src/components/FAQItem.astro` to reveal repeated content consistently with short indexed delays.
- Modify `src/pages/jasa-pembuatan-website.astro` and `src/pages/jasa-pembuatan-aplikasi.astro` to reveal each section heading and pass stable indexes to repeated content.
- Modify `src/components/BenefitItem.astro`, `src/components/OfferingItem.astro`, and `src/components/ProcessStep.astro` to reveal service-benefit, offering, and process items.
- Leave `src/pages/contact.astro` and `src/pages/404.astro` unchanged if the coverage test confirms their existing sections already contain reveal targets.
- Leave `src/index.css` and `src/scripts/main.js` unchanged; their current observer, visible-without-JavaScript fallback, reduced-motion behavior, and 360ms delay cap already implement the approved motion system.
- Keep all PWA metadata, icon assets, service-worker behavior, copy, layout, `PRODUCT.md`, and `DESIGN.md` unchanged.

## Task 1: Add a failing rendered-section coverage test

**Files:**
- Modify: `tests/design-motion.test.mjs`

- [ ] **Step 1: Add a test for reveal coverage inside every rendered section**

Add this test after the existing all-public-routes test:

```js
test('every content section on every public route has a reveal target', () => {
  for (const route of routes) {
    const html = readFileSync(new URL(route, distPath), 'utf8')
    const sections = [...html.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(
      ([section]) => section,
    )

    assert.ok(sections.length > 0, `${route} has at least one section`)
    sections.forEach((section, index) => {
      assert.match(section, /\bdata-reveal(?:\s|=|>)/, `${route} section ${index + 1}`)
    })
  }
})
```

The five generated pages do not nest `<section>` elements, so each match corresponds to one page section. Contact and 404 already contain reveal targets; the homepage and service pages expose the missing coverage.

- [ ] **Step 2: Run the focused test against the current production output**

Run:

```bash
pnpm run build && node --test tests/design-motion.test.mjs
```

Expected: the build succeeds and the new test fails on the first uncovered homepage or service-page section, while the existing motion tests continue to pass.

## Task 2: Reveal homepage content groups

**Files:**
- Modify: `src/components/HomePage.astro`
- Modify: `src/components/ServiceCard.astro`
- Modify: `src/components/ValuePoint.astro`
- Modify: `src/components/TestimonialSection.astro`
- Modify: `src/components/TestimonialQuote.astro`
- Modify: `src/components/FAQItem.astro`

- [ ] **Step 1: Reveal homepage section headings and static content groups**

In `src/components/HomePage.astro`, keep the existing `#home` reveal targets and hero-image animations. For `#services`, add `data-reveal` to the existing `div.sticky.top-32` copy group. For `#portfolio` and `#why-us`, add `data-reveal` to each section's existing centered heading/description wrapper. For `#portfolio`, also add `data-reveal` and `data-reveal-delay="100"` to the outer `.group` element. For `#workflow`, add `data-reveal` to the existing sticky copy group and add a reveal delay to each mapped timeline-step wrapper:

```astro
{workflowSteps.map((step, index) => (
  <div data-reveal data-reveal-delay={index * 60} class="relative">
    <div class="absolute -left-[41px] lg:-left-[57px] top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center ring-4 ring-background">
      <div class="w-2 h-2 rounded-full bg-primary" />
    </div>
    <div class="text-sm font-bold text-primary mb-1 font-mono tabular-nums">{step.num}</div>
    <h3 class="text-xl mb-2">{step.title}</h3>
    <p class="text-muted-foreground">{step.desc}</p>
  </div>
))}
```

In the `#faq` section, add `data-reveal` to its existing centered heading/description wrapper. Do not nest new reveal targets inside an existing `[data-reveal]` element.

- [ ] **Step 2: Add bounded reveal delays to the reusable homepage list items**

In `src/components/ServiceCard.astro`, add `index: number` to `Props`, destructure it, and add `data-reveal` plus `data-reveal-delay={index * 60}` to the outer service `<div>`. In `HomePage.astro`, update `services.map` to accept `(service, index)` and pass `index` to `ServiceCard`.

In `src/components/ValuePoint.astro`, add `index: number` to `Props`, destructure it, and add `data-reveal` plus `data-reveal-delay={index * 60}` to its `<li>`. In `HomePage.astro`, update `whyUsPoints.map` to accept `(point, index)` and pass `index` to `ValuePoint`.

In `src/components/TestimonialQuote.astro`, add `index: number` to `Props`, destructure it, and add `data-reveal` plus `data-reveal-delay={index * 60}` to the `<article>`.

In `src/components/TestimonialSection.astro`, reveal the section's heading/content wrapper and pass the map index to `TestimonialQuote`:

```astro
{testimonials.map((testimonial, index) => (
  <TestimonialQuote {...testimonial} index={index} />
))}
```

- [ ] **Step 3: Reveal FAQ entries and pass their indexes**

In `src/components/FAQItem.astro`, add the required `index: number` prop and apply `data-reveal` and `data-reveal-delay={index * 60}` to the `<details>` element. Update the homepage FAQ map to pass `index` while preserving its existing `open={index === 0}` behavior.

- [ ] **Step 4: Run the focused coverage test**

Run:

```bash
pnpm run build && node --test tests/design-motion.test.mjs
```

Expected: the test still fails only for uncovered service-page sections; every homepage `<section>` now contains at least one reveal target.

## Task 3: Reveal both service pages, including their second sections

**Files:**
- Modify: `src/pages/jasa-pembuatan-website.astro`
- Modify: `src/pages/jasa-pembuatan-aplikasi.astro`
- Modify: `src/components/BenefitItem.astro`
- Modify: `src/components/OfferingItem.astro`
- Modify: `src/components/ProcessStep.astro`
- Modify: `src/components/FAQItem.astro`

- [ ] **Step 1: Reveal the content groups in each service section**

In both service pages, keep the existing hero and final CTA reveal targets. In the website-service page, add `data-reveal` to the `#layanan` heading and adjacent descriptive paragraph, to the process-section heading/paragraph wrapper, and to the FAQ heading/paragraph wrapper. In the application-service page, add `data-reveal` to the `#jenis-aplikasi` heading and adjacent descriptive paragraph, to both capability `<article>` elements, to the process-section heading/paragraph wrapper, and to the FAQ heading/paragraph wrapper. The second section on each route is the benefits band; its rendered `BenefitItem` entries receive reveal targets in Step 2, not the decorative borders or the whole section container.

- [ ] **Step 2: Reveal benefit and process list items**

In `src/components/BenefitItem.astro`, preserve the existing `index` prop and add `data-reveal` plus `data-reveal-delay={index * 60}` to its `<article>`.

In `src/components/ProcessStep.astro`, preserve the existing `index` prop and add `data-reveal` plus `data-reveal-delay={index * 60}` to its `<li>`.

- [ ] **Step 3: Add index-based reveals to service offerings**

In `src/components/OfferingItem.astro`, add a required `index: number` prop, destructure it, and add `data-reveal` plus `data-reveal-delay={index * 60}` to the outer `<article>`. In `jasa-pembuatan-website.astro`, pass `index` from the existing offerings map:

```astro
{offerings.map((offering, index) => <OfferingItem {...offering} index={index} />)}
```

- [ ] **Step 4: Pass stable indexes to FAQ entries on both service pages**

Update each service-page FAQ map to include `index` and pass it to `FAQItem`, preserving the existing question and answer props:

```astro
{faqs.map((faq, index) => (
  <FAQItem question={faq.question} answer={faq.answer} index={index} />
))}
```

- [ ] **Step 5: Run the focused coverage test**

Run:

```bash
pnpm run build && node --test tests/design-motion.test.mjs
```

Expected: all public routes pass the rendered-section reveal coverage assertion and all existing design-motion assertions pass.

## Task 4: Verify production output and motion behavior

**Files:**
- Verify: all files listed above
- Verify: all five generated routes and existing tests

- [ ] **Step 1: Run every production-output test**

Run:

```bash
pnpm run build && node --test tests/*.test.mjs
```

Expected: Astro checks and the production build succeed; all route, design-motion, contact, service-page, and PWA/icon tests pass.

- [ ] **Step 2: Check formatting and whitespace**

Run:

```bash
pnpm exec prettier --check tests/design-motion.test.mjs src/components/HomePage.astro src/components/ServiceCard.astro src/components/ValuePoint.astro src/components/TestimonialSection.astro src/components/TestimonialQuote.astro src/components/FAQItem.astro src/components/BenefitItem.astro src/components/OfferingItem.astro src/components/ProcessStep.astro src/pages/jasa-pembuatan-website.astro src/pages/jasa-pembuatan-aplikasi.astro
git diff --check
```

Expected: Prettier reports all modified files formatted and `git diff --check` reports no whitespace errors.

- [ ] **Step 3: Inspect all public routes at desktop and mobile widths in one pass**

Run `pnpm run dev` and inspect `/`, `/jasa-pembuatan-website`, `/jasa-pembuatan-aplikasi`, `/contact`, and `/404.html` at 1440px and 375px. Confirm each meaningful section, especially each route's second section, reveals once as it enters view; list delays remain brief; the hero sequence is unchanged; and no horizontal overflow or content clipping appears.

- [ ] **Step 4: Verify reduced-motion and no-JavaScript fallbacks**

With reduced motion enabled, confirm all section content is immediately visible without spatial reveal movement and existing non-spatial state feedback remains available. With JavaScript disabled, confirm all content remains visible. Stop the development server after verification.

## Self-review against the approved spec

- **Coverage:** The test checks each rendered section on all five routes, including the second section on each route.
- **Motion thesis:** Reuses one-time reveals and existing timings; only repeated list/card content receives indexed delay, and the observer caps delays at 360ms.
- **Accessibility/resilience:** The existing CSS and script preserve visible content without JavaScript and remove spatial motion for reduced-motion users.
- **Budget:** No dependency, route transitions, loops, parallax, or layout-driving animation is added.
- **Validation:** Runs focused and full production tests, formatting/whitespace checks, and one bounded desktop/mobile/reduced-motion visual pass.
