# Service Pages Design

## Goal

Add two Indonesian-language service landing pages to help prospective clients understand
Wreative's offerings and start a project consultation:

- `/jasa-pembuatan-website`
- `/jasa-pembuatan-aplikasi`

Both pages should make the WhatsApp consultation action prominent, explain the relevant
capabilities, and provide useful service-specific information without inventing prices or
business claims.

## Audience and scope

The pages target Indonesian businesses looking for professional website or application
development. The website page covers company profiles, landing pages, custom websites, and
internal systems. The application page covers mobile applications for Android and iOS, plus
web applications such as SaaS, dashboards, ERP/CRM, and management systems.

Pricing is not displayed because no verified price list is available. Visitors are directed
to request a free consultation and proposal through the existing WhatsApp destination.

## User experience

Use the approved conversion-first layout on both routes:

1. A two-column hero with a clear, service-specific heading and short value proposition on one
   side, and a relevant website or application preview on the other.
2. A prominent consultation CTA linking to `https://link.wreative.com/wa`.
3. A concise benefits section followed by scannable service capabilities. Distinguish the
   website deliverables from the mobile and web application categories.
4. A short project-process section that explains the path from consultation through release.
5. Service-specific FAQs and a closing consultation CTA.

The layout stacks naturally on narrow screens. Reuse the shared header, footer, button styles,
and existing visual language. Include links between the two service pages so visitors can
discover the related offering.

## Content boundaries

- Write all page content in Indonesian.
- Use only existing, verifiable service capabilities and claims found in the project.
- Website content may describe fast, responsive, SEO-ready websites and the existing categories:
  company profile, landing page, custom website, and internal system.
- Application content may describe Android/iOS development with Flutter and web applications,
  including SaaS, dashboards, ERP/CRM, and management systems.
- Do not add numeric prices, guaranteed results, delivery promises, client testimonials,
  portfolio examples, email addresses, or other unsupported details.
- Retain the existing WhatsApp consultation URL as the primary contact destination.

## Technical approach

- Implement each page as a static Astro route in its own file under `src/pages/`.
- Reuse `Header.astro`, `Footer.astro`, and the existing shared UI components and stylesheet.
- Provide Indonesian document language, page-specific title and description, canonical URL,
  and appropriate Open Graph metadata for each route.
- Include page-specific structured data only when it accurately represents the content; avoid
  duplicating or contradicting the homepage organization data.
- Ensure all links resolve correctly from the nested static routes. Preserve existing behavior
  on the home page and `/contact`.
- Add links to the service pages from the existing navigation or service section where they fit
  the current site UX, without disrupting existing homepage anchors.

## Verification

- Add focused tests for the generated routes, key page-specific headings/content, canonical
  metadata, and WhatsApp CTA destination.
- Run the repository's formatting check and `npm run build` (which includes `astro check`).
- Confirm the built output includes both routes, service cross-links, and responsive page
  structure while existing homepage and contact routes remain intact.
