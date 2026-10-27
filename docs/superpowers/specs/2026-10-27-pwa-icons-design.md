# PWA and Icon Consistency Design

## Goal

Make Wreative's existing site icons and installable PWA metadata available consistently on every page, without redesigning the brand mark or adding an offline experience.

## Current behavior

- The homepage declares the favicon variants, Apple touch icon, manifest, and `/registerSW.js`.
- The service pages, contact page, and 404 page do not declare those shared resources.
- The hand-authored manifest uses `#0a0a0a` for its theme and background colors, while the site uses `#DFE4EA`.
- A production build emits the manifest, service worker, and registration script.

## Design

Add a small shared `PwaHead.astro` component and include it in the `<head>` of all five pages. It will own the existing favicon and Apple touch icon links, manifest link, application metadata, site theme color, and service-worker registration script. Page-specific titles, canonical URLs, and SEO metadata remain on their respective pages.

Keep the current icon artwork and asset files. Align the manifest's `theme_color` and `background_color` with the site's `#DFE4EA` theme, and use the 192px PNG for shortcut icons rather than the ICO file. Keep the existing service-worker strategy; do not add an offline fallback or change caching behavior.

## Validation

- Run `npm run build`.
- Inspect all five generated HTML pages to ensure each declares the shared icons, manifest, theme metadata, and service-worker registration.
- Confirm every manifest icon and shortcut path resolves to an emitted public asset and the JSON remains valid.
