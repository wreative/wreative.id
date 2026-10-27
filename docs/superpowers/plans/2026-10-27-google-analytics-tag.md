# Google Analytics Tag Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Google tag `G-P1RLZGG7G8` on the homepage and custom 404 page.

**Architecture:** Add Google's standard asynchronous `gtag.js` loader and initialization directly to each page's existing `<head>`. Keep the pages independent; do not introduce a shared layout, package, or consent flow.

**Tech Stack:** Astro static output, Node.js validation, pnpm scripts.

---

### Task 1: Add the Google tag to both documents

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/404.astro`

- [ ] **Step 1: Confirm the generated-page check fails before the change**

Run:

```bash
node --input-type=module -e 'import { readFileSync } from "node:fs"; for (const file of ["dist/index.html", "dist/404.html"]) { const html = readFileSync(file, "utf8"); const count = (html.match(/G-P1RLZGG7G8/g) ?? []).length; if (count !== 2) throw new Error(`${file}: expected 2 measurement ID occurrences, found ${count}`); }'
```

Expected: FAIL because the tag has not yet been added.

- [ ] **Step 2: Add the standard Google tag inside the homepage `<head>`**

Add after the existing `<meta charset="UTF-8" />`:

```astro
    <!-- Google tag (gtag.js) -->
    <script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-P1RLZGG7G8"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'G-P1RLZGG7G8')
    </script>
```

- [ ] **Step 3: Add the same Google tag inside the 404 page `<head>`**

Add after the existing `<meta charset="UTF-8" />` in `src/pages/404.astro`:

```astro
    <!-- Google tag (gtag.js) -->
    <script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-P1RLZGG7G8"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'G-P1RLZGG7G8')
    </script>
```

- [ ] **Step 4: Run the Astro build and checks**

Run: `pnpm run build`

Expected: Astro checks and the static build complete successfully.

- [ ] **Step 5: Verify the generated homepage and 404 page**

Run the Node.js command from Step 1 again.

Expected: exit code 0; each generated page contains exactly two occurrences of the measurement ID, one in the loader URL and one in the configuration.
