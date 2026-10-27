---
version: stable
name: Wreative
description: |
  Wreative's design system embodies a modern, minimalist aesthetic rooted in
  professional clarity and technical sophistication. The visual language
  prioritizes clear contrast, generous whitespace, and bold typography to convey
  trust and expertise in software development. The palette is built around slate
  blues, a light neutral, and a restrained coral accent, creating an
  impression of precision and reliability. The interface feels contemporary and
  unfussy—avoiding decoration in favor of direct communication and functional
  clarity. This is a system built for a B2B technical audience that values
  speed, professionalism, and intellectual honesty over visual ornament.
  The default light-theme page canvas and footer must remain pure white
  (#FFFFFF); lightly tinted secondary sections may remain to distinguish content.
source:
  url: 'https://wreative.com/'
  guidebook: 'https://labs.google.com/u/0/pomelli/brand_book/asunQCvdRNM5fhZelQg4Um'
  paletteSource: 'Wreative brand palette, referenced against the Google Labs guidebook'
  pagesAnalyzed: 1
  extractedAt: 2026-10-06
  tokensMeasured: false
colors:
  primary: '#3A455C'
  link: '#3A455C'
  canvas: '#FFFFFF'
  on-primary: '#FFFFFF'
  ink: '#2F3542'
  body: '#2F3542'
  accent-1: '#EB5250'
  neutral-1: '#2F3542'
  neutral-2: '#3A455C'
  neutral-3: '#DFE4EA'
typography:
  display-xxl:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 100px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0px
  display-xl:
    fontFamily: 'Space Grotesk'
    fontSize: 60px
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: -0.6px
  display-lg:
    fontFamily: 'Space Grotesk'
    fontSize: 43px
    fontWeight: 600
    lineHeight: 1.09
    letterSpacing: 0px
  display-md:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 42px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  heading-xl:
    fontFamily: 'Space Grotesk'
    fontSize: 39px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0px
  heading-lg:
    fontFamily: 'Space Grotesk'
    fontSize: 31px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0px
  heading-md:
    fontFamily: 'Space Grotesk'
    fontSize: 27px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0px
  heading-md-tight:
    fontFamily: 'Space Grotesk'
    fontSize: 27px
    fontWeight: 600
    lineHeight: 1.26
    letterSpacing: -0.27px
  heading-sm:
    fontFamily: 'Space Grotesk'
    fontSize: 25px
    fontWeight: 600
    lineHeight: 1.36
    letterSpacing: 0px
  heading-xs:
    fontFamily: 'Space Grotesk'
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.81px
    textTransform: uppercase
  body-lg:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-lg-loose:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0px
  body-md:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.56
    letterSpacing: 0px
  body-md-tight:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.44
    letterSpacing: 0.08px
  body-sm:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: 0.15px
  body-xs:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 2.29
    letterSpacing: 0px
  button:
    fontFamily: 'Space Grotesk'
    fontSize: 17px
    fontWeight: 600
    lineHeight: 2.38
    letterSpacing: 0px
  label-sm:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: 0px
  label-xs:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 13.7143px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  caption:
    fontFamily: 'Be Vietnam Pro'
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0px
rounded:
  none: 0px
  xs: 0px
  sm: 0px
  md: 0px
  full: 0px
spacing:
  xxs: 8px
  xs: 12px
  sm: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 36px
  xxxl: 40px
  section: 60px
  band: 68px
borderWidths:
  thin: 1px
  medium: 2px
shadows:
  sm: 'rgba(47, 53, 66, 0.15) 0px 0px 50px 0px'
  md: 'rgba(47, 53, 66, 0.25) -2px 3px 90px -20px'
elevationStrategy: progressive
themes:
  derived: dark # dark theme derived from the supplied brand palette
  light:
    bg: '#FFFFFF'
    surface: '#FFFFFF'
    surfaceRaised: '#FFFFFF'
    text: '#2F3542'
    textMuted: '#3A455C'
    border: '#3A455C'
    accent: '#EB5250'
    focusRing: '#3A455C'
    elevation: shadow
  dark:
    bg: '#2F3542'
    surface: '#3A455C'
    surfaceRaised: '#3A455C'
    text: '#DFE4EA'
    textMuted: '#DFE4EA'
    border: '#3A455C'
    accent: '#EB5250'
    focusRing: '#EB5250'
    elevation: 'border+surface'
  contrastFailures:
    - 'Accent is decorative only: no supplied foreground color reaches 4.5:1
      contrast on #EB5250'
components:
  button-icon:
    textColor: '{colors.ink}'
    height: 61px
    fontSize: 14px
    fontFamily: 'Be Vietnam Pro'
    fontWeight: 500
    lineHeight: 1.07
    backgroundColor: '{colors.neutral-3}'
  button-text:
    typography: '{typography.button}'
    textColor: '{colors.ink}'
    height: 57.5px
    padding: '8.5px 0px 8.5px 0px'
    backgroundColor: 'rgba(255, 255, 255, 0)'
  button-outline:
    textColor: '{colors.ink}'
    border: '1px solid rgba(47, 53, 66, 0.17)'
    height: 52.5px
    padding: '17.25px 31.5px 17.25px 31.5px'
    fontSize: 15px
    fontFamily: 'Be Vietnam Pro'
    fontWeight: 500
    lineHeight: 1.07
    rounded: '{rounded.xs}'
  button-outline-lg:
    textColor: '{colors.link}'
    border: '1px solid rgba(47, 53, 66, 0.15)'
    height: 60px
    fontSize: 20px
    fontFamily: 'Be Vietnam Pro'
    fontWeight: 400
    lineHeight: 1
    rounded: '{rounded.none}'
    backgroundColor: 'rgba(255, 255, 255, 0)'
  badge-icon:
    textColor: '{colors.ink}'
    height: 20px
    fontSize: 20px
    fontFamily: 'Font Awesome 5 Brands'
    fontWeight: 400
    lineHeight: 1
  badge-text:
    textColor: '{colors.body}'
    height: 18.6875px
    fontSize: 11px
    fontFamily: 'Be Vietnam Pro'
    fontWeight: 700
    lineHeight: 1.7
  navigation:
    textColor: '{colors.body}'
    fontSize: 16px
    fontFamily: 'Be Vietnam Pro'
    fontWeight: 400
    lineHeight: 1.7
  link:
    typography: '{typography.display-md}'
    textColor: '{colors.neutral-2}'
    backgroundColor: 'rgba(255, 255, 255, 0)'
  link-lg:
    textColor: '{colors.body}'
    padding: '10px 15px 10px 15px'
    fontSize: 15px
    fontFamily: 'Be Vietnam Pro'
    fontWeight: 500
    lineHeight: 1.7
    backgroundColor: 'rgba(255, 255, 255, 0)'
states:
  link-hover:
    target: link
    state: hover
    textDecoration: underline
  input-focus:
    target: input
    state: focus
    outline: '-webkit-focus-ring-color auto 5px'
    outlineColor: -webkit-focus-ring-color
    outlineWidth: 5px
  other-hover:
    target: other
    state: hover
    textColor: '{colors.link}'
    boxShadow: 'rgba(47, 53, 66, 0.6) 0px 0px 2px 2px'
    rounded: '{rounded.xs}'
    textDecoration: none
    backgroundColor: '{colors.canvas}'
  button-hover:
    target: button
    state: hover
    textColor: '{colors.on-primary}'
  button-focus:
    target: button
    state: focus
    borderColor: '{colors.ink}'
  nav-hover:
    target: nav
    state: hover
    textColor: '{colors.ink}'
  input-hover:
    target: input
    state: hover
    transform: 'scale(1.125)'
  button-active:
    target: button
    state: active
    textColor: '{colors.ink}'
breakpoints:
  - width: 375
    containerWidth: 335
    gridColumns: 2
    navLinksVisible: 0
    menuToggleVisible: true
    headingPx: 43
    bodyPx: 16
    sectionPaddingX: 20
  - width: 768
    containerWidth: 748
    gridColumns: 3
    navLinksVisible: 0
    menuToggleVisible: true
    headingPx: 60
    bodyPx: 16
    sectionPaddingX: 40
  - width: 1024
    containerWidth: 1004
    gridColumns: 3
    navLinksVisible: 0
    menuToggleVisible: true
    headingPx: 60
    bodyPx: 16
    sectionPaddingX: 40
  - width: 1280
    containerWidth: 1220
    gridColumns: 4
    navLinksVisible: 4
    menuToggleVisible: true
    headingPx: 60
    bodyPx: 16
    sectionPaddingX: 35
  - width: 1440
    containerWidth: 1380
    gridColumns: 4
    navLinksVisible: 4
    menuToggleVisible: true
    headingPx: 60
    bodyPx: 16
    sectionPaddingX: 35
coverage:
  statesFound: 61
  gradientsFound: 0
  rolesUnassigned: 0
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: false
  semanticRampDeclared: false
---

# Design System Inspired by Wreative

## 1. Visual Theme & Atmosphere

Wreative's design system embodies a modern, minimalist aesthetic rooted in
professional clarity and technical sophistication. The visual language pairs
slate-blue contrast with generous whitespace and bold typography to convey trust
and expertise in software development. The palette uses `#3A455C` and `#2F3542`
as its slate foundation, `#DFE4EA` as its light neutral, and a restrained coral
accent (`#EB5250`) for precision and emphasis. The interface feels contemporary
and unfussy—avoiding decoration in favor of direct communication and functional
clarity. This is a system built for a B2B technical audience that values speed,
professionalism, and intellectual honesty over visual ornament.

The live homepage at [wreative.com](https://wreative.com/) was reviewed for its
brand tone and palette. Its current implementation still contains rounded cards
and controls. This document records the requested square-corner direction as the
target specification, not as a description of the site's current geometry.

### Key Characteristics

- Slate-blue foundation (`{colors.primary}` — `#3A455C` — and `{colors.ink}` —
  `#2F3542`) against a light neutral canvas (`{colors.canvas}` — `#DFE4EA`)
- Square, rectilinear geometry with all corner radii set to `0px`
  (`{rounded.none}`)
- Bold, geometric typography in Space Grotesk for headings; humanist sans-serif
  (Be Vietnam Pro) for body
- Restrained coral accent (`{colors.accent-1}` — `#EB5250`) used sparingly for
  visual punctuation
- Restrained shadow palette for depth without theatrical drama
- Generous internal and section-level spacing creating breathing room
- Direct, no-decoration interaction model

## 2. Color Palette & Roles

### Primary

- **Brand / Primary** (`{colors.primary}` — `#3A455C`): Primary actions,
  headings, links, and strong emphasis.
- **Dark Secondary / Ink** (`{colors.ink}` — `#2F3542`): Primary text and dark
  surfaces.
- **Canvas / On Primary** (`{colors.canvas}` — `#DFE4EA`): Light page background
  and text on dark brand surfaces.

### Body & Neutral Scale

- **Body Text** (`{colors.body}` — `#2F3542`): Body copy, form labels, and
  supporting text on the light canvas.
- **Link** (`{colors.link}` — `#3A455C`): Inline and navigation links.
- **Neutral Mid** (`{colors.neutral-1}` — `#2F3542`): Dark neutral for mid-tone
  text roles.
- **Neutral Dark** (`{colors.neutral-2}` — `#3A455C`): Slate neutral for
  secondary emphasis and borders.
- **Neutral Light** (`{colors.neutral-3}` — `#DFE4EA`): Light surface for
  backgrounds and cards.

### Accent & Decorative

- **Coral Accent** (`{colors.accent-1}` — `#EB5250`): Decorative emphasis only.
  Do not use it for text or text-bearing fills; none of the other supplied
  colors reaches 4.5:1 contrast against it.

### Semantic / Status

No semantic color palette (error, success, warning) is declared or present in
the extracted styles. The system does not expose state-specific colors.

## 3. Typography Rules

### Font Family

**Primary (Headings & UI):** Space Grotesk, sans-serif  
Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

**Secondary (Body & Supporting):** Be Vietnam Pro, sans-serif  
Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Hierarchy

- **Display XXL:** Be Vietnam Pro, 100px, weight 600, line-height 1.0, tracking
  0px. Large numerics and list items.
- **Display XL:** Space Grotesk, 60px, weight 600, line-height 0.9, tracking
  −0.6px. Hero headings with tight leading.
- **Display LG:** Space Grotesk, 43px, weight 600, line-height 1.09, tracking
  0px.
- **Display MD:** Be Vietnam Pro, 42px, weight 400, line-height 1.4, tracking
  0px. Alternate display size.
- **Heading XL:** Space Grotesk, 39px, weight 600, line-height 1.2, tracking
  0px. Section headings.
- **Heading LG:** Space Grotesk, 31px, weight 600, line-height 1.2, tracking
  0px. Subsection headings.
- **Heading MD Tight:** Space Grotesk, 27px, weight 600, line-height 1.26,
  tracking −0.27px. Compact heading variant.
- **Heading MD:** Space Grotesk, 27px, weight 600, line-height 1.5, tracking
  0px. Standard heading.
- **Heading SM:** Space Grotesk, 25px, weight 600, line-height 1.36, tracking
  0px.
- **Heading XS:** Space Grotesk, 10px, weight 600, line-height 1.2, tracking
  0.81px. Uppercase label heading.
- **Button:** Space Grotesk, 17px, weight 600, line-height 2.38, tracking 0px.
- **Body LG Loose:** Be Vietnam Pro, 17px, weight 400, line-height 1.7, tracking
  0px. Loose paragraph text.
- **Body LG:** Be Vietnam Pro, 17px, weight 400, line-height 1.5, tracking 0px.
  Standard body text.
- **Body MD:** Be Vietnam Pro, 16px, weight 400, line-height 1.56, tracking 0px.
  Default body copy.
- **Body MD Tight:** Be Vietnam Pro, 16px, weight 400, line-height 1.44,
  tracking 0.08px.
- **Body SM:** Be Vietnam Pro, 15px, weight 400, line-height 1.47, tracking
  0.15px. Reduced-emphasis text.
- **Body XS:** Be Vietnam Pro, 14px, weight 500, line-height 2.29, tracking 0px.
  Link and secondary text.
- **Label SM:** Be Vietnam Pro, 14px, weight 400, line-height 1.14, tracking
  0px.
- **Label XS:** Be Vietnam Pro, 13.7143px, weight 400, line-height 1.5, tracking
  0px.
- **Caption:** Be Vietnam Pro, 10px, weight 400, line-height 1.7, tracking 0px.

### Principles

- **Contrast First:** Space Grotesk (600 weight) is reserved for headings and
  CTAs where boldness and impact are required; Be Vietnam Pro carries supporting
  and body text, reserving cognitive load.
- **Negative Tracking on Display:** Leading display sizes
  (`{typography.display-xl}` −0.6px) employ tight letter-spacing to reinforce
  monumentality and visual confidence.
- **Line Height Ranges:** Headings cluster tightly (0.9–1.2); body text opens to
  1.4–1.7 for readability and comfort.
- **All-Caps Restriction:** Only `{typography.heading-xs}` is uppercase
  (`text-transform: uppercase`). All other roles are sentence case or natural
  case.
- **Semantic Weight:** 600 weight signals hierarchy and emphasis; 400 and 500
  weights provide variation and tonal depth.

## 4. Component Stylings

### Buttons

#### Primary (Solid)

- Background: `{colors.primary}` (`#3A455C`)
- Text Color: `{colors.canvas}` (`#DFE4EA`)
- Padding: `17.25px 31.5px`
- Border Radius: `{rounded.none}` (`0px`)
- Border: `1px solid {colors.primary}` (`#3A455C`)
- Font: `{typography.button}` (17px, 600 weight, Space Grotesk)
- Line Height: `40.5px`
- Box Shadow: None
- Hover State: `background-color: {colors.primary}` (`#3A455C`),
  `border-color: {colors.primary}` (`#3A455C`)
- Focus State: `border-color: {colors.primary}` (`#3A455C`), `outline: none`

#### Secondary (Ghost / Outline)

- Background: transparent
- Text Color: `{colors.primary}` (`#3A455C`)
- Padding: `17.25px 31.5px`
- Border Radius: `{rounded.none}` (`0px`)
- Border: `1px solid rgba(47, 53, 66, 0.17)`
- Font: `{typography.body-xs}` (14px, 500 weight, Be Vietnam Pro)
- Line Height: `16px`
- Box Shadow: None
- Hover State: `background-color: {colors.primary}` (`#3A455C`),
  `color: {colors.canvas}` (`#DFE4EA`)

#### Icon Button (Neutral)

- Background: `{colors.neutral-3}` (`#DFE4EA`)
- Text Color: `{colors.ink}` (`#2F3542`)
- Width / Height: `65px / 61px`
- Padding: `0px`
- Border Radius: `{rounded.none}` (`0px`)
- Border: None
- Font: Be Vietnam Pro, 14px, 500 weight
- Line Height: `15px`
- Box Shadow: None
- Hover State: `background-color: {colors.primary}` (`#3A455C`),
  `color: {colors.canvas}` (`#DFE4EA`)

#### Text Button (Minimal)

- Background: transparent
- Text Color: `{colors.primary}` (`#3A455C`)
- Padding: `8.5px 0px`
- Border: None
- Font: `{typography.button}` (17px, 600 weight, Space Grotesk)
- Line Height: `40.5px`
- Box Shadow: None
- Hover State: `color: {colors.canvas}` (`#DFE4EA`),
  `background-color: {colors.primary}` (`#3A455C`)

#### Square Icon Button

- Background: transparent
- Text Color: `{colors.link}` (`#3A455C`)
- Width / Height: `60px`
- Border Radius: `{rounded.none}` (`0px`)
- Border: `1px solid rgba(47, 53, 66, 0.15)`
- Font: Be Vietnam Pro, 20px, 400 weight
- Line Height: `20px`
- Hover State: `opacity: 0.99`

### Navigation

#### Header Navigation (Link)

- Background: transparent
- Text Color: `{colors.body}` (`#2F3542`)
- Font: `{typography.body-md}` (16px, 400 weight, Be Vietnam Pro)
- Line Height: `27.2px`
- Border: None
- Box Shadow: None
- Hover State: `color: {colors.primary}` (`#3A455C`),
  `text-decoration: underline`
- Focus State: `outline: none`

#### Navigation Overlay / Dropdown

- Background: `{colors.canvas}` (`#DFE4EA`)
- Text Color: `{colors.body}` (`#2F3542`)
- Box Shadow: `rgba(47, 53, 66, 0.15) 0px 0px 50px 0px`
- Border Radius: `{rounded.none}` (`0px`)
- Hover State: `color: {colors.primary}` (`#3A455C`), `opacity: 1`,
  `transform: translateY(0px)`

### Cards & Containers

#### Card (Default)

- Background: `{colors.canvas}` (`#DFE4EA`)
- Border: None
- Border Radius: `{rounded.none}` (`0px`)
- Box Shadow: `rgba(47, 53, 66, 0.25) −2px 3px 90px −20px`
- Padding: Contextual (typically `{spacing.md}` – `{spacing.lg}`, 20px–24px)
- Hover State: `box-shadow: rgba(47, 53, 66, 0.1) 0px 10px 25px`,
  `transform: translateY(−2px)`

#### Subtle Surface

- Background: `{colors.neutral-3}` (`#DFE4EA`)
- Border: None
- Border Radius: `{rounded.none}` (`0px`)
- Box Shadow: None

### Inputs & Forms

#### Text Input (Default)

- Background: `{colors.canvas}` (`#DFE4EA`)
- Text Color: `{colors.ink}` (`#2F3542`)
- Border: `1px solid rgba(47, 53, 66, 0.15)`
- Border Radius: `{rounded.none}` (`0px`)
- Padding: `10px 15px`
- Font: `{typography.label-sm}` (14px, 400 weight, Be Vietnam Pro)
- Line Height: `1.14`
- Focus State: `outline: none`, `border-color: {colors.primary}`,
  `box-shadow: rgba(47, 53, 66, 0.1) 0px 0px 0px 1px inset`
- Hover State: `transform: scale(1.125)`,
  `background-color: rgba(223, 228, 234, 0.1)`

#### Placeholder Text

- Color: `{colors.body}` (`#2F3542`)
- Font: `{typography.label-xs}` (13.7px, 400 weight, Be Vietnam Pro)

### Links

#### Inline Link (Body Context)

- Color: `{colors.link}` (`#3A455C`)
- Text Decoration: None
- Font: Inherits from body
- Hover State: `color: {colors.primary}` (`#3A455C`),
  `text-decoration: underline`
- Focus State: `outline: none`

#### Link (Large / Prominent)

- Color: `{colors.body}` (`#2F3542`)
- Background: transparent
- Font: `{typography.body-xs}` (15px, 500 weight, Be Vietnam Pro)
- Line Height: `25.5px`
- Padding: `10px 15px`
- Hover State: `color: {colors.primary}` (`#3A455C`),
  `background-color: rgba(223, 228, 234, 0.8)`, `border-radius: 0px`

### Badges

#### Badge Text

- Color: `{colors.body}` (`#2F3542`)
- Background: transparent
- Font: Be Vietnam Pro, 11px, 700 weight
- Line Height: `18.7px`
- Border Radius: `{rounded.none}` (`0px`)
- Border: None

#### Badge Icon

- Color: `{colors.primary}` (`#3A455C`)
- Font: Font Awesome 5 Brands, 20px, 400 weight
- Background: transparent
- Border Radius: `{rounded.none}` (`0px`)

### Shared Components

- `BenefitItem` and `ValuePoint` render informational benefits as open rows,
  not nested cards.
- `FeatureList`, `FAQItem`, and `ProcessStep` standardize repeated capability,
  question, and workflow patterns across the homepage and service pages.
- `OfferingItem` and `TestimonialQuote` preserve their distinct content roles
  while sharing consistent square geometry and brand tokens.
- `SocialIconLink` provides a reusable, labeled external-link target for social
  icons.

## 5. Layout Principles

### Spacing System

The spacing scale is built on an 8px base unit, expanding in controlled
increments:

- `{spacing.xxs}` = 8px — Minimal internal padding; tight component gutters
- `{spacing.xs}` = 12px — Small spacing; input label gaps
- `{spacing.sm}` = 16px — Standard element padding; default gutters
- `{spacing.md}` = 20px — Card and section padding; moderate breathing room
- `{spacing.lg}` = 24px — Larger component spacing; heading separators
- `{spacing.xl}` = 32px — Substantial whitespace; section breaks
- `{spacing.xxl}` = 36px — Large vertical rhythm
- `{spacing.xxxl}` = 40px — Extra-large spacing; major section divisions
- `{spacing.section}` = 60px — Vertical section padding; major content
  separation
- `{spacing.band}` = 68px — Hero and full-width section height

#### Usage Context

- Component-level spacing: `{spacing.xs}` – `{spacing.md}`
- Section padding (internal): `{spacing.md}` – `{spacing.lg}`
- Vertical rhythm between sections: `{spacing.section}` – `{spacing.band}`

### Grid & Container

| Viewport | Max Width | Column Count | Section Padding-X |
| -------- | --------- | ------------ | ----------------- |
| 375px    | 335px     | 2            | 20px              |
| 768px    | 748px     | 3            | 40px              |
| 1024px   | 1004px    | 3            | 40px              |
| 1280px   | 1220px    | 4            | 35px              |
| 1440px   | 1380px    | 4            | 35px              |

- **Max Width Strategy:** Content is constrained by a max-width container; at
  1440px the max-width is 1380px, allowing 30px gutters on each side (1440 −
  1380 / 2).
- **Column Strategy:** Layouts shift from 2 columns (mobile) to 3 columns
  (tablet) to 4 columns (desktop). Grid is fluid until breakpoint, then fixed.
- **Gutters:** Horizontal section padding decreases slightly at largest
  breakpoints (40px → 35px) to accommodate wider containers.

### Whitespace Philosophy

Whitespace is treated as a design element, not a filler. The system enforces
breathing room through:

- Generous section separators (`{spacing.section}` — 60px, `{spacing.band}` —
  68px)
- Substantial top/bottom padding on content blocks (`{spacing.md}` –
  `{spacing.lg}`)
- Limited nesting; content rarely indents more than one level
- Cards and overlays use restrained padding to feel spacious but not hollow

This creates a contemplative, high-end aesthetic—busy screens are avoided in
favor of focused, scannable layouts.

### Border Radius Scale

- `{rounded.none}` = 0px — Default for every component and surface
- `{rounded.xs}` = 0px — Alias retained for existing token references
- `{rounded.sm}` = 0px — Alias retained for existing token references
- `{rounded.md}` = 0px — Alias retained for existing token references
- `{rounded.full}` = 0px — Alias retained for existing token references

Square geometry is mandatory. Do not use pills, circles, rounded corners, or
non-zero radii for hover states or icon controls.

### Border Widths

- `thin` = 1px — Input borders, button outlines, dividing lines
- `medium` = 2px — Dividers, accent strokes, prominent separators

Only two widths are in active use; the system avoids visual noise by limiting
stroke variety.

## 6. Depth & Elevation

- **Flat:** No shadow; use for button fills, cards, and surfaces with color
  distinction.
- **Subtle Dropdown:** `rgba(47, 53, 66, 0.15) 0px 0px 50px 0px`; use for
  dropdown menus and overlays.
- **Subtle Navigation:** `rgba(47, 53, 66, 0.25) −2px 3px 90px −20px`; use for
  header navigation and floating elements.
- **Hover Lift:** `rgba(47, 53, 66, 0.1) 0px 10px 25px` with
  `transform: translateY(−2px)`; use for interactive cards.

### Shadow Philosophy

Depth is achieved through surface and position change, not aggressive shadow
blur. The system favours restraint:

- Shadows use semi-transparent dark secondary, never the coral accent
- Blur radius is moderate (50px max); no theatrical diffusion
- Vertical offset is minimal (−2px to 3px); shadows sit close to surfaces
- Most interactive elements remain flat until interaction, then lift subtly

This keeps the interface feeling contemporary and legible, avoiding the dated
appearance of heavy drop shadows.

### Opacity Levels

- 100% (1.00) — Fully opaque; default state
- 98% (0.98) — Barely perceptible fade; hover state for subtle feedback
- 91% (0.91) — Slight transparency; decorative elements
- 50% (0.50) — Medium transparency; disabled or muted states
- 15% (0.15) — Heavy transparency; borders and very subtle fills
- 4% (0.04) — Near-invisible; emphasis on color beneath

### Z-index / Layering

- **Base:** z-index 1–3 — Content and standard flow
- **Dropdown:** z-index 10, 99 — Menus, overlays, floating pickers
- **Sticky:** z-index 100 — Fixed headers, persistent navigation
- **Modal:** z-index 1100 — Dialogs, lightboxes, top-level overlays

The stacking model is sparse and clear, preventing z-index collisions and
maintaining predictable layering.

## 7. Do's and Don'ts

### Do

- **Lead with bold typography.** Space Grotesk at 600 weight commands attention;
  use it for headings, CTAs, and section markers.
- **Maximize whitespace.** Allow content to breathe. Use `{spacing.section}` and
  `{spacing.band}` liberally between major sections.
- **Keep every corner square.** Use `{rounded.none}` (`0px`) for buttons, cards,
  inputs, badges, overlays, and hover states.
- **Maintain high contrast.** Pair `{colors.primary}` (`#3A455C`) with
  `{colors.canvas}` (`#DFE4EA`) for critical text and CTAs. Avoid color
  blending.
- **Layer depth through position and shadow, not opacity.** Use subtle
  box-shadows and transform: translateY on hover to signal interactivity.
- **Use the neutral scale for hierarchy.** `{colors.link}` (`#3A455C`) for
  links; `{colors.body}` (`#2F3542`) for body copy.
- **Limit the coral accent (`{colors.accent-1}` — `#EB5250`) to decorative
  punctuation.** Use it for small visual moments, never for text or text-bearing
  fills.
- **Design for touch first.** Buttons and interactive targets must be at least
  48px × 48px. Icon buttons use a square 60px × 60px target.
- **Test at declared breakpoints.** Layouts shift at 375px, 768px, 1024px, and
  1280px. Always verify appearance at these widths.

### Don't

- **Never use rounded geometry.** Buttons, cards, inputs, icon controls, badges,
  and hover states all use `0px` radii.
- **Don't stack multiple shadow layers.** One shadow per element; the system
  uses subtle, flat elevation, not layered depth.
- **Don't invent semantic colours.** The brand palette does not define error,
  success, or warning states. Do not assign the coral accent to error states or
  invent success colors.
- **Don't overuse the coral accent colour.** `{colors.accent-1}` (`#EB5250`) is
  decorative, not a primary UI tool. Reserve it for limited visual punctuation.
- **Don't reduce font sizes below the hierarchy table.** Caption is the smallest
  at 10px; do not go smaller without design approval.
- **Don't use light text on the light canvas.** Use `{colors.ink}` (`#2F3542`)
  for body copy and `{colors.primary}` (`#3A455C`) for links to maintain
  contrast.
- **Don't create new component variants.** Stick to defined button styles
  (Primary, Secondary, Icon, Text); ghost, gradient, or split buttons are out of
  scope.
- **Don't apply opacity to text indiscriminately.** Opacity reduces
  accessibility and readability. Use colour or size change instead.
- **Don't exceed max-width constraints.** At 1440px, the container is 1380px. Do
  not stretch full-width unless intentional (e.g., hero bands).
- **Don't animate without purpose.** Interactions are minimal; avoid frivolous
  motion. Use transform and opacity only for feedback and state change.

## 8. Responsive Behavior

### Breakpoints

- **375px — Mobile Small:** 2 columns, 20px section padding, 43px largest
  heading, and menu toggle visible.
- **768px — Mobile Large:** 3 columns, 40px section padding, 60px largest
  heading, and menu toggle visible.
- **1024px — Tablet:** 3 columns, 40px section padding, 60px largest heading,
  and menu toggle visible.
- **1280px — Desktop:** 4 columns, 35px section padding, 60px largest heading,
  and 4 navigation links visible.
- **1440px — Desktop Large:** 4 columns, 35px section padding, 60px largest
  heading, and 4 navigation links visible.

**Collapse Point:** Navigation link visibility drops to 0 (hidden) and menu
toggle appears until 1280px. At 1280px and above, 4 navigation links are visible
and the toggle becomes secondary.

### Touch Targets

- **Minimum Size:** 48px × 48px for standard buttons and interactive elements
- **Square Icon Buttons:** 60px × 60px minimum target
- **Padding Around Targets:** At least `{spacing.xs}` (12px) between adjacent
  interactive elements to prevent mis-taps
- **Link Hit Area:** Inline links inherit surrounding text size but should have
  at least 12px vertical padding in list contexts

### Collapsing Strategy

- **Navigation:** Links collapse into a hamburger menu toggle below 1280px. Menu
  expands as overlay on click.
- **Grid Layout:** Content reflows from 4 columns (1440px) → 3 columns (1024px)
  → 2 columns (375px). Gutters remain consistent per breakpoint.
- **Heading Size:** Largest heading (`{typography.display-xl}` — 60px) stays at
  60px from 768px and above; compresses to `{typography.display-lg}` (43px) on
  375px mobile.
- **Body Font:** Remains `{typography.body-md}` (16px) across all breakpoints.
  Line-height is consistent (1.56–1.7) for readability.
- **Section Padding:** Horizontal padding shifts 20px (mobile) → 40px
  (tablet/desktop) → 35px (desktop large). Vertical padding is consistent
  (`{spacing.section}` / `{spacing.band}`).
- **Card Stacking:** Multi-column card grids stack vertically on mobile; reflow
  as column count changes.

**Mobile-First Principle:** Start layouts at 375px (2-column, tight padding) and
enhance upward. Never design desktop-first and shrink.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA & Headings:** Brand Primary (`{colors.primary}` — `#3A455C`)
- **Page Background:** Canvas (`{colors.canvas}` — `#DFE4EA`)
- **Body Text & Secondary:** Ink (`{colors.ink}` — `#2F3542`)
- **Inline Links:** Link (`{colors.link}` — `#3A455C`)
- **Dark Surface:** Ink (`{colors.ink}` — `#2F3542`)
- **Decorative / Visual Punctuation:** Coral Accent (`{colors.accent-1}` —
  `#EB5250`), decorative only

### Iteration Guide

1. **Typography First:** Use Space Grotesk (600 weight) for all headings and
   CTAs; Be Vietnam Pro (400–500 weight) for body and labels. Never mix fonts in
   a single text element.

2. **Contrast & Hierarchy:** Use `{colors.ink}` (`#2F3542`) on the light canvas
   (`#DFE4EA`), and `{colors.canvas}` (`#DFE4EA`) on dark brand surfaces. Use
   `{colors.link}` (`#3A455C`) for links; never use the coral accent as text or
   as a text-bearing background.

3. **Spacing:** Section-level padding is `{spacing.section}` (60px) or
   `{spacing.band}` (68px). Component-level padding is `{spacing.md}` (20px) or
   `{spacing.lg}` (24px). Never guess; reference the scale.

4. **Geometry:** Every border-radius is `0px` (`{rounded.none}`). Use square
   icon buttons; do not create circular or pill-shaped elements.

5. **Shadows:** Use one shadow per element. Dropdown menu shadow is
   `rgba(47, 53, 66, 0.15) 0px 0px 50px 0px`. Card hover shadow is
   `rgba(47, 53, 66, 0.1) 0px 10px 25px` with `transform: translateY(−2px)`.
   Never stack multiple shadows.

6. **Interactive States:** Buttons darken or invert on hover. Links underline.
   Inputs show a subtle inset border on focus. Disabled elements reduce opacity
   to 0.5 or 0.35.

7. **Responsive Breakpoints:** Test at 375px, 768px, 1024px, 1280px, and 1440px.
   Navigation collapses below 1280px. Max content width is 1380px at 1440px;
   1220px at 1280px.

8. **Accents:** The coral accent (`#EB5250`) is decorative only—use it for small
   visual moments, never for text or text-bearing fills.

9. **Opacity:** Use 1.0 (100%) for default, 0.99 (98%) for subtle hover, 0.5
   (50%) for disabled, 0.15 (15%) for borders. Never invent opacity values.

10. **Grid & Container:** Section padding-x is 20px (mobile 375px) → 40px
    (tablets / small desktop) → 35px (large desktop 1280px+). Max-width
    container is always respected; never exceed it unless full-width
    intentional.

## 10. Known Gaps

- **No Semantic Color Palette:** The site does not expose error, success,
  warning, or info state colours in its styles. Any status-related UI will
  require custom design or external specification.

- **Derived Dark Theme:** The dark theme is derived from the supplied brand
  palette and is not measured from the source website.

- **No Gradients or Decorative Meshes:** The system uses solid colours
  exclusively. No gradient backgrounds, meshes, or illustrative patterns were
  found. Decoration is typographic and spatial, not chromatic.

- **Limited Interaction State Coverage:** While basic hover and focus states
  were captured, other interactive states (active, disabled, loading, success,
  error) were not fully specified in the extracted stylesheet. Implement them
  following the principle of opacity reduction or colour inversion (e.g.,
  disabled buttons at 0.5 opacity).

- **Motion System:** Use 140ms for immediate control feedback, 240ms for routine
  state changes, and reserve 620ms for the homepage's one-time layered-image
  entrance. Scroll reveals are brief and capped; content stays visible without
  JavaScript, and spatial motion is removed for reduced-motion preferences.
  Avoid looping motion and scroll parallax.

- **Accent Contrast Limitation:** `{colors.accent-1}` (`#EB5250`) is decorative
  only because none of the other supplied palette colors provides 4.5:1 text
  contrast on it.

- **Single Page Analysis:** Only the Wreative homepage was analysed.
  Authenticated flows, internal product pages, and dynamic UI states behind
  login were not visited. The design system is representative of the marketing
  surface only.

- **No Gradient or Mesh Patterns:** Visual effects beyond solid colour and
  shadow are not present in the extracted data.

- **Typography Fallback Fonts Not Specified Beyond Generic:** Font-family
  fallback stacks use system defaults; no specific secondary typefaces are
  documented if Space Grotesk or Be Vietnam Pro fail to load.

---

This design system is intended for a B2B software services site. Use the
approved brand tokens for solid colors; the dark theme is derived, while
typography and spacing remain based on the existing design reference.
