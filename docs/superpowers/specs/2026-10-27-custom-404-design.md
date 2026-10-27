# Custom 404 Page Design

## Goal

Give visitors who open an unknown URL a branded, helpful Indonesian-language page that clearly explains the problem and offers a way back into the Wreative site.

## Design

Add a dedicated Astro `src/pages/404.astro` page using the existing global styles, typography, color palette, and button component. Use a focused layout rather than the homepage header and footer, whose section-anchor navigation would not be useful on an error URL. The page will include the Wreative wordmark linking to `/`, a clear 404 status, a short explanation, a primary link to the homepage, and a secondary link to the services section at `/#services`.

The visual treatment will be clean and professional to match the current site: light background, slate typography, restrained coral accent, and a small CSS-only decorative motif. The layout must remain readable and usable on narrow screens and at keyboard focus. Set a page-specific title and `noindex, nofollow`; do not include a canonical URL.

## Runtime and validation

Astro's static output recognizes `src/pages/404.astro` as the site's not-found page. Keep the implementation static and avoid client-side code or new dependencies. Validate with the repository's `pnpm build` command and inspect the generated `dist/404.html` for the expected page content, links, and robots directive.

## Scope

Only the 404 page is in scope. No changes to routing, the homepage, shared navigation, or deployment configuration are planned.
