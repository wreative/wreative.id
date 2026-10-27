# Site-Wide Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align motion across Wreative's five public pages with a restrained system for hierarchy, continuity, and interaction feedback.

**Architecture:** Reuse the current CSS timing tokens, scroll-reveal observer, `data-reveal` markers, and header/menu state classes. Normalize transitions in the shared stylesheet and mobile header markup, then make reduced-motion behavior remove spatial movement without globally collapsing meaningful color/opacity feedback. Leave PWA metadata, assets, copy, and page structure unchanged.

**Tech Stack:** Astro 7, Tailwind CSS 4, plain CSS, browser ES modules, Node.js built-in test runner.

---

## File structure

- Modify `tests/design-motion.test.mjs` to assert the shared motion timings, drawer transitions, and reduced-motion behavior using the existing Node test pattern.
- Modify `src/index.css` to use the existing motion tokens for shared state transitions and provide targeted reduced-motion overrides.
- Modify `src/components/Header.astro` to remove conflicting hard-coded transition utilities where the shared stylesheet owns timing.
- Keep `src/scripts/main.js` unchanged: it already reveals content once with `IntersectionObserver`, caps delay at 360ms, and does not hide content unless the observer is available and motion is allowed.
- Keep page-level `data-reveal` attributes, `DESIGN.md`, and all PWA/icon files unchanged; their current behavior and documented motion values already match the approved design.

## Task 1: Add failing motion-system assertions

**Files:**
- Modify: `tests/design-motion.test.mjs`

- [ ] **Step 1: Add a source-CSS motion contract test**

Add this test after the existing reduced-motion test in `tests/design-motion.test.mjs`:

```js
test('motion transitions use shared timings and reduce spatial movement only', () => {
  const sourceCss = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

  assert.match(sourceCss, /--motion-quick:\s*140ms/)
  assert.match(sourceCss, /--motion-standard:\s*240ms/)
  assert.match(sourceCss, /--motion-emphasis:\s*620ms/)
  assert.match(
    sourceCss,
    /\[data-header\]\s*\{[^}]*background-color var\(--motion-quick\)[^}]*border-color var\(--motion-quick\)/s,
  )
  assert.match(
    sourceCss,
    /\[data-nav-link\]\s*\{[^}]*transition:\s*color var\(--motion-quick\) ease-out;/s,
  )
  assert.match(
    sourceCss,
    /\[data-menu\]\s*\{\s*transition:\s*translate var\(--motion-standard\) var\(--ease-out\);\s*\}/,
  )
  assert.match(
    sourceCss,
    /\[data-menu-overlay\]\s*\{[^}]*transition:\s*opacity var\(--motion-standard\) ease-out;/s,
  )
  assert.match(
    sourceCss,
    /html\[data-motion-ready\]\s+\[data-reveal\]:not\(\.is-visible\)\s*\{[^}]*opacity:\s*1;[^}]*transform:\s*none;[^}]*transition:\s*none;/s,
  )
  assert.match(sourceCss, /\.btn-micro-anim:hover,\s*\.btn-micro-anim:active\s*\{[^}]*transform:\s*none;/s)
  assert.match(
    sourceCss,
    /\[data-hero-visual\]\s*\{[^}]*animation:\s*none !important;[^}]*clip-path:\s*none;[^}]*transform:\s*none;/s,
  )
  assert.doesNotMatch(sourceCss, /transition-duration:\s*1ms !important/)
})
```

- [ ] **Step 2: Run the focused test against the current source**

Run:

```bash
pnpm run build && node --test tests/design-motion.test.mjs
```

Expected: the build succeeds; the focused test fails because the drawer and overlay do not use shared timing tokens and reduced motion currently applies a blanket 1ms transition override.

## Task 2: Normalize shared transitions and reduced-motion behavior

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Remove transition utilities that conflict with shared CSS**

In `src/components/Header.astro`, remove only these utility classes:

```diff
-  class="fixed top-0 w-full z-50 border-b bg-transparent border-transparent py-5 transition-colors duration-200"
+  class="fixed top-0 w-full z-50 border-b bg-transparent border-transparent py-5"
```

```diff
-            class="text-sm font-medium transition-colors duration-150 relative py-1 text-muted-foreground hover:text-primary"
+            class="text-sm font-medium relative py-1 text-muted-foreground hover:text-primary"
```

```diff
-  class="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,100vw)] translate-x-full flex-col border-l border-border bg-background p-6 transition-transform duration-300"
+  class="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,100vw)] translate-x-full flex-col border-l border-border bg-background p-6"
```

Keep the positioning, color, and initial off-canvas classes unchanged.

- [ ] **Step 2: Define token-based transitions for header, navigation, and menu**

In `src/index.css`, add the `[data-header]` rule and the transition declaration to the existing `[data-nav-link]` rule. Add a `[data-menu]` transition next to its existing open-state rule, and replace the menu-overlay timing with:

```css
[data-header] {
  transition:
    background-color var(--motion-quick) ease-out,
    border-color var(--motion-quick) ease-out;
}

[data-nav-link] {
  position: relative;
  transition: color var(--motion-quick) ease-out;
}

[data-menu] {
  transition: translate var(--motion-standard) var(--ease-out);
}

[data-menu-overlay] {
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--motion-standard) ease-out;
}
```

Preserve the existing `[data-header].is-scrolled`, `[data-nav-link].is-active`, `[data-menu].is-open`, and `[data-menu-overlay].is-open` state rules. Do not transition header padding or other layout-driving properties.

- [ ] **Step 3: Replace blanket reduced-motion overrides with targeted rules**

Replace the current `@media (prefers-reduced-motion: reduce)` block in `src/index.css` with:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }

  html[data-motion-ready] [data-reveal]:not(.is-visible) {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .btn-micro-anim:hover,
  .btn-micro-anim:active {
    transform: none;
  }

  [data-menu] {
    transition-duration: 1ms;
  }

  [data-hero-visual] {
    animation: none !important;
    clip-path: none;
    opacity: 1;
    transform: none;
  }
}
```

Do not add a universal `animation-duration` or `transition-duration` reset. Keep the menu overlay's opacity transition and unrelated color/state feedback available to users who prefer reduced motion.

- [ ] **Step 4: Run the focused regression test**

Run:

```bash
pnpm run build && node --test tests/design-motion.test.mjs
```

Expected: build succeeds and all design-motion tests pass.

- [ ] **Step 5: Format and commit the focused motion change**

Run:

```bash
pnpm exec prettier --write src/index.css src/components/Header.astro tests/design-motion.test.mjs
git diff --check
git add src/index.css src/components/Header.astro tests/design-motion.test.mjs
git commit -m "fix: align site motion with design system" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: formatting and whitespace checks succeed; the commit contains only the shared motion CSS, header utility cleanup, and motion assertions.

## Task 3: Verify production output and browser behavior

**Files:**
- Verify: `src/index.css`
- Verify: `src/components/Header.astro`
- Verify: all five generated routes and existing tests

- [ ] **Step 1: Run every production-output test**

Run:

```bash
pnpm run build && node --test tests/*.test.mjs
```

Expected: Astro checks and the production build succeed; all contact, service-page, PWA/icon, and design-motion tests pass.

- [ ] **Step 2: Check formatting and whitespace**

Run:

```bash
pnpm exec prettier --check src/index.css src/components/Header.astro tests/design-motion.test.mjs
git diff --check
```

Expected: Prettier reports all three files formatted and `git diff --check` reports no whitespace errors.

- [ ] **Step 3: Inspect desktop, mobile, reduced-motion, and no-JavaScript behavior once**

Run `pnpm run dev`, then inspect the homepage (`/`), contact page (`/contact`), website service page (`/jasa-pembuatan-website`), application service page (`/jasa-pembuatan-aplikasi`), and 404 page (`/404.html`) at desktop width (1440px) and mobile width (375px). Confirm the hero panels play once, content reveals once, the header/menu transitions feel responsive, and no horizontal overflow appears.

With JavaScript disabled, confirm revealed content stays visible. Then enable the browser's reduced-motion preference and confirm page content is immediately visible, the hero has no spatial entrance, buttons do not move on hover/press, the mobile menu still opens/closes, and the overlay and focus/state cues remain perceivable. Also check keyboard open/close via the menu button, Escape, and a navigation link. Stop the dev server after verification.

## Self-review against the approved spec

- **Scope:** Covers all five routes through the shared stylesheet and header component; keeps copy, page layout, PWA metadata, and assets unchanged.
- **Motion thesis:** Preserves the 620ms hero sequence, existing one-time reveals, 140ms control feedback, 240ms state transitions, and 360ms reveal-delay cap.
- **Accessibility/resilience:** Tests reduced-motion CSS, removes spatial movement for the hero/button/reveal paths, keeps overlay opacity feedback, and preserves visible content when the observer is unavailable.
- **Budget:** Adds no dependency, route transitions, loops, parallax, or layout-property transitions.
- **Validation:** Runs focused and full production tests, formatting/whitespace checks, and desktop/mobile/reduced-motion/keyboard verification.
