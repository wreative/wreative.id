# Migrasi ke Astro Framework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrasi situs single-page Wreative dari Vite + React SPA ke Astro, tanpa mengubah tampilan atau fungsionalitas, dengan perbaikan SEO.

**Architecture:** Pertahankan semua komponen React apa adanya, lalu mount sebagai satu Astro island (`client:load`) melalui integrasi `@astrojs/react`. Astro merender konten menjadi HTML statis saat build (menggantikan render client-side SPA), sehingga crawler melihat konten penuh — ini perbaikan SEO terbesar. Semua meta/head dipindah dari `index.html` + `react-helmet-async` ke frontmatter/`<head>` Astro sebagai satu sumber kebenaran. PWA dipindah dari `vite-plugin-pwa` ke `@vite-pwa/astro`.

**Tech Stack:** Astro 5, `@astrojs/react`, `@astrojs/tailwind` v6 (Tailwind v3), `@vite-pwa/astro`, React 18, framer-motion, lucide-react, shadcn/ui (Radix), Tailwind CSS v3.

## Global Constraints

- **Tidak boleh mengubah tampilan atau fungsionalitas.** Perbandingan visual sebelum/sesudah harus identik.
- Bahasa Indonesia dipertahankan: `lang="id"`, `og:locale id_ID`, `inLanguage: "id"`.
- Production URL tetap `https://wreative.id`.
- Output build tetap `dist/` (static output, tanpa adapter — sama seperti `vite build` saat ini).
- Node >= 18.17 (Astro 5).
- Alias `@` → `./src` harus tetap berfungsi (dipakai semua komponen shadcn dan HomePage).
- Konten SEO yang sudah ada wajib dipertahankan: canonical, Open Graph, Twitter Card, JSON-LD (Organization, LocalBusiness, WebPage), `hreflang`, `google-site-verification`, sitemap.xml, robots.txt, manifest.json, llms.txt.

---

## File Structure

**Dibuat:**
- `astro.config.mjs` — konfigurasi Astro (integrations react, tailwind, PWA; alias `@`; `site`).
- `src/components/App.jsx` — root island baru (menggantikan `src/App.jsx`, tanpa Router & Helmet).
- `src/pages/index.astro` — halaman tunggal + seluruh head SEO.

**Dipindah (path berubah, isi sama):**
- `src/pages/HomePage.jsx` → `src/components/HomePage.jsx` (HANYA hapus blok `<Helmet>` dan import-nya).

**Dimodifikasi:**
- `src/components/HomePage.jsx` — hapus `import { Helmet }`, hapus blok `<Helmet>…</Helmet>`, ubah root return jadi `<main>`.
- `src/components/ServiceCard.jsx` — tambah `loading="lazy" decoding="async"` pada `<img>`.
- `tailwind.config.js` — update `content` globs.
- `package.json` — deps baru + hapus deps usang + update scripts.

**Dihapus:**
- `vite.config.js` (digantikan `astro.config.mjs`; seluruh script "Horizons" ikut hilang).
- `index.html` (head dipindah ke `index.astro`).
- `src/main.jsx` (registrasi PWA lama).
- `src/App.jsx` (digantikan `src/components/App.jsx`).
- Direktori `src/pages/` (kosong setelah pemindahan HomePage).

**Tidak disentuh (tetap `public/`):**
- `public/sitemap.xml`, `public/robots.txt`, `public/manifest.json`, `public/llms.txt`, `public/google32b581d4d21f7a3b.html`, seluruh `public/icons/*`, `public/images/*`.

---

### Task 1: Setup dependensi & konfigurasi Astro

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Modify: `tailwind.config.js`
- Modify: `jsconfig.json`

**Interfaces:**
- Produces: `astro.config.mjs` dengan integrasi `react()`, `tailwind()`, `AstroPWA()` dan alias `@` → `./src`. Dipakai Task 3 dan seluruh build.

- [ ] **Step 1: Update `package.json`**

Ganti seluruh isi `package.json` menjadi:

```json
{
  "name": "web",
  "type": "module",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev --host --port 3000",
    "build": "astro build",
    "preview": "astro preview --host --port 3000",
    "start": "astro preview --host --port 3000",
    "lint": "eslint . --quiet",
    "lint:warn": "eslint ."
  },
  "dependencies": {
    "@astrojs/react": "^4.3.0",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tooltip": "^1.2.8",
    "astro": "^5.16.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@astrojs/tailwind": "^6.0.0",
    "@types/node": "^20.17.10",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vite-pwa/astro": "^1.2.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.39.4",
    "eslint-import-resolver-alias": "^1.1.2",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.1.0",
    "globals": "^15.14.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17"
  }
}
```

Yang dihapus: `react-router-dom`, `react-helmet-async`, `@vitejs/plugin-react`, `vite-plugin-pwa`, `vite`, `@resvg/resvg-js` (semua tidak lagi dipakai / template leftover).

- [ ] **Step 2: Install dependensi**

Run: `npm install`

Expected: selesai tanpa error. Verifikasi: `node_modules/astro` dan `node_modules/@astrojs/react` ada.

- [ ] **Step 3: Buat `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://wreative.id',
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    AstroPWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      includeAssets: ['icons/favicon-16x16.png', 'icons/favicon-32x32.png', 'icons/apple-touch-icon.png'],
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
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
```

Catatan: `includeAssets` tidak lagi memuat `icons/favicon.svg` karena file itu TIDAK ada di `public/icons/` (referensi lama yang salah — diperbaiki sebagai bagian SEO Task 3).

- [ ] **Step 4: Update `tailwind.config.js` content globs**

Ganti baris `content` menjadi:

```js
  content: [
    "./src/**/*.{js,jsx,astro}",
  ],
```

(Hapus globs lama `./pages/**`, `./components/**`, `./app/**` yang tidak ada di project ini.)

- [ ] **Step 5: Update `jsconfig.json` include**

Ganti isi `jsconfig.json` menjadi:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", ".astro/types.d.ts"]
}
```

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.js jsconfig.json
git commit -m "feat: setup Astro config, integrations, and dependencies"
```

---

### Task 2: Adaptasi komponen React (island root + strip Helmet)

**Files:**
- Create: `src/components/App.jsx`
- Modify: `src/pages/HomePage.jsx` → pindah ke `src/components/HomePage.jsx`
- Modify: `src/components/ServiceCard.jsx`
- Delete: `src/App.jsx`, `src/main.jsx`, `src/pages/` (direktori)

**Interfaces:**
- Consumes: komponen `Header.jsx`, `Footer.jsx`, `HomePage.jsx`, `ServiceCard.jsx`, `TestimonialSection.jsx` yang sudah ada (import path via `@` tetap valid).
- Produces: `src/components/App.jsx` default-export komponen React tanpa props, dikonsumsi oleh `src/pages/index.astro` (Task 3) sebagai `<App client:load />`.

- [ ] **Step 1: Pindah HomePage ke `src/components/`**

Run: `git mv src/pages/HomePage.jsx src/components/HomePage.jsx`

- [ ] **Step 2: Hapus Helmet dari HomePage**

Di `src/components/HomePage.jsx`:

a. Hapus baris import:
```jsx
import { Helmet } from "react-helmet-async";
```

b. Hapus seluruh blok `<Helmet>…</Helmet>` (baris `188`–`239` di file lama), mulai dari `<Helmet>` sampai `</Helmet>`.

c. Ubah root return dari fragment menjadi `<main>`:

Sebelum:
```jsx
  return (
    <>
      <Helmet>…</Helmet>

      <main className="overflow-hidden">
      …
      </main>
    </>
  );
```

Sesudah:
```jsx
  return (
    <main className="overflow-hidden">
    …
    </main>
  );
```

(Isi `<main>…</main>` TIDAK berubah sama sekali — hanya wrapper luar `<>`/`</>` dan `<Helmet>` yang hilang.)

- [ ] **Step 3: Buat island root `src/components/App.jsx`**

```jsx
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}
```

Struktur DOM identik dengan `src/App.jsx` lama (tanpa `Router` dan `HelmetProvider`, karena Astro menangani routing/head).

- [ ] **Step 4: Hapus file lama**

```bash
git rm src/App.jsx src/main.jsx
```

Direktori `src/pages/` sudah kosong setelah `git mv`; hapus: `rmdir src/pages`.

- [ ] **Step 5: Tambah lazy-loading gambar di ServiceCard (SEO/perf, tanpa ubah tampilan)**

Di `src/components/ServiceCard.jsx`, pada tag `<img>`:

Sebelum:
```jsx
          <img 
            src={service.image} 
            alt={`Ilustrasi ${service.title}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
```

Sesudah:
```jsx
          <img 
            src={service.image} 
            alt={`Ilustrasi ${service.title}`} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
```

- [ ] **Step 6: Commit**

```bash
git add src/components/App.jsx src/components/HomePage.jsx src/components/ServiceCard.jsx
git commit -m "feat: adapt React components to Astro island (remove router/helmet)"
```

---

### Task 3: Buat halaman `index.astro` dengan head SEO lengkap

**Files:**
- Create: `src/pages/index.astro`

**Interfaces:**
- Consumes: `src/components/App.jsx` (default export, no props) — Task 2.
- Consumes: `src/index.css` (global CSS, sudah ada).
- Produces: halaman `/` dengan seluruh `<head>` SEO dan satu island `<App client:load />`.

- [ ] **Step 1: Buat `src/pages/index.astro`**

```astro
---
import App from '../components/App.jsx';
import '../index.css';

const title = 'Wreative - Jasa Pembuatan Website & Aplikasi Berkualitas';
const description = 'Bangun website dan aplikasi mobile profesional bersama Wreative. Solusi digital untuk kemajuan bisnis Anda dengan UI modern dan clean code.';
const canonical = 'https://wreative.id/';
const ogImage = 'https://wreative.id/icons/og-image.png';
---

<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="jasa pembuatan website, web development, mobile app, landing page, company profile, web application, Flutter, React, Jakarta, Indonesia" />
    <meta name="author" content="Wreative" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="Indonesian" />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonical} />

    <!-- Favicon & Icons -->
    <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={title} />
    <meta property="og:site_name" content="Wreative" />
    <meta property="og:locale" content="id_ID" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonical} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={title} />

    <!-- Theme & PWA -->
    <meta name="theme-color" content="#0a0a0a" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Wreative" />
    <meta name="application-name" content="Wreative" />
    <meta name="msapplication-TileColor" content="#0a0a0a" />

    <!-- Verification -->
    <meta name="google-site-verification" content="LIovFvCv7ZsFCgRA_RCpxPfs5TqUAaipyj7jCt5P_so" />

    <!-- Preconnect & Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://images.unsplash.com" />

    <!-- Structured Data: Organization -->
    <script type="application/ld+json" set:html={`{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wreative",
      "url": "https://wreative.id",
      "logo": "https://wreative.id/icons/favicon.ico",
      "description": "Agensi digital spesialis pengembangan website dan aplikasi profesional untuk membantu skala bisnis Anda.",
      "sameAs": [
        "https://www.instagram.com/wreative",
        "https://www.linkedin.com/company/wreative",
        "https://twitter.com/wreative"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://link.wreative.com/wa"
      }
    }`} />

    <!-- Structured Data: LocalBusiness -->
    <script type="application/ld+json" set:html={`{
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Wreative",
      "description": "Jasa pembuatan website dan aplikasi mobile profesional",
      "url": "https://wreative.id",
      "priceRange": "$$",
      "areaServed": { "@type": "Country", "name": "Indonesia" },
      "serviceType": ["Website Development", "Mobile App Development", "Landing Page", "Web Application"]
    }`} />

    <!-- Structured Data: WebPage -->
    <script type="application/ld+json" set:html={`{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Wreative - Jasa Pembuatan Website & Aplikasi Berkualitas",
      "description": "Bangun website dan aplikasi mobile profesional bersama Wreative.",
      "url": "https://wreative.id/",
      "inLanguage": "id",
      "isPartOf": { "@type": "WebSite", "@id": "https://wreative.id/#website" }
    }`} />

    <!-- Alternate Languages -->
    <link rel="alternate" hreflang="id" href="https://wreative.id/" />
    <link rel="alternate" hreflang="x-default" href="https://wreative.id/" />

    <!-- manifest -->
    <link rel="manifest" href="/manifest.json" />
  </head>

  <body>
    <App client:load />
  </body>
</html>
```

Catatan perbaikan SEO vs kode lama:
- Logo JSON-LD `Organization` diubah dari `favicon.svg` (file TIDAK ada) → `favicon.ico` (ada).
- Meta `title`/`description`/OG/Twitter yang sebelumnya terduplikasi di `index.html` DAN `<Helmet>` HomePage kini jadi SATU sumber (tidak ada duplikasi).
- `set:html` memastikan JSON-LD dirender literal (tidak di-escape menjadi entitas HTML).

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Astro index page with consolidated SEO head"
```

---

### Task 4: Hapus file Vite lama & verifikasi build

**Files:**
- Delete: `vite.config.js`, `index.html` (root)

- [ ] **Step 1: Hapus file Vite lama**

```bash
git rm vite.config.js index.html
```

`postcss.config.js` dan `tailwind.config.js` TETAP (dipakai integrasi `@astrojs/tailwind`).

- [ ] **Step 2: Build**

Run: `npm run build`

Expected: build sukses, output di `dist/`.

- [ ] **Step 3: Verifikasi HTML statis berisi konten (bukan div kosong)**

Run: `grep -o "Konsultasi" dist/index.html | head -1`

Expected: menemukan teks konten (sebelumnya SPA hanya berisi `<div id="root"></div>`). Ini bukti konten sekarang ter-render server-side.

- [ ] **Step 4: Commit**

```bash
git rm --cached vite.config.js index.html 2>/dev/null || true
git add -A
git commit -m "chore: remove Vite entry files"
```

---

### Task 5: Verifikasi paritas visual & fungsional

**Files:** (tidak ada — verifikasi manual)

- [ ] **Step 1: Jalankan dev server**

Run: `npm run dev`

Expected: server jalan di `http://localhost:3000`.

- [ ] **Step 2: Cek visual & fungsional**

Bandingkan dengan tampilan lama (`git stash` / screenshot sebelumnya). Periksa:
- Header: logo, nav links `#home #services #portfolio #why-us #testimonials`, smooth scroll, menu mobile (Sheet) terbuka/tutup.
- Hero: animasi stagger framer-motion muncul.
- Service cards: hover lift, gambar webp tampil.
- Testimoni: animasi whileInView.
- Footer: link sosial, smooth scroll, tahun `© 2026`.
- CTA "Konsultasi Sekarang" → buka `https://link.wreative.com/wa`.

Expected: identik. Tidak ada console error.

- [ ] **Step 3: Cek PWA**

Run: `npm run build && npm run preview`

Periksa: `dist/` berisi `sw.js`/`workbox-*.js` dan `manifest.webmanifest` (atau manifest.json dari public/). Registrasi service worker otomatis.

Expected: PWA offline/install tetap berfungsi (auto-update, tanpa prompt confirm "update tersedia" lama — perilaku minor yang diterima).

- [ ] **Step 4: Validasi SEO**

Periksa `dist/index.html`:
- `<title>`, meta description, canonical, OG, Twitter, JSON-LD (3 blok), `hreflang`, `google-site-verification` semua ada.
- Tidak ada duplikasi meta.

Expected: semua tag hadir tepat satu kali.

---

## Self-Review

**Spec coverage:**
- "convert ke Astro" → Task 1 (config) + Task 3 (index.astro). ✅
- "tanpa merubah tampilan/fungsional" → pendekatan single island, semua komponen React tidak diubah isinya (Task 2 hanya hapus Helmet + pindah file). ✅
- "SEO improve" → konten pre-rendered (Task 4 Step 3), head konsolidasi + fix favicon.svg + lazy images (Task 2/3). ✅

**Placeholder scan:** semua langkah punya kode konkret; tidak ada TBD/TODO. ✅

**Type consistency:** `App.jsx` default-export tanpa props; `index.astro` import `../components/App.jsx` dan render `<App client:load />` — cocok. `@` alias → `./src` didefinisikan di `astro.config.mjs` dan `jsconfig.json`. ✅

## Catatan keputusan

- **Pendekatan single island** dipilih (bukan rewrite `.astro`) karena satu-satunya cara menjamin visual 100% identik — seluruh framer-motion, Radix (Sheet/Dialog/Select), lucide, dan state React berjalan dalam satu React tree yang sama persis dengan sebelumnya.
- **`@astrojs/sitemap` sengaja tidak dipakai** — `public/sitemap.xml` statis yang sudah benar tetap dipakai (single page, tidak perlu regenerasi). Tambahkan integrasi ini hanya bila halaman bertambah.
- **Script "Horizons"** (error tracker, fetch monkey-patch, banner) di `vite.config.js` ikut terhapus. Bila hosting lama bergantung pada `TEMPLATE_BANNER_SCRIPT_URL`/`TEMPLATE_REDIRECT_URL`, konfirmasi dulu — untuk deploy statis mandiri tidak diperlukan.
