---
title: Neoglass Theme Standards
version: v1.0.0
date: 2025-11-03
summary: Hybrid neuromorphic + glass styling system that informs surface tokens, component spacing, and responsive behaviour.
---

# Neoglass – "Where soft light meets sculpted glass"

Neoglass blends neuromorphic tactility with glassmorphism layering to create a tech-luxury interface system. Surfaces must clearly signal depth hierarchy so users instantly recognise background atmosphere, floating glass panels, and tactile controls.

## Core Philosophy

- **Neuromorphic layer** provides pressable, sculpted elements embedded in illuminated sheets.
- **Glass layer** introduces dimensional separation via blur, refraction, and atmospheric gradients.
- Depth is communicated through spacing, blur intensity, and glow diffusion—never by piling high-contrast shadows in tight quarters.

### Depth Stack

1. **Background environment** – subtle gradients + micro-noise to prevent sterile planes.
2. **Glass panel group** – structural sections with rim refraction and hovering shadows.
3. **Neuromorphic surface** – primary interactive controls recessed into panels.
4. **Highlight layer** – focus blooms, reflections, and accent glows.
5. **Content layer** – crisp text/icons sitting above all effects.

## Design Standards

### Background (Depth Floor)

- Use broad, low-contrast gradients (diagonal or radial) with 0.5–2% noise overlays.
- Introduce up to three parallax layers with progressively stronger blur to simulate atmosphere.
- Ensure the deepest layer is the softest; foreground glass remains crisp.

### Glass Panels (Structural Sections)

- Panels should hover with generous gaps; never crowd multiple frosted surfaces.
- Padding: `lg` (desktop 32–64px), `md` (tablet 24–32px), `sm` (mobile 24px) to leave breathing room for interior shadows and glows.
- **Refraction Rim:** Apply a 2–3px edge treatment combining:
  - Slightly stronger blur along the rim.
  - Inner highlight stroke (soft white).
  - Thin outer shadow falloff to imply thickness.
- Shadow tokens `shadow-lg`/`shadow-xl` reinforce floating glass; avoid harsh drop shadows.

### Neuromorphic Elements (Interactive Layer)

- Controls should feel molded into glass rather than floating above it.
- Shadow philosophy:
  - Dual-sided: highlight + shadow pair to reflect diffused light.
  - Extended spreads (16–24px) with low alpha to mimic scattering.
- States:
  - **Hover/Focus:** Add primary-tint smudge glow (use `--glow-light`).
  - **Active/Pressed:** Increase inset shadow to show depression; fade outer rim.
  - **Inactive:** Reduce contrast and add slight extra blur as if encased behind glass.
- Limit high-impact neuromorphic elements per panel to maintain hierarchy.

### Glows & Spacing Rules

- Use primary-hued glows with opacity gradients (`--glow-light|medium|strong`).
- Keep 32px minimum vertical spacing between glow-bearing components; horizontal spacing at least half the vertical distance.
- Prevent overlap between glow halos and text by adjusting layout or reducing glow strength.

### Content Under Glass

- Intensify blur locally under text to guarantee legibility (gradient masks recommended).
- Maintain transparency gradient: center appears thicker (stronger blur), edges lighten for perceived light escape.
- Allow imagery or motion behind glass to subtly warp near edges for realism.

## Responsive Guidance

- Reduce blur and shadow softness on smaller viewports to avoid mudding details.
- Stack panels vertically, preserving air gaps.
- Consolidate control sets (e.g., convert multiple buttons to segmented controls) to save vertical space while keeping rhythm.

## Token Mapping

- **Radii:** Large, pill-forward radii (`0.35rem` → `2.35rem`) ensure softened edges across all components.
- **Shadows:** Use `shadow-control` for primary CTAs, `shadow-interactive` for elevated affordances, and `shadow-xl` for hero panels.
- **Glows:** `--glow-light|medium|strong` deliver smudged bloom effects around focus states and marquee surfaces.

| Domain | Token Reference | Usage Notes |
| --- | --- | --- |
| Radii | `--radius-xs` → `--radius-xl`, `--radius-full` | Maintain pill silhouette for tactile controls and panel edges. |
| Shadows | `--shadow-control`, `--shadow-interactive`, `--shadow-xl` | Respect hierarchy: controls < interactive cards < hero glass. |
| Glows | `--glow-light`, `--glow-medium`, `--glow-strong` | Apply selectively to focused states or flagship panels to avoid visual fatigue. |

## Implementation Checklist

- [x] Rename the former Neumorphic style to **Neoglass** with updated metadata and tokens.
- [x] Extend shadow tokens with `control` and `interactive` tiers.
- [x] Update component showcases to consume Neoglass tokens (no inline `var(--shadow-*)` overrides).
- [x] Employ Neoglass spacing rules in the Theme Testing Ground.
- [ ] Continue refining secondary documentation (e.g., section layout system) to reflect Neoglass terminology.

## References

- Task: `docs/task/Neoglassthemstandards.md`
- Style Definition: `src/theme/styles/neoglass.ts`
- Token Accessors: `src/theme/tokens/*.ts`
- Showcase Integration: `src/components/testing-grounds/theme/ThemeTestingGround.tsx`