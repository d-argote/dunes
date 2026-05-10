```markdown
# Design System Strategy: The Sophisticated Apothecary

## 1. Overview & Creative North Star
**The Creative North Star: "The Botanical Architect"**
This design system rejects the clinical coldness of modern skincare in favor of a rugged, editorial warmth. It is inspired by the intersection of raw nature and refined architecture—where the organic texture of a rosemary leaf meets the precision of a marble slab.

To move beyond the "template" look, we employ **Organic Brutalism**. This means using heavy, impactful typography scales (the "Brutalism") paired with soft, tonal background shifts and botanical layering (the "Organic"). We break the rigid grid through intentional asymmetry—letting high-quality photography bleed off the edges while maintaining a strict, masculine alignment for text elements. The goal is to feel like a premium printed journal, not a generic web app.

---

## 2. Colors & Surface Philosophy
The palette is grounded in the earth, using high-chroma greens and terracottas against a breathable "Oat White" canvas.

### The "No-Line" Rule
**Lines are a failure of hierarchy.** In this system, explicit 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts.
*   **Example:** A `surface-container-low` section sitting directly on a `surface` background provides all the separation the eye needs without the "boxed-in" feel of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical space. Use the `surface-container` tiers to create depth:
*   **Base Layer:** `surface` (#fcf9f2) for the primary background.
*   **Secondary Layer:** `surface-container-low` (#f6f3ec) for subtle content grouping.
*   **Tertiary Layer:** `surface-container-highest` (#e5e2db) for high-impact callouts or sidebars.

### The "Glass & Gradient" Rule
To add "soul" to the digital interface:
*   **Glassmorphism:** Use semi-transparent versions of `surface` with a `backdrop-blur` (12px–20px) for floating navigation bars or sticky headers.
*   **Signature Textures:** Apply subtle linear gradients from `primary` (#234b1d) to `primary_container` (#3a6332) on large CTAs to mimic the depth of a forest canopy.

---

## 3. Typography: Editorial Authority
The typography system relies on a high-contrast relationship between a bold, condensed sans-serif and a modern, breathing sans-serif.

*   **Display & Headline (Space Grotesk / Oswald):** These must be used in **All Caps** with a slightly tighter letter-spacing (-0.02em). This conveys the "Modern Apothecary" authority—bold, masculine, and unapologetic.
*   **Body & Title (Inter):** These provide the "Sophisticated" balance. Use ample line-height (1.6 for body) to ensure the technical information (ingredients, benefits) feels premium and readable, never cramped.

**Hierarchy Note:** Always pair a `display-lg` headline with a `title-sm` subheader to create a dramatic, editorial scale jump.

---

## 4. Elevation & Depth
We define space through **Tonal Layering** rather than structural geometry.

*   **The Layering Principle:** Depth is achieved by "stacking" tones. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift.
*   **Ambient Shadows:** For floating elements, use shadows with a blur radius of 32px or higher and an opacity of 4%–6%. The shadow color must be a tinted version of `on-surface` (#1c1c18) to simulate soft, natural light filtered through a botanical greenhouse.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque stroke.
*   **Glassmorphism:** Navigation menus should use `surface_variant` at 80% opacity with a blur, allowing the "Botanical" background photography to bleed through softly.

---

## 5. Components

### Buttons (The "Weighty" CTA)
*   **Primary:** `primary` background, `on-primary` text. No border. On hover, apply a `scale(1.02)` and transition to `primary_container`.
*   **Secondary:** `outline` (Ghost Border style) with `primary` text.
*   **Interaction:** Every button must feel "heavy." Use a 200ms ease-out transition for scale and color shifts.

### Premium Cards
*   **Style:** No borders. Use `surface-container-low` backgrounds.
*   **Content:** Forbid divider lines within cards. Use `spacing-lg` (24px+) to separate the title from the body.
*   **Imagery:** Incorporate `marble textures` as subtle background overlays (5% opacity) within card containers to reinforce the premium apothecary feel.

### Input Fields
*   **Base:** Underline-only or subtle `surface-container-high` backgrounds.
*   **Focus State:** Shift the background to `primary_fixed` at 10% opacity with a `primary` 2px bottom-bar.

### Botanical Illustrations & Media
*   **Botanical Assets:** Rosemary and ginger illustrations should be placed with "intentional overlap," breaking the container edges of text blocks.
*   **Photography:** All lifestyle imagery must feature high-contrast, "golden hour" lighting to match the `tertiary` (Soft Gold) and `secondary` (Terracotta) accents.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. For example, a left-aligned headline with a right-aligned body block.
*   **Do** lean heavily on `background Oat White` (#fcf9f2) to provide "breathing room."
*   **Do** use the `tertiary` (#543f00) and `secondary` (#904c2d) tones for small functional accents like chips, notifications, or prices.

### Don't:
*   **Don't** use 1px solid black or grey borders. They break the premium, organic feel.
*   **Don't** use generic iconography. Icons should be ultra-thin (0.5px or 1px stroke) to match the "Sophisticated Apothecary" precision.
*   **Don't** center-align long blocks of text. Keep text left-aligned to maintain the "Architectural" masculine structure.
*   **Don't** use standard shadows. If it looks like a "drop shadow," it's too heavy. It should look like an "ambient glow."