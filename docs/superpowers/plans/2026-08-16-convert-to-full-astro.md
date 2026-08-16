# Convert React Island → Full Astro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the site from Astro + a single React island (`<App client:load />`) to full Astro (`.astro` components only, zero React), preserving the exact visual appearance, animations, and interactivity.

**Architecture:** Every `.jsx` React component becomes an `.astro` component. framer-motion animation, React state, and Radix UI get reimplemented with a small vanilla-JS script (`src/scripts/main.js`) plus CSS. lucide-react icons become one `Icon.astro` component with inline SVG paths. The whole React toolchain (react, react-dom, @astrojs/react, framer-motion, lucide-react, radix deps, cva/clsx/tailwind-merge) is removed.

**Tech Stack:** Astro 7, Tailwind v4 (CSS-first, already migrated), vanilla JS, inline SVG. No React, no client-side framework.

## Global Constraints

- Visual result must be pixel-identical to current: same Tailwind classes, same copy, same sections, same hover/animation effects (only the mechanism changes — React → Astro/vanilla/CSS).
- `pnpm run build`, `pnpm run lint`, `pnpm run knip`, `pnpm run format:check` must all exit 0 at the end.
- PWA must still work (service worker + manifest; the manual `<script is:inline src="/registerSW.js"></script>` in `src/pages/index.astro` stays).
- Zero React imports anywhere in `src/` at the end. React and every React-only dependency removed from `package.json`.
- Use relative imports between components (no `@/` alias needed; `@/lib/utils` `cn()` is deleted — write literal class strings instead).
- The reveal/stagger/parallax/menu/scroll-spy behavior is driven by `data-*` attributes + `src/scripts/main.js`; each converted component only *emits* the attributes.

---

### Task 1: Foundations — Icon component, main script, reveal CSS

**Files:**
- Create: `src/components/Icon.astro`
- Create: `src/scripts/main.js`
- Modify: `src/index.css` (append reveal + scroll-margin rules)

**Interfaces:**
- Produces: `<Icon name="..." class="..." />` (renders a 24×24 stroke SVG), and `data-reveal` / `data-reveal-delay` attributes handled by `main.js`, plus `data-header` / `data-nav-link` / `data-menu-toggle` / `data-menu` / `data-menu-overlay` / `data-parallax` hooks consumed by later tasks.

- [ ] **Step 1: Create `src/components/Icon.astro`**

Props: `name` (string, required), `class` (string, optional, default `''`). It renders:

```astro
---
interface Props {
  name: string
  class?: string
}
const { name, class: className = '' } = Astro.props

// Map of icon name -> SVG inner elements. Each entry is an array of [tag, attrs]
// (lucide stroke style: 24x24, stroke=currentColor, stroke-width=2, fill=none).
const icons: Record<string, [string, Record<string, string>][]> = {
  menu: [
    ['line', { x1: '4', x2: '20', y1: '12', y2: '12' }],
    ['line', { x1: '4', x2: '20', y1: '6', y2: '6' }],
    ['line', { x1: '4', x2: '20', y1: '18', y2: '18' }],
  ],
  x: [
    ['path', { d: 'M18 6 6 18' }],
    ['path', { d: 'm6 6 12 12' }],
  ],
  // ... (all icons below, see Step 2)
}

const elements = icons[name] ?? []
const inner = elements
  .map(([tag, attrs]) => {
    const attrsStr = Object.entries(attrs)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ')
    return `<${tag} ${attrsStr}/>`
  })
  .join('')
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
  set:html={inner}
/>
```

Note: the Astro template is HTML, not JSX — so render the icon body as a pre-built HTML string via `set:html={inner}` (as above), never as a dynamic `<Tag>` component. `interface Props` + `Astro.props` is Astro-native and types cleanly.

- [ ] **Step 2: Fill the full icon map**

The exact `[tag, attrs]` data for every icon lives in `node_modules/lucide-react/dist/esm/icons/<kebab>.js` (each file ends with `createLucideIcon("Name", [ ... ])`; that array **is** the `[tag, attrs]` data — copy it verbatim, dropping the `key` field on each attrs object).

Required icons (map key → lucide file):
`menu` (`menu.js`), `x` (`x.js`), `arrow-right` (`arrow-right.js`), `arrow-up-right` (`arrow-up-right.js`), `linkedin` (`linkedin.js`), `instagram` (`instagram.js`), `youtube` (`youtube.js`), `message-circle` (`message-circle.js`), `code-2` (`code-2.js`), `smartphone` (`smartphone.js`), `globe` (`globe.js`), `zap` (`zap.js`), `shield-check` (`shield-check.js`), `layers` (`layers.js`), `wrench` (`wrench.js`), `rocket` (`rocket.js`), `layout` (`layout.js`), `pen-tool` (`pen-tool.js`), `check-circle-2` (`check-circle-2.js`), `quote` (`quote.js`).

- [ ] **Step 3: Create `src/scripts/main.js`**

```js
// Scroll reveal (fade-up on first intersection)
const revealEls = document.querySelectorAll('[data-reveal]')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '-50px' },
  )
  revealEls.forEach((el) => io.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'))
}

// Sticky header: scrolled state + active-section highlight
const header = document.querySelector('[data-header]')
const navLinks = document.querySelectorAll('[data-nav-link]')
const onScroll = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 20)
  const pos = window.scrollY + 100
  let current = 'home'
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1)
    const section = id ? document.getElementById(id) : null
    if (section && section.offsetTop <= pos) current = id
  })
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href')?.slice(1) === current)
  })
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Mobile menu
const menuToggle = document.querySelector('[data-menu-toggle]')
const menu = document.querySelector('[data-menu]')
const menuOverlay = document.querySelector('[data-menu-overlay]')
const closeMenu = () => {
  menu?.classList.remove('is-open')
  menuOverlay?.classList.remove('is-open')
  document.body.classList.remove('overflow-hidden')
}
menuToggle?.addEventListener('click', () => {
  const open = menu?.classList.toggle('is-open')
  menuOverlay?.classList.toggle('is-open', open)
  document.body.classList.toggle('overflow-hidden', open)
})
menuOverlay?.addEventListener('click', closeMenu)
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu()
})

// Hero parallax
const p1 = document.querySelector('[data-parallax="1"]')
const p2 = document.querySelector('[data-parallax="2"]')
window.addEventListener(
  'scroll',
  () => {
    const s = Math.min(window.scrollY, 1000)
    if (p1) p1.style.transform = `translateY(${s * 0.15}px)`
    if (p2) p2.style.transform = `translateY(${s * -0.1}px)`
  },
  { passive: true },
)
```

- [ ] **Step 4: Append to `src/index.css`**

```css
/* Scroll reveal */
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}

/* Anchor offset for fixed header */
[id] {
  scroll-margin-top: 5rem;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Icon.astro src/scripts/main.js src/index.css
git commit -m "feat: add icon component, reveal/menu/parallax script, reveal CSS"
```

---

### Task 2: Convert `Button` → `Button.astro`

**Files:**
- Create: `src/components/Button.astro`
- (delete `src/components/ui/button.jsx` in Task 6 — keep it until the switch)

**Interfaces:**
- Consumes: nothing.
- Produces: `<Button variant="default|destructive|outline|secondary|ghost|link" size="default|sm|lg|icon" as="button|a" href? class="...">children</Button>`.

- [ ] **Step 1: Create `src/components/Button.astro`**

Port the class strings from `button.jsx` `buttonVariants`. Render a `<button>` or `<a>` via the `as` prop (default `button`). `href` required when `as="a"`. Base classes + variant + size concatenated (plain string concat, no `cn`).

```astro
---
interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  as?: 'button' | 'a'
  href?: string
  class?: string
}
const {
  variant = 'default',
  size = 'default',
  as = 'button',
  href,
  class: className = '',
} = Astro.props

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
}
const sizes: Record<string, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9',
}
const classes = [base, variants[variant], sizes[size], className].join(' ')
---

{as === 'a' ? (
  <a href={href} class={classes}>
    <slot />
  </a>
) : (
  <button class={classes}>
    <slot />
  </button>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Button.astro
git commit -m "feat: convert Button to Astro component"
```

---

### Task 3: Convert `ServiceCard` and `TestimonialSection`

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/TestimonialSection.astro`

**Interfaces:**
- ServiceCard consumes: `service: { id, icon: string, title, description, items: string[], image? }`, `index: number`.
- Produces: a reveal-on-scroll card. Uses `<Icon name={service.icon} />`.
- TestimonialSection consumes: nothing (owns the `testimonials` array, copied from `TestimonialSection.jsx`).

- [ ] **Step 1: Create `src/components/ServiceCard.astro`**

Port `ServiceCard.jsx`. Changes:
- `<motion.div id={service.id} initial whileInView viewport transition whileHover ...>` → `<div id={service.id} data-reveal data-reveal-delay={index * 150} ...>`.
- `whileHover={{ y: -4, scale: 1.01 }}` → add Tailwind classes `hover:-translate-y-1 hover:scale-[1.01]` to the same div (keep existing `transition-all duration-300`).
- `{service.icon}` → `<Icon name={service.icon} class="w-6 h-6" />` inside the existing icon wrapper div. NOTE: `service.icon` is now a kebab-case STRING (e.g. `'globe'`), not a React element — see Task 5, which converts the `services` array's `icon: <Globe className="w-6 h-6" />` into `icon: 'globe'`. The `w-6 h-6` size lives here in ServiceCard.
- `<CheckCircle2 className="w-5 h-5 ..." />` → `<Icon name="check-circle-2" class="w-5 h-5 text-primary shrink-0 mt-0.5" />`.
- `className=` → `class=`, `key=` → `data-key=` (or drop; use index in map).
- Keep all existing Tailwind classes verbatim.

- [ ] **Step 2: Create `src/components/TestimonialSection.astro`**

Port `TestimonialSection.jsx`. The `testimonials` array (objects with `id/name/role/company/industry/content/initials/color`) goes in the Astro frontmatter as a plain JS array. Changes:
- `<motion.* ...>` → `<div data-reveal ...>` (fade-up for the section header, staggered `data-reveal-delay` for cards).
- `<Quote className="..." />` → `<Icon name="quote" class="..." />`.
- Iterate `testimonials` with Astro `{testimonials.map((t) => ...)}`; use `<Fragment set:html={t.content} />` if content needs rendering, otherwise `{t.content}` as text.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServiceCard.astro src/components/TestimonialSection.astro
git commit -m "feat: convert ServiceCard and TestimonialSection to Astro"
```

---

### Task 4: Convert `Footer` and `Header`

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/Header.astro`

**Interfaces:**
- Footer consumes: nothing. Produces the full `<footer>` (replaces `currentYear` with `new Date().getFullYear()` in frontmatter; replaces `scrollToSection` smooth-scroll JS with plain `href="#..."` — the CSS `scroll-margin-top` + `scroll-behavior:smooth` handle offset).
- Header consumes: `Button.astro`, `Icon.astro`. Produces sticky header with scroll state, active-section highlight, and a mobile menu — all wired to `main.js` via data attributes.

- [ ] **Step 1: Create `src/components/Footer.astro`**

Port `Footer.jsx`. Changes: `className=`→`class=`, drop `scrollToSection` (use `href="#..."`), `const currentYear = new Date().getFullYear()` into frontmatter, replace every `<IconName className="..." />` (Linkedin/Instagram/ArrowUpRight/Youtube) with `<Icon name="linkedin|instagram|arrow-up-right|youtube" class="..." />`.

- [ ] **Step 2: Create `src/components/Header.astro`**

Port `Header.jsx`. Changes:
- Frontmatter holds `navLinks` (the 5-entry array) and no React state.
- `<header className={... isScrolled ? ...}>` → `<header data-header class="fixed top-0 w-full z-50 transition-all duration-300 border-b bg-transparent border-transparent py-5">`. The `is-scrolled` variant (bg-background/90 backdrop-blur-md border-border shadow-sm py-3) goes into a CSS rule in `index.css` (add in this task):

```css
[data-header].is-scrolled {
  background: hsl(var(--background) / 0.9);
  backdrop-filter: blur(12px);
  border-color: hsl(var(--border));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
```

- Desktop nav links: each `<a data-nav-link href={link.href} class="text-sm font-medium transition-all duration-200 relative py-1 text-muted-foreground hover:text-primary">` + the active underline span becomes `<span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in-up is-active-only" />` — but simpler: render the underline only via CSS `[data-nav-link].is-active { color: hsl(var(--primary)); }` and `[data-nav-link].is-active::after { ... }`. Implementer: use an `::after` pseudo for the underline so no conditional JSX is needed:

```css
[data-nav-link] { position: relative; }
[data-nav-link].is-active { color: hsl(var(--primary)); }
[data-nav-link].is-active::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  background: hsl(var(--primary));
  border-radius: 9999px;
}
```

- `<Button className="ml-4 ..." onClick={scrollToSection('#contact')}>` → `<Button href="#contact" as="a" class="ml-4 font-medium btn-micro-anim">Konsultasi Gratis</Button>` (no onClick — plain anchor).
- Mobile menu: replace the Radix `<Sheet>` with:
  - `<Button as="button" variant="ghost" size="icon" aria-label="Menu" class="md:hidden" data-menu-toggle>` wrapping `<Icon name="menu" class="h-6 w-6" />` (or a plain `<button data-menu-toggle>`).
  - A panel `<div data-menu class="fixed inset-y-0 right-0 z-50 w-[300px] bg-background p-6 translate-x-full transition-transform duration-300 flex flex-col">` with a close `<button data-menu-toggle ...><Icon name="x" .../></button>`, the nav links (each `<a data-nav-link ...>`), and the bottom CTA. The `.is-open` state is driven by `main.js` (adds `.is-open` class); CSS:

```css
[data-menu].is-open { transform: translateX(0); }
[data-menu-overlay] { opacity: 0; pointer-events: none; transition: opacity 0.3s; }
[data-menu-overlay].is-open { opacity: 1; pointer-events: auto; }
```

  - `<div data-menu-overlay class="fixed inset-0 z-40 bg-black/50 md:hidden"></div>`.
- Keep the same Tailwind classes for layout/content.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro src/components/Header.astro src/index.css
git commit -m "feat: convert Footer and Header to Astro with vanilla menu/scroll"
```

---

### Task 5: Convert `HomePage` → `HomePage.astro`

**Files:**
- Create: `src/components/HomePage.astro`

**Interfaces:**
- Consumes: `Button.astro`, `Icon.astro`, `ServiceCard.astro`, `TestimonialSection.astro`.
- Produces: the full `<main>` with all six sections (hero, services, portfolio, why-us, testimonials, contact).

- [ ] **Step 1: Create `src/components/HomePage.astro`**

Port `HomePage.jsx` section by section. Mechanical rules:
- `className=` → `class=`; `style={{...}}` → inline `style="..."` (or Tailwind classes where equivalent).
- `motion.*` with `fadeUpConfig` / `staggerContainer` / `staggerItem` → `<div data-reveal>` (header fade-up) and `<div data-reveal data-reveal-delay={n * 150}>` (staggered children). For stagger containers, wrap children directly — each child gets `data-reveal` + an increasing `data-reveal-delay`.
- `whileHover={{ y: -4, scale: 1.01 }}` → `hover:-translate-y-1 hover:scale-[1.01]` on the same element (keep existing transition classes).
- All `<IconName className="..." />` → `<Icon name="..." class="..." />` using the map: ArrowRight→`arrow-right`, MessageCircle→`message-circle`, Code2→`code-2`, Smartphone→`smartphone`, Globe→`globe`, Zap→`zap`, ShieldCheck→`shield-check`, Layers→`layers`, Wrench→`wrench`, Rocket→`rocket`, Layout→`layout`, PenTool→`pen-tool`.
- `<Button ... onClick={scrollToSection(...)} asChild><a ...>...</a></Button>` → `<Button as="a" href="..." ...>...</Button>` (the closing CTA WhatsApp link keeps `href="https://link.wreative.com/wa" target="_blank" rel="noopener noreferrer"`).
- `scrollToSection` calls on nav/CTA → plain `href="#services"` etc.
- **Parallax**: the two hero elements using `style={{ y: y1 }}` (HomePage.jsx line 223) and `style={{ y: y2 }}` (line 234) → add `data-parallax="1"` and `data-parallax="2"` respectively, and drop the inline `y` transform (main.js sets it). Preserve their other classes/layout.
- **Data arrays**: `services`, `whyUsPoints`, `workflowSteps`, `portfolioItems` (whatever arrays `HomePage.jsx` defines) move into the frontmatter — EXCEPT the `icon` fields, which are currently React elements and must become kebab-case strings: `icon: <Globe className="w-6 h-6" />` → `icon: 'globe'`, `<Layout/>` → `'layout'`, `<Smartphone/>` → `'smartphone'`, `<Code2/>` → `'code-2'`, `<PenTool/>` → `'pen-tool'`, `<Zap/>` → `'zap'`, `<Layers/>` → `'layers'`, `<Rocket/>` → `'rocket'`, `<ShieldCheck/>` → `'shield-check'`, `<Wrench/>` → `'wrench'`. Drop the JSX `className` on the icon; the render site applies its own size class (read the JSX around each render to keep the exact size — services icons render at `w-6 h-6` inside ServiceCard; why-us/portfolio icons render inline with their own class like `w-10 h-10`).
- `TestimonialSection` usage → `<TestimonialSection />`.
- Keep the hero's inline SVG noise-texture `style="background-image:url(...)"` verbatim.

- [ ] **Step 2: Commit**

```bash
git add src/components/HomePage.astro
git commit -m "feat: convert HomePage to Astro"
```

---

### Task 6: Wire-up, delete React, strip dependencies

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `eslint.config.mjs`
- Delete: `src/components/App.jsx`, `Header.jsx`, `Footer.jsx`, `HomePage.jsx`, `ServiceCard.jsx`, `TestimonialSection.jsx`, `src/components/ui/button.jsx`, `src/components/ui/sheet.jsx`, `src/lib/utils.js`

**Interfaces:**
- Consumes: all `.astro` components above; produces the final static site.

- [ ] **Step 1: Rewrite `src/pages/index.astro`**

Keep the entire `<head>` (SEO, JSON-LD, fonts, manifest, `registerSW.js` script) unchanged. Replace the frontmatter import + body:

```astro
---
import Header from '../components/Header.astro'
import HomePage from '../components/HomePage.astro'
import Footer from '../components/Footer.astro'
import '../index.css'
// ... keep title/description/canonical/ogImage consts unchanged ...
---

<body>
  <Header />
  <div class="flex-grow">
    <HomePage />
  </div>
  <Footer />
  <script src="../scripts/main.js"></script>
</body>
```

(Remove `<App client:load />` and the `import App from '../components/App.jsx'`.)

- [ ] **Step 2: Remove React from `astro.config.mjs`**

Delete the `react()` entry from `integrations` and the `import react from '@astrojs/react'` line. Keep `tailwindcss()`, `AstroPWA`, site/output/alias.

- [ ] **Step 3: Update `package.json`**

Remove from `dependencies`: `@astrojs/react`, `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `framer-motion`, `lucide-react`, `react`, `react-dom`, `tailwind-merge`.
Remove from `devDependencies`: `@types/react`, `@types/react-dom`.
Keep: `astro`, `@vite-pwa/astro`, `@tailwindcss/vite`, `tailwindcss`, `tw-animate-css`, eslint/import/globals, knip, prettier, typescript, `@types/node`.

- [ ] **Step 4: Update `eslint.config.mjs`**

Remove the react-related imports (`eslint-plugin-react`, `eslint-plugin-react-hooks`) and the `react`/`react-hooks` plugin entries + all `react/*` rules. Keep the `import` plugin + its rules, `globals.browser`, the `@` alias resolver, and the `no-undef`/`no-unused-vars`/`import/no-self-import`/`import/no-cycle` rules. If `eslint-plugin-react`/`eslint-plugin-react-hooks` are no longer in `package.json`, remove them there too (and from `pnpm-lock` via install).

- [ ] **Step 5: Delete the React files and install**

```bash
rm src/components/App.jsx src/components/Header.jsx src/components/Footer.jsx \
   src/components/HomePage.jsx src/components/ServiceCard.jsx src/components/TestimonialSection.jsx \
   src/components/ui/button.jsx src/components/ui/sheet.jsx src/lib/utils.js
rmdir src/components/ui 2>/dev/null || true
rmdir src/lib 2>/dev/null || true
pnpm install
```

- [ ] **Step 6: Run lint/knip/build and fix fallout**

```bash
pnpm run lint
pnpm run knip
pnpm run build
```

Fix any unused-dep / unused-file / lint findings (e.g. leftover react references in eslint config, a now-unused eslint plugin dep).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: wire full-Astro layout and remove React toolchain"
```

---

### Task 7: Final verification

- [ ] **Step 1: Run the gates in order**

```bash
pnpm run build
pnpm run lint
pnpm run knip
pnpm run format:check
```

Expected: all exit 0.

- [ ] **Step 2: Verify PWA artifacts**

```bash
ls dist/sw.js dist/registerSW.js dist/workbox-*.js dist/manifest.json
grep -c 'registerSW' dist/index.html
```

Expected: all artifacts exist; `registerSW` count = `1`.

- [ ] **Step 3: Grep for any leftover React**

```bash
grep -rn "react\|framer-motion\|lucide-react\|radix" src/ package.json astro.config.mjs eslint.config.mjs
```

Expected: no output (except possibly a comment).

- [ ] **Step 4: Commit any format-only fixes if `format:check` failed**

```bash
pnpm format && git add -A && git commit -m "style: format"
```

---

## Self-Review Notes

- Spec coverage: every `.jsx` file has a corresponding conversion task (Button, ServiceCard, TestimonialSection, Footer, Header, HomePage, App→index). Dep removal + config cleanup covered in Task 6. Verification in Task 7.
- Placeholder scan: icon map data is sourced from exact lucide files in `node_modules` (not "TBD"); the JSX→Astro port references the existing source files precisely. No "similar to Task N" shorthand — each task spells out its own rules.
- Type consistency: `Icon` prop is `name` (kebab-case keys); `Button` props `variant|size|as|href|class`; `ServiceCard` props `service|index`. `data-*` hooks (`data-reveal`, `data-reveal-delay`, `data-header`, `data-nav-link`, `data-menu-toggle`, `data-menu`, `data-menu-overlay`, `data-parallax`) are consistent between `main.js` (Task 1) and the components (Tasks 3–5).
