import type { ThemeStylePackage } from "../types";

export const smoothStyle: ThemeStylePackage = {
  id: "smooth",
  metadata: {
    id: "smooth",
    displayName: "Smooth",
    description:
      "Default smooth style with rounded corners and balanced depth cues.",
    audience: "General purpose applications requiring approachable feel.",
    principles: [
      "Rounded corners for friendliness",
      "Moderate shadows for clarity",
      "Subtle glows for interactive feedback",
    ],
  },
  tokens: {
    radii: Object.freeze({
      none: "0px",
      xs: "0.125rem",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      full: "9999px",
    }),
    shadows: Object.freeze({
      none: "none",
      xs: "calc(var(--theme-shadow-x-factor, 0.15) * 2px) calc(var(--theme-shadow-y-factor, 1) * 4px) 10px -3px var(--theme-light-lowlight)",
      sm: "calc(var(--theme-shadow-x-factor, 0.25) * 4px) calc(var(--theme-shadow-y-factor, 1) * 8px) 18px -6px var(--theme-light-lowlight)",
      md: "calc(var(--theme-shadow-x-factor, 0.35) * 6px) calc(var(--theme-shadow-y-factor, 1) * 12px) 26px -8px var(--theme-light-lowlight)",
      lg: "calc(var(--theme-shadow-x-factor, 0.45) * 10px) calc(var(--theme-shadow-y-factor, 1) * 18px) 42px -10px color-mix(in srgb, var(--theme-light-lowlight) 80%, transparent)",
      xl: "calc(var(--theme-shadow-x-factor, 0.55) * 16px) calc(var(--theme-shadow-y-factor, 1) * 28px) 68px -12px color-mix(in srgb, var(--theme-light-lowlight) 82%, transparent)",
      focus: "0 0 0 4px color-mix(in srgb, var(--theme-light-highlight) 55%, transparent)",
      control:
        "calc(var(--theme-shadow-x-factor, 0.35) * 6px) calc(var(--theme-shadow-y-factor, 1) * 14px) 28px -8px var(--theme-light-lowlight), inset 0 1px 0 var(--theme-light-highlight)",
      interactive:
        "calc(var(--theme-shadow-x-factor, 0.45) * 10px) calc(var(--theme-shadow-y-factor, 1) * 20px) 48px -10px var(--theme-light-lowlight), 0 0 0 1px color-mix(in srgb, var(--theme-light-highlight) 40%, transparent)",
    }),
    glows: Object.freeze({
      light: "0 0 24px var(--theme-light-highlight)",
      medium: "0 0 36px color-mix(in srgb, var(--theme-light-highlight) 75%, transparent)",
      strong: "0 0 48px color-mix(in srgb, var(--theme-light-highlight) 95%, transparent)",
    }),
  },
};
