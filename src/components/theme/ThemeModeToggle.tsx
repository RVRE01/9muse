'use client';

// 2025-11-02T22:50:20-05:00 - Floating toggle for light/dark switching.

import { useEffect, useMemo, useRef, useState } from 'react';
import { MoonStar, Sparkles, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { pillTokens, themeColors, type ThemeColorMode } from '@/theme';
import type { ThemeStyleId, ThemeVariantId } from '@/theme/types';
import { cn } from '@/lib/utils';
import { useThemeRegistry } from './ThemeRootProvider';

interface ThemeModeToggleProps {
  className?: string;
}

// 2025-11-03T03:12:30-05:00 - Floating toggle with adjacent variant badge for discoverability.

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [variantsOpen, setVariantsOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeVariantMetadata,
    variantMetadata,
    setActiveVariantId,
    activeStyleId,
    activeStyleMetadata,
    styleMetadata,
    setActiveStyleId,
  } = useThemeRegistry();

  useEffect(() => {
    const animationId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(animationId);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme ?? 'light' : theme;
  const isDark = resolvedTheme === 'dark';
  const currentThemeMode: ThemeColorMode = isDark ? 'dark' : 'light';
  const nextTheme: ThemeColorMode = currentThemeMode === 'dark' ? 'light' : 'dark';
  const nextAccent = themeColors[nextTheme].accent;
  const currentAccent = themeColors[currentThemeMode].accent;
  const accentSwatchStyle = useMemo(() => (mounted ? { backgroundColor: currentAccent } : undefined), [mounted, currentAccent]);
  const toggleTitle = useMemo(
    () =>
      mounted
        ? `Switch to ${nextTheme} mode (accent ${nextAccent}) · Variant: ${activeVariantMetadata.displayName} · Style: ${activeStyleMetadata.displayName}`
        : 'Toggle color mode',
    [activeStyleMetadata.displayName, activeVariantMetadata.displayName, mounted, nextAccent, nextTheme],
  );
  const variantOrder: ThemeVariantId[] = variantMetadata.map((entry) => entry.id);
  const hasMultipleVariants = variantOrder.length > 1;
  const hasMultipleStyles = styleMetadata.length > 1;

  useEffect(() => {
    if (!variantsOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setVariantsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setVariantsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [variantsOpen]);

  useEffect(() => {
    if (!stylesOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setStylesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setStylesOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [stylesOpen]);

  const handleVariantSelect = (variantId: ThemeVariantId) => {
    setActiveVariantId(variantId);
    setVariantsOpen(false);
  };

  const handleStyleSelect = (styleId: ThemeStyleId) => {
    setActiveStyleId(styleId);
    setStylesOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-md right-md z-50 flex flex-col items-end gap-sm">
      <div className="relative inline-flex items-center gap-sm">
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-sm rounded-full border border-border bg-card/90 px-sm py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-sm backdrop-blur transition-colors duration-200',
            hasMultipleVariants ? 'hover:text-foreground' : 'cursor-default text-muted-foreground',
          )}
          onClick={() => {
            if (hasMultipleVariants) {
              setVariantsOpen((previous) => !previous);
            }
          }}
          aria-expanded={variantsOpen}
          aria-haspopup="listbox"
          disabled={!hasMultipleVariants}
        >
          <span className="h-2.5 w-2.5 rounded-full shadow-sm" style={accentSwatchStyle} aria-hidden />
          <span>{activeVariantMetadata.displayName}</span>
        </button>
        {variantsOpen && hasMultipleVariants ? (
          <div className="absolute bottom-12 right-0 flex min-w-[12rem] flex-col gap-1 rounded-2xl border border-border bg-card/95 p-sm text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-xl backdrop-blur">
            {variantMetadata.map((variantEntry) => {
              const pillStyle = pillTokens[
                variantEntry.id === activeVariantMetadata.id ? 'active' : 'neutral'
              ];

              return (
                <button
                  key={variantEntry.id}
                  type="button"
                  onClick={() => handleVariantSelect(variantEntry.id)}
                  className="flex items-center gap-sm rounded-full border px-sm py-xs text-left transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: pillStyle.background,
                    color: pillStyle.foreground,
                    borderColor: pillStyle.border,
                    boxShadow: pillStyle.shadow,
                  }}
                  aria-pressed={variantEntry.id === activeVariantMetadata.id}
                >
                  <span className="flex-1 text-[0.7rem] font-semibold">
                    {variantEntry.displayName}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      {hasMultipleStyles ? (
        <div className="relative inline-flex items-center gap-sm">
          <button
            type="button"
            className="inline-flex items-center gap-sm rounded-full border border-border bg-card/90 px-sm py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-sm backdrop-blur transition-colors duration-200 hover:text-foreground"
            onClick={() => setStylesOpen((previous) => !previous)}
            aria-expanded={stylesOpen}
            aria-haspopup="listbox"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            <span>{activeStyleMetadata.displayName}</span>
          </button>
          {stylesOpen ? (
            <div className="absolute bottom-12 right-0 flex min-w-[12rem] flex-col gap-1 rounded-2xl border border-border bg-card/95 p-sm text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-xl backdrop-blur">
              {styleMetadata.map((styleEntry) => {
                const pillStyle = pillTokens[styleEntry.id === activeStyleId ? 'active' : 'neutral'];

                return (
                  <button
                    key={styleEntry.id}
                    type="button"
                    onClick={() => handleStyleSelect(styleEntry.id)}
                    className="flex items-center gap-sm rounded-full border px-sm py-xs text-left transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: pillStyle.background,
                      color: pillStyle.foreground,
                      borderColor: pillStyle.border,
                      boxShadow: pillStyle.shadow,
                    }}
                    aria-pressed={styleEntry.id === activeStyleId}
                  >
                    <span className="flex-1 text-[0.7rem] font-semibold">
                      {styleEntry.displayName}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Toggle color mode"
        title={toggleTitle}
        onClick={() => setTheme(nextTheme)}
        className={cn(
          'inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring',
          'backdrop-blur',
          className,
        )}
      >
        <span className="sr-only">Switch theme</span>
        {mounted ? (
          isDark ? (
            <Sun className="h-5 w-5" aria-hidden />
          ) : (
            <MoonStar className="h-5 w-5" aria-hidden />
          )
        ) : (
          <span className="h-5 w-5 animate-pulse rounded-full border border-muted" />
        )}
      </button>
    </div>
  );
}

// 2025-11-02T22:50:20-05:00 - Add analytics hooks here when tracking theme preference adoption.
