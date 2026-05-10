---
name: Organic Brutalism
colors:
  surface: '#f9faf3'
  surface-dim: '#d9dbd4'
  surface-bright: '#f9faf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4ed'
  surface-container: '#edeee7'
  surface-container-high: '#e8e9e2'
  surface-container-highest: '#e2e3dc'
  on-surface: '#1a1c18'
  on-surface-variant: '#42493f'
  inverse-surface: '#2f312c'
  inverse-on-surface: '#f0f1ea'
  outline: '#72796e'
  outline-variant: '#c2c9bc'
  surface-tint: '#3f6837'
  primary: '#0b3408'
  on-primary: '#ffffff'
  primary-container: '#234b1d'
  on-primary-container: '#8dbb81'
  inverse-primary: '#a4d397'
  secondary: '#904c2d'
  on-secondary: '#ffffff'
  secondary-container: '#fea680'
  on-secondary-container: '#78391c'
  tertiary: '#4e1931'
  on-tertiary: '#ffffff'
  tertiary-container: '#692f47'
  on-tertiary-container: '#e699b4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c0efb1'
  primary-fixed-dim: '#a4d397'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#285021'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb597'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#733518'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cc'
  on-tertiary-fixed: '#390720'
  on-tertiary-fixed-variant: '#6e334b'
  background: '#f9faf3'
  on-background: '#1a1c18'
  surface-variant: '#e2e3dc'
typography:
  display-lg:
    fontFamily: Oswald
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.1em
  display-md:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.08em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-lg:
    fontFamily: Oswald
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
spacing:
  base: 8px
  container-margin-desktop: 64px
  container-margin-mobile: 20px
  gutter: 24px
  section-gap: 120px
---

## Brand & Style
The brand ethos, "The Botanical Architect," manifests as a fusion of Colombian biodiversity and structural precision. This design system targets a discerning male audience seeking a premium, editorial experience that feels both raw and highly curated. 

The aesthetic is characterized by **Organic Brutalism**: it rejects traditional decorative flourishes in favor of structural integrity and high-quality "materials" (colors and type). It draws inspiration from premium journals and architectural monographs, utilizing generous whitespace and a rigid grid to frame lush, botanical photography. The emotional response is one of grounded luxury—stable, quiet, and sophisticated.

## Colors
The palette is rooted in the Colombian landscape. The primary **Deep Forest Green** provides a heavy, architectural anchor, while the **Terracotta** secondary color acts as a warm, earthen accent. 

The background strategy relies on **Oat White** to maintain a "paper" editorial feel. Separation of concerns is achieved through tonal shifts rather than lines; use `surface-container-low` for subtle grouping and `surface-container-highest` for high-contrast structural blocks. UI text remains high-contrast in `on-surface` to ensure legibility against the organic background tones.

## Typography
Typography is the primary driver of the "Architectural" feel. 
- **Oswald** is reserved for high-level brand moments and buttons, utilizing wide tracking to evoke a sense of space and stature.
- **Space Grotesk** headlines provide a technical, modern edge. The tight tracking and bold weight create dense blocks of text that feel like structural headers in an architectural plan.
- **Inter** handles all functional UI and long-form editorial content, providing a neutral, utilitarian balance to the more expressive display faces.

All Headlines and Brand/Display levels must be forced to Uppercase.

## Layout & Spacing
This design system utilizes a **12-column fixed grid** for desktop (max-width 1440px) and a **4-column fluid grid** for mobile. 

The rhythm is intentionally sparse. Vertical spacing between major sections should be aggressive (120px+) to allow the "Botanical Architect" aesthetic to breathe. Content blocks are separated by background color shifts (`surface` to `surface-container-low`) rather than borders, creating a seamless but distinct flow of information. Align all elements to the hard vertical grid lines to reinforce the Brutalist influence.

## Elevation & Depth
Depth is handled through two distinct methods:
1.  **Tonal Stacking:** For standard UI hierarchy, layers are created by moving from light to dark surfaces. No shadows are used for cards or standard containers.
2.  **Ambient Depth:** For floating elements like modals or specific featured product cards, use an extra-diffused shadow: `0px 16px 32px rgba(28, 28, 24, 0.05)`. 
3.  **Navigation:** The primary navigation utilizes glassmorphism (80% opacity Oat White with a 20px background blur) to create a sense of the interface floating above the organic content, maintaining the "journal" feel as the user scrolls.

## Shapes
The shape language is predominantly **Sharp**. 
- Default components (buttons, input fields, images) use a **2px radius**—effectively sharp but softened for high-density screens.
- Larger containers or specific "Architectural" blocks can use a **4px or 8px radius** to denote a change in scale or to wrap groups of elements.
- Icons must follow the ultra-thin 300-weight Material Symbols Outlined specification to maintain a delicate, technical appearance.

## Components
- **Buttons:** Solid `primary` background with `on-primary` text. Typeface: Oswald, Bold, Uppercase. High horizontal padding (32px) and a strict 2px corner radius.
- **Input Fields:** Filled style using `surface-container-highest`. No border. Labels in `Space Grotesk` (uppercase, bold).
- **Cards:** No borders or shadows. Use `surface-container-low` as the card background. Imagery should be full-bleed or framed with 16px internal padding.
- **Navigation:** Glassmorphic top bar. Links in Oswald, wide tracking.
- **Chips:** `outline-variant` background with `on-surface-variant` text. 2px radius.
- **Icons:** Ultra-thin (300 weight) Material Symbols. Always paired with sufficient whitespace; never crowded.
- **Product Tiles:** Focus on high-contrast product photography against the `surface` color, using `Space Grotesk` for price and `Inter` for technical descriptions.