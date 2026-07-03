// 2025-11-03T03:04:00-05:00 - Glow tokens provide atmospheric shadows for dark and vibrant themes.

import {
  DEFAULT_THEME_STYLE_ID,
  resolveThemeStyle,
} from "../styles";
import type { GlowTokens, ThemeStyleId } from "../types";

const defaultStyle = resolveThemeStyle(DEFAULT_THEME_STYLE_ID);

export const glowTokens: GlowTokens = defaultStyle.tokens.glows;

export const getGlowTokens = (
  styleId: ThemeStyleId = DEFAULT_THEME_STYLE_ID,
): GlowTokens => resolveThemeStyle(styleId).tokens.glows;

// 2025-11-03T07:45:00-05:00 - Glow tokens sourced from style registry; extend style packages when ambient rules evolve.
