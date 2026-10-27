# Site-Wide Motion Design

## Goal

Give Wreative's five public pages a coherent motion language that improves
hierarchy, continuity, and interaction feedback without slowing browsing or
changing the established visual identity.

## Scope

Apply the motion pass to the homepage, website-service page, application-service
page, contact page, and 404 page. Preserve existing copy, layout, brand tokens,
PWA metadata, icon assets, and service-worker behavior. Do not animate static
decorative elements merely to increase motion coverage.

## Motion thesis

- **Focal moment:** Keep the homepage's layered hero-image entrance as the
  signature sequence: 620ms with the current brief offset between image panels.
- **Continuity:** Meaningful content groups reveal once as they enter the
  viewport. Stagger siblings only when they form a list or grouped sequence,
  and cap the total delay at 360ms.
- **Feedback:** Use the existing quick and standard timing scale for button
  press/hover, active navigation, sticky-header state, and mobile-menu
  transitions. Keep exits faster than entrances.
- **Budget:** Do not add a motion dependency, route transitions, looping motion,
  parallax, or layout animation. Keep effects bounded and use transform and
  opacity for routine transitions; retain the existing clip reveal only for the
  authored hero moment.

## Accessibility and resilience

Content remains visible when JavaScript or `IntersectionObserver` is
unavailable. The reduced-motion preference removes spatial movement and
nonessential reveal choreography while preserving meaningful state feedback
through immediate color, opacity, or other non-spatial changes. Keyboard
navigation and focus visibility remain unchanged and usable.

## Implementation boundaries

Reuse the existing CSS tokens, `[data-reveal]` mechanism, and interaction
classes. Make only the changes needed to align current reveals, menu/header
transitions, and reduced-motion behavior with this motion system. Do not add
new effects to every leaf element or alter unrelated presentation.

## Validation

- Build the production site and run the existing PWA/icon output tests.
- Check the five generated pages at desktop and mobile widths.
- Verify reduced-motion behavior and keyboard interaction, including opening
  and closing the mobile menu.
- Confirm reveal content is visible without JavaScript and that changes add no
  horizontal overflow or prolonged interaction delays.
