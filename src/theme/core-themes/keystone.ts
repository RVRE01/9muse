// 2025-11-03T12:16:00-05:00 - Keystone variant emphasizes trustworthy teals for enterprise workflows.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#0F766E",
  primaryForeground: "#F0FDFA",
  secondary: "#134E4A",
  secondaryForeground: "#E0F2F1",
  accent: "#14B8A6",
  accentForeground: "#042F2E",
  success: "#15803D",
  warning: "#B45309",
  danger: "#B91C1C",
  info: "#0EA5E9",
  background: "#F2FBFA",
  foreground: "#0B1F1E",
  surface: "#E0F7F4",
  surfaceForeground: "#0B1F1E",
  card: "#E6FAF6",
  cardForeground: "#0B1F1E",
  muted: "#CDEDE8",
  mutedForeground: "#14524E",
  border: "#B6E3DC",
  ring: "#0F766E",
  textStrong: "#0B1F1E",
  textMuted: "#14524E",
};

const darkPalette: ThemePalette = {
  primary: "#2DD4BF",
  primaryForeground: "#052321",
  secondary: "#0B3B38",
  secondaryForeground: "#CCFBF1",
  accent: "#14B8A6",
  accentForeground: "#052321",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#F87171",
  info: "#38BDF8",
  background: "#021613",
  foreground: "#DCFDFC",
  surface: "#062520",
  surfaceForeground: "#DCFDFC",
  card: "#0A3130",
  cardForeground: "#DCFDFC",
  muted: "#12413E",
  mutedForeground: "#5EEAD4",
  border: "#144C48",
  ring: "#2DD4BF",
  textStrong: "#F0FDFA",
  textMuted: "#5EEAD4",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#F2FBFA", position: "0%" },
      { color: "#D8F3EF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "148deg",
    stops: [
      { color: "#E6FAF6", position: "0%" },
      { color: "#CDEDE8", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#0F766E", position: "0%" },
      { color: "#14B8A6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#14B8A6", position: "0%" },
      { color: "#5EEAD4", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#021613", position: "0%" },
      { color: "#0A3130", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "148deg",
    stops: [
      { color: "#062520", position: "0%" },
      { color: "#12413E", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#2DD4BF", position: "0%" },
      { color: "#14B8A6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#14B8A6", position: "0%" },
      { color: "#5EEAD4", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "keystone",
  displayName: "Keystone",
  description: "Steadfast teal palette for compliance tooling and approvals.",
  audience: "Governance & compliance",
  contrastRating: "AAA",
  category: "enterprise",
};

const keystoneVariant: ThemeVariantPackage = {
  id: "keystone",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default keystoneVariant;

// 2025-11-03T12:16:00-05:00 - Refresh teal ramp when security posture visuals evolve.
