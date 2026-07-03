// 2025-11-03T01:28:00-05:00 - Gradient helpers centralize CSS string generation for theme tokens.

import type { ThemeGradientTokens } from "./types";

export interface GradientStop {
  color: string;
  position: string;
}

export interface LinearGradientConfig {
  angle?: string;
  stops: GradientStop[];
}

export const linearGradient = ({ angle = "135deg", stops }: LinearGradientConfig): string =>
  `linear-gradient(${angle}, ${stops
    .map((stop) => `${stop.color} ${stop.position}`)
    .join(", ")})`;

export const freezeGradients = (tokens: ThemeGradientTokens): ThemeGradientTokens =>
  Object.freeze({ ...tokens });

// 2025-11-03T01:28:00-05:00 - Add radial/conic helpers here when design tokens expand beyond linear gradients.
