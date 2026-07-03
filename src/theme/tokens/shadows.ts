// 2025-11-03T07:45:00-05:00 - Shadow token definitions for layered elevation cues.

import {
  DEFAULT_THEME_STYLE_ID,
  resolveThemeStyle,
} from "../styles";
import type { ShadowTokens, ThemeStyleId } from "../types";

const defaultStyle = resolveThemeStyle(DEFAULT_THEME_STYLE_ID);

export const shadowTokens: ShadowTokens = defaultStyle.tokens.shadows;

export const getShadowTokens = (
  styleId: ThemeStyleId = DEFAULT_THEME_STYLE_ID,
): ShadowTokens => resolveThemeStyle(styleId).tokens.shadows;

// 2025-11-03T07:45:00-05:00 - Shadow tokens sourced from style registry; extend packages as lighting models grow.
