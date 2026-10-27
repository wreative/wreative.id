# Site-Wide Motion Design

## Goal

Give every meaningful content section across Wreative's five public pages a
coherent reveal, including each page's second section, while preserving the
established visual identity and keeping browsing responsive.

## Scope

Apply the motion pass to all meaningful content sections on the homepage,
website-service page, application-service page, contact page, and 404 page.
This includes each route's second content section, such as the service-benefit
bands. Preserve existing copy, layout, brand tokens, PWA metadata, icon assets,
and service-worker behavior. Do not animate the header, footer, or static
decorative elements merely to increase motion coverage.

## Motion thesis

- **Focal moment:** Keep the homepage's layered hero-image entrance as the
  signature sequence: 620ms with the current brief offset between image panels.
- **Continuity:** Each content section reveals its heading and meaningful
  content groups once as they enter the viewport. Stagger siblings only when
  they form a list or grouped sequence, and cap the total delay at 360ms.
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
classes. Add reveal markers to uncovered section headings and content groups,
including reusable sections and grouped items where appropriate. Apply sibling
stagger only to actual card/list sequences; do not animate every leaf element.
Keep content visible when scripts or the observer are unavailable, and do not
alter unrelated presentation.

## Validation

- Build the production site and run the existing route, motion, and PWA/icon
  output tests. Assert that every route and each second content section has
  reveal coverage.
- Check all five generated pages at desktop and mobile widths.
- Verify reduced-motion behavior and keyboard interaction, including opening
  and closing the mobile menu.
- Confirm reveal content is visible without JavaScript and that changes add no
  horizontal overflow or prolonged interaction delays.
