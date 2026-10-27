# White Canvas Design

## Goal

Make white the required default/light page canvas for Wreative while preserving
the current hierarchy and branded sections.

## Design

- Set the default/light canvas to pure white (`#FFFFFF`) in the design tokens.
- Use the same white canvas for the default page background, footer, and base
  card, popover, and raised surfaces.
- Record in `DESIGN.md` that the default/light page canvas must remain white.
- Keep lightly tinted secondary sections and colored CTA/brand sections so
  content groups remain distinguishable. The footer is white, not tinted.
- Leave the existing dark theme variant unchanged.

## Validation

- Confirm the CSS canvas and base surface tokens resolve to white.
- Confirm `DESIGN.md` records white as a required default/light canvas.
- Run the existing formatting, build, and test checks.
