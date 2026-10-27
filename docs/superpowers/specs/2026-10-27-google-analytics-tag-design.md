# Google Analytics Tag Design

## Goal

Install the Google tag `G-P1RLZGG7G8` so Google Analytics can record visits to every current page, including the custom 404 page.

## Current project context

The site is a static Astro project. The homepage (`src/pages/index.astro`) and custom 404 page (`src/pages/404.astro`) each define their own HTML document and `<head>`; there is no shared layout or existing analytics tag. No consent-management mechanism was found in the inspected project context.

## Design

Add Google's standard `gtag.js` loader and initialization snippet to the `<head>` of both page documents. Use the requested measurement ID exactly. This keeps the change local to the two current pages and avoids a layout refactor, extra dependency, or configuration system.

The tag will load when each page is opened and use Google's default page-view collection. No consent gate or cookie banner is included in this change.

## Alternatives considered

1. **Add the standard snippet to each page (recommended):** smallest change and matches the current independent document structure.
2. **Create and adopt a shared layout:** centralizes head markup but expands scope into a refactor for only two pages.
3. **Add an Astro analytics integration:** introduces dependency/configuration overhead not needed for this static site.

## Validation

Run the existing Astro build/check. Inspect the generated homepage and 404 document to verify each contains the requested measurement ID and that the tag is not duplicated on either page.
