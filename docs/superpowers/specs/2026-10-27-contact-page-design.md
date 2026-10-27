# Contact Page Design

## Goal

Add a dedicated Indonesian-language contact page at `/contact` so visitors can start a conversation with Wreative directly.

## User experience

- Use the existing Wreative header and footer.
- Present a responsive two-column layout: a short contact invitation on the left and a consultation card on the right.
- Make the existing WhatsApp URL (`https://link.wreative.com/wa`) the primary contact action. Open it in a new tab with safe `rel` attributes.
- Include links to the existing LinkedIn, Instagram, and TikTok profiles as secondary ways to connect.
- Do not add a contact form or invent an email address, office address, or service hours.

## Technical approach

- Implement the route as `src/pages/contact.astro`.
- Reuse the shared `Header.astro` and `Footer.astro` components rather than duplicating their markup.
- Ensure shared navigation links continue to reach the intended home-page sections when used from `/contact`; link the contact action to WhatsApp where a home-page section anchor is unavailable.
- Provide page-specific title, description, canonical URL (`https://wreative.id/contact`), and Indonesian document language.
- Keep the page static and compatible with the existing Astro/Tailwind setup.

## Verification

- Run the repository's Astro check and production build.
- Confirm the built site contains the `/contact` route and the WhatsApp/social links resolve to the existing destinations.
- Check that the page remains usable at narrow and wide viewport widths.
