// 2025-11-03T08:25:00-05:00 - Radius tokens orchestrated via theme style registry.

import { DEFAULT_THEME_STYLE_ID, resolveThemeStyle } from "../styles";
import type { RadiiTokens, ThemeStyleId } from "../types";

const defaultStyle = resolveThemeStyle(DEFAULT_THEME_STYLE_ID);

export const radiiTokens: RadiiTokens = defaultStyle.tokens.radii;

export const getRadiiTokens = (
  styleId: ThemeStyleId = DEFAULT_THEME_STYLE_ID,
): RadiiTokens => resolveThemeStyle(styleId).tokens.radii;

// 2025-11-03T08:25:00-05:00 - Extend style registry when introducing new density systems.
