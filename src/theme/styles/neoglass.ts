import type { ThemeStylePackage } from "../types";

export const neoglassStyle: ThemeStylePackage = {
  id: "neoglass",
  metadata: {
    id: "neoglass",
    displayName: "Neoglass",
    description: "Hybrid neuromorphic + glass treatment with floating panels and tactile controls.",
    audience: "Luxury-grade dashboards, experiential marketing, and immersive product surfaces.",
    principles: [
      "Layered glass panels define contextual depth zones",
      "Neuromorphic controls appear pressed into illuminated sheets",
      "Smudged primary-tint glows telegraph focus and motion",
    ],
    notes:
      "Balance glass blur against neuromorphic shadows; allow breathing room so glows and parallax gradients never collide.",
  },
  tokens: {
    radii: Object.freeze({
      none: "0px",
      xs: "0.35rem",
      sm: "0.65rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2.35rem",
      full: "9999px",
    }),
    shadows: Object.freeze({
      none: "none",
      xs: "0 18px 34px -24px rgba(15, 23, 42, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.32)",
      sm: "0 26px 52px -28px rgba(15, 23, 42, 0.4), 0 2px 6px rgba(255, 255, 255, 0.22)",
      md: "0 36px 64px -28px rgba(15, 23, 42, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.16)",
      lg: "0 48px 96px -36px rgba(15, 23, 42, 0.46), 0 14px 36px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.2)",
      xl: "0 64px 128px -40px rgba(15, 23, 42, 0.5), 0 20px 48px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.22)",
      focus:
        "0 0 0 1px color-mix(in srgb, var(--color-primary) 48%, transparent), 0 0 0 12px color-mix(in srgb, var(--color-primary) 16%, transparent)",
      control:
        "0 12px 28px -12px rgba(15, 23, 42, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.45)",
      interactive:
        "0 18px 44px -14px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.18), 0 32px 72px -36px color-mix(in srgb, var(--color-primary) 24%, transparent)",
    }),
    glows: Object.freeze({
      light: "0 38px 72px -30px color-mix(in srgb, var(--color-primary) 26%, transparent)",
      medium: "0 56px 118px -44px color-mix(in srgb, var(--color-primary) 33%, transparent)",
      strong: "0 74px 160px -58px color-mix(in srgb, var(--color-primary) 40%, transparent)",
    }),
  },
};
