// 2025-11-03T01:36:00-05:00 - Ember variant emphasizes warm reds and ambers.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#E11D48",
  primaryForeground: "#FFFFFF",
  secondary: "#FB923C",
  secondaryForeground: "#3B1005",
  accent: "#FCD34D",
  accentForeground: "#422006",
  success: "#22C55E",
  warning: "#F97316",
  danger: "#DB2777",
  info: "#F97316",
  background: "#FFF7F0",
  foreground: "#3B1005",
  surface: "#FFEBDD",
  surfaceForeground: "#3B1005",
  card: "#FFF1E4",
  cardForeground: "#3B1005",
  muted: "#F8D7C2",
  mutedForeground: "#74301A",
  border: "#F5B49D",
  ring: "#FB7185",
  textStrong: "#3B1005",
  textMuted: "#8C3C24",
};

const darkPalette: ThemePalette = {
  primary: "#FB7185",
  primaryForeground: "#35060E",
  secondary: "#7C2D12",
  secondaryForeground: "#FED7AA",
  accent: "#FBBF24",
  accentForeground: "#3B1005",
  success: "#34D399",
  warning: "#FB923C",
  danger: "#F472B6",
  info: "#F97316",
  background: "#210608",
  foreground: "#FFE4E6",
  surface: "#2D0B10",
  surfaceForeground: "#FFE4E6",
  card: "#3A1015",
  cardForeground: "#FFE4E6",
  muted: "#4A151A",
  mutedForeground: "#F59E9D",
  border: "#5B1B22",
  ring: "#FB7185",
  textStrong: "#FFEDEF",
  textMuted: "#F59E9D",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFF7F0", position: "0%" },
      { color: "#FFE5D7", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "145deg",
    stops: [
      { color: "#FFEBDD", position: "0%" },
      { color: "#FFD6BA", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#E11D48", position: "0%" },
      { color: "#FB7185", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FCD34D", position: "0%" },
      { color: "#FDE68A", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#210608", position: "0%" },
      { color: "#3A1015", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "145deg",
    stops: [
      { color: "#2D0B10", position: "0%" },
      { color: "#4A151A", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#FB7185", position: "0%" },
      { color: "#F472B6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FBBF24", position: "0%" },
      { color: "#FDE047", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "ember",
  displayName: "Ember",
  description: "Bold ember tones suited for marketing and campaigns.",
  audience: "Acquisition & promotions",
  contrastRating: "AA",
  category: "playful",
};

const emberVariant: ThemeVariantPackage = {
  id: "ember",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default emberVariant;

// 2025-11-03T01:36:00-05:00 - Refresh when seasonal campaigns adjust palette saturation.
