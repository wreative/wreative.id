# Upgrade Astro → v7, keep PWA, clean lint/knip, add Prettier

## Goal

Upgrade `astro` from 5.x → 7.x (latest), keep the `@vite-pwa/astro` service worker working, make `pnpm run lint` and `pnpm run knip` pass with zero errors, and add Prettier for formatting.

## Current state (verified)

- `astro@5.18.2`, `@astrojs/react@4`, `@astrojs/tailwind@6`, Tailwind **v3**, `@vite-pwa/astro@1.2.0`.
- Installed with **npm** (`package-lock.json` present, no `pnpm-lock.yaml`). Target: switch to **pnpm**.
- `pnpm run lint` → 3 errors, all `import/no-unresolved` in **unused** files:
  - `src/components/ui/form.jsx` → `react-hook-form`
  - `src/components/ui/label.jsx` → `@radix-ui/react-label`
  - `src/components/ui/toggle.jsx` → `@radix-ui/react-toggle`
- `pnpm run knip` → 15 unused files (10 dead `src/components/ui/*.jsx`, plus `.agents/` and `.remember/` tool dirs), 3 unused deps, 7 unused exports.
- PWA currently produces `dist/sw.js`, `dist/registerSW.js`, `dist/workbox-*.js`, and a single `<script src="/registerSW.js">` in `dist/index.html`.

## Key decisions

1. **Tailwind v3 → v4** via `@tailwindcss/vite`. `@astrojs/tailwind@6` declares peer `astro ^3||^4||^5` only, so it is incompatible with Astro 7. Tailwind v4 is the official, peer-clean path.
2. **Keep `@vite-pwa/astro@1.2.0`** and allow the stale `astro` peer via pnpm `peerDependencyRules`. Its underlying `vite-plugin-pwa@1.3.0` supports Vite 8 (Astro 7's Vite), and the integration only uses stable Astro hooks (`astro:config:setup`, `astro:build:done`).
3. **Delete the 10 dead UI components** rather than ignore them — this fixes both the lint errors and the knip "unused files"/"unused deps" in one move.

---

## Task 1 — Rewrite `package.json`, switch to pnpm, install

### Step 1: Replace `package.json` with the following

```json
{
  "name": "web",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev --host --port 3000",
    "build": "astro build",
    "preview": "astro preview --host --port 3000",
    "start": "astro preview --host --port 3000",
    "lint": "eslint . --quiet",
    "lint:warn": "eslint .",
    "knip": "knip",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "@astrojs/react": "^6.0.2",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-slot": "^1.2.4",
    "astro": "^7.2.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/node": "^20.19.43",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vite-pwa/astro": "^1.2.0",
    "eslint": "^9.39.4",
    "eslint-import-resolver-alias": "^1.1.2",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.1.0",
    "globals": "^15.14.0",
    "knip": "^6.32.2",
    "prettier": "^3.9.6",
    "prettier-plugin-astro": "^0.14.1",
    "tailwindcss": "^4.3.3",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5.9.3"
  },
  "pnpm": {
    "peerDependencyRules": {
      "allowedVersions": {
        "astro": "7"
      }
    }
  }
}
```

What changed and why:

| Package                                                                          | Change               | Reason                                                                         |
| -------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------ |
| `astro`                                                                          | `^5.16.0` → `^7.2.2` | the upgrade                                                                    |
| `@astrojs/react`                                                                 | `^4.3.0` → `^6.0.2`  | Astro 7-compatible integration (no `astro` peer)                               |
| `@astrojs/tailwind`                                                              | removed              | peer `astro ^5` only; superseded by `@tailwindcss/vite`                        |
| `tailwindcss`                                                                    | `^3.4.17` → `^4.3.3` | Tailwind v4 migration                                                          |
| `tailwindcss-animate`                                                            | → `tw-animate-css`   | v4 replacement for the `animate-in`/`slide-in-*` utilities used in `sheet.jsx` |
| `postcss`, `autoprefixer`                                                        | removed              | no longer needed with `@tailwindcss/vite`                                      |
| `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-tooltip` | removed              | only imported by dead UI files removed in Task 4                               |
| `prettier`, `prettier-plugin-astro`                                              | added                | formatting (`.astro` support)                                                  |
| `@tailwindcss/vite`                                                              | added                | Tailwind v4 Vite plugin                                                        |
| `pnpm.peerDependencyRules.allowedVersions.astro = "7"`                           | added                | lets `@vite-pwa/astro@1.2.0` (peer `astro ^5`) install cleanly against astro 7 |

Note: `@radix-ui/react-dialog` is **kept** — `sheet.jsx` imports it directly.

### Step 2: Remove npm artifacts and install with pnpm

```bash
rm -rf node_modules package-lock.json
pnpm install
```

Expected: creates `pnpm-lock.yaml`, installs cleanly with no peer-dep warnings.

If pnpm prints "Ignored build scripts for: …" and any dependency genuinely needs a postinstall (esbuild/lightningcss/solid), run `pnpm approve-builds` and re-install. Astro 7 + Tailwind v4 normally need none (they ship prebuilt platform binaries as optional deps).

### Verify

- `pnpm-lock.yaml` exists, `package-lock.json` is gone.
- `pnpm install` exits 0 with no "peer dependency" warnings.

---

## Task 2 — Migrate Tailwind v3 → v4 in `src/index.css`

### Step 1: Replace the entire contents of `src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: 0 0% 100%;
  --foreground: 221 17% 22%;

  --primary: 221 23% 29%;
  --primary-foreground: 0 0% 100%;

  --secondary: 213 22% 96%;
  --secondary-foreground: 221 17% 22%;

  --muted: 213 22% 96%;
  --muted-foreground: 221 10% 50%;

  --accent: 213 22% 96%;
  --accent-foreground: 221 23% 29%;

  --card: 0 0% 100%;
  --card-foreground: 221 17% 22%;

  --popover: 0 0% 100%;
  --popover-foreground: 221 17% 22%;

  --border: 213 22% 90%;
  --input: 213 22% 90%;
  --ring: 221 23% 29%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --radius: 0.25rem;
}

.dark {
  --background: 221 17% 15%;
  --foreground: 213 22% 90%;
  --primary: 213 22% 90%;
  --primary-foreground: 221 23% 29%;
  --secondary: 221 17% 22%;
  --secondary-foreground: 213 22% 90%;
  --muted: 221 17% 22%;
  --muted-foreground: 213 20% 65%;
  --accent: 221 17% 25%;
  --accent-foreground: 213 22% 90%;
  --card: 221 17% 18%;
  --card-foreground: 213 22% 90%;
  --popover: 221 17% 18%;
  --popover-foreground: 213 22% 90%;
  --border: 221 17% 25%;
  --input: 221 17% 25%;
  --ring: 213 22% 90%;
}

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
    font-weight: 700;
    color: inherit;
  }

  h1 {
    font-size: 3.5rem;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }
  h2 {
    font-size: 2.5rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  h3 {
    font-size: 1.5rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  p,
  li {
    font-size: 1rem;
    line-height: 1.625;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.25rem;
    }
  }
}

@layer utilities {
  .container-custom {
    @apply max-w-7xl mx-auto px-6 lg:px-8;
  }

  .section-padding {
    @apply py-24;
  }

  .text-balance {
    text-wrap: balance;
  }

  .premium-shadow {
    box-shadow: 0 4px 24px -2px rgba(47, 53, 66, 0.04);
  }

  .premium-shadow-hover {
    box-shadow: 0 12px 32px -4px rgba(47, 53, 66, 0.08);
  }

  /* Button Micro-animations */
  .btn-micro-anim {
    @apply transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] hover:shadow-md;
  }

  /* Premium Brand Text Styling */
  .brand-text-premium {
    background: linear-gradient(to right, #3a455c, #2f3542);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.05em;
    font-weight: 800;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    transition: filter 200ms ease-out;
  }

  .brand-text-premium:hover {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  }
}

/* Custom Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 400ms ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 400ms ease-out forwards;
}

.animate-stagger-item {
  opacity: 0;
  animation: fadeInUp 400ms ease-out forwards;
}
```

Migration notes (v3 → v4):

- `@tailwind base; @tailwind components; @tailwind utilities;` → `@import 'tailwindcss';`
- `plugins: [require('tailwindcss-animate')]` → `@import 'tw-animate-css';` (powers `data-[state=open]:animate-in`, `slide-in-from-right`, `fade-in-0`, etc. used in `sheet.jsx`)
- `darkMode: ["class"]` → `@custom-variant dark (&:is(.dark *));`
- The `colors` map in the old `tailwind.config.js` (`background: "hsl(var(--background))"`, etc.) → the `@theme inline` block. `inline` is required so `--background` overrides in `.dark` cascade into the generated utilities.
- `borderRadius` → `--radius-*` in `@theme inline`.
- Dropped dead config that had no consumers: `sidebar` colors and the `accordion-down`/`accordion-up` keyframes/animations (no accordion component exists).

### Step 2: Delete the now-obsolete config files

```bash
rm tailwind.config.js
rm postcss.config.js
```

`tailwind.config.js` is obsolete under Tailwind v4 (CSS-first). `postcss.config.js` is obsolete because `@tailwindcss/vite` handles PostCSS internally; leaving it would inject the removed v3 `tailwindcss` postcss plugin and break the build.

---

## Task 3 — Update `astro.config.mjs`

Replace `import tailwind from '@astrojs/tailwind'` and the `tailwind(...)` integration with the `@tailwindcss/vite` plugin. Full new file:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  site: 'https://wreative.id',
  output: 'static',
  integrations: [
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      includeAssets: [
        'icons/favicon-16x16.png',
        'icons/favicon-32x32.png',
        'icons/apple-touch-icon.png',
      ],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
```

The `AstroPWA` block and everything else is unchanged.

---

## Task 4 — Delete dead UI components and trim unused exports

### Step 1: Delete 10 unused files

```bash
rm src/components/ui/dialog.jsx \
   src/components/ui/form.jsx \
   src/components/ui/input.jsx \
   src/components/ui/label.jsx \
   src/components/ui/select.jsx \
   src/components/ui/separator.jsx \
   src/components/ui/skeleton.jsx \
   src/components/ui/textarea.jsx \
   src/components/ui/toggle.jsx \
   src/components/ui/tooltip.jsx
```

These are imported by nothing (knip "unused files"). Deleting them also removes the 3 lint errors (`react-hook-form`, `@radix-ui/react-label`, `@radix-ui/react-toggle` were only referenced here) and the 3 unused deps removed in Task 1.

### Step 2: Trim unused exports in `src/components/ui/button.jsx`

Change the final line from:

```js
export { Button, buttonVariants }
```

to:

```js
export { Button }
```

`buttonVariants` stays defined (used internally by `Button`), it is just no longer exported.

### Step 3: Trim unused exports in `src/components/ui/sheet.jsx`

Delete the four unused definitions — `SheetClose` (line 13), `SheetHeader`, `SheetFooter`, `SheetDescription` — and the two internal-only ones `SheetPortal`, `SheetOverlay` from the export list. Concretely:

1. Delete the line `const SheetClose = SheetPrimitive.Close`.
2. Delete the entire `SheetHeader`, `SheetFooter`, and `SheetDescription` component definitions.
3. Replace the export block with only the names used by `src/components/Header.jsx` (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetTitle`):

```js
export { Sheet, SheetTrigger, SheetContent, SheetTitle }
```

Keep `SheetPortal` and `SheetOverlay` **definitions** (they are rendered inside `SheetContent`), just remove them from the export list.

---

## Task 5 — Configure `knip.json`

Replace `knip.json` with:

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "ignore": [
    ".agents/**",
    ".remember/**",
    ".astro/**",
    ".claude/**",
    ".junie/**",
    ".superpowers/**"
  ],
  "tags": ["-lintignore"]
}
```

The `ignore` array silences the `.agents/` and `.remember/` tool dirs (the only remaining "unused files" after Task 4).

---

## Task 6 — Add Prettier config and format

### Step 1: Create `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"]
}
```

### Step 2: Create `.prettierignore`

```
dist
node_modules
.astro
public
pnpm-lock.yaml
package-lock.json
```

### Step 3: Run the formatter

```bash
pnpm format
```

This reformats all of `src/` (`.jsx`, `.astro`, `.css`) and root config files. Expect a large whitespace/quotes diff — that is the point.

### Verify

- `pnpm format:check` exits 0.

---

## Task 7 — Final verification

Run in order:

```bash
pnpm run build
pnpm run lint
pnpm run knip
```

Expected results:

1. **Build** succeeds with no errors. Tailwind v4 compiles; the `@apply` variants in `.btn-micro-anim` resolve.
2. **PWA artifacts** are generated in `dist/`:
   - `dist/sw.js`, `dist/registerSW.js`, `dist/workbox-*.js` exist.
   - `dist/manifest.json` exists (copied from `public/`).
   - `dist/index.html` contains exactly **one** `registerSW.js` reference (no double-injection). Confirm with `grep -c 'registerSW' dist/index.html` → `1`.
3. **`pnpm run lint`** → `0` errors (the 3 `import/no-unresolved` are gone with the deleted files).
4. **`pnpm run knip`** → exit 0, no "Unused files / dependencies / exports" output.

### PWA contingency

If `grep -c registerSW dist/index.html` returns `2` (double registration from `injectRegister: 'auto'` plus the manual script in `src/pages/index.astro`), remove the manual line `<script is:inline src="/registerSW.js"></script>` from `src/pages/index.astro` and rebuild. If it returns `0`, add `injectRegister: 'inline'` to the `AstroPWA({...})` options and rebuild.

### Commit plan (frequent, logical commits)

1. `chore: upgrade astro to v7 and migrate tailwind to v4` — Task 1–3 (package.json, lockfile, astro.config.mjs, index.css, deleted tailwind.config.js + postcss.config.js)
2. `chore: remove dead shadcn ui components` — Task 4–5 (deleted files, trimmed exports, knip.json)
3. `chore: add prettier and format` — Task 6 (`.prettierrc`, `.prettierignore`, formatted files)
