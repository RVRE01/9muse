'use client';

// 2025-11-03T07:27:00-05:00 - Floating navigation variants demonstrating overflow and submenu intelligence.

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dropdownTokens, overlayTokens, pillTokens } from '@/theme';
import { PromptCopyButton } from './PromptCopyButton';

interface FloatingNavChild {
  id: string;
  label: string;
  description: string;
}

interface FloatingNavItem {
  id: string;
  label: string;
  href?: string;
  children?: readonly FloatingNavChild[];
}

interface FloatingNavScenario {
  id: string;
  sequence: number;
  title: string;
  description: string;
  items: readonly FloatingNavItem[];
  activeItemId?: string;
}

type NavAlignment = 'left' | 'center' | 'right';
type LogoPlacement = 'left' | 'center';

const SCENARIOS: readonly FloatingNavScenario[] = [
  {
    id: 'floating-nav-001-foundation',
    sequence: 1,
    title: 'Baseline floating nav',
    description: 'Token-driven bubble navigation with evenly spaced primary links and no submenus.',
    items: [
      { id: 'home', label: 'Home' },
      { id: 'features', label: 'Features' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'updates', label: 'Updates' },
      { id: 'integrations', label: 'Integrations' },
    ],
    activeItemId: 'features',
  },
  {
    id: 'floating-nav-002-smart-overflow',
    sequence: 2,
    title: 'Smart overflow navigation',
    description: 'Shows overflow affordance when links exceed the available width, keeping top-level layout compact.',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'automations', label: 'Automations' },
      { id: 'customers', label: 'Customers' },
      { id: 'reporting', label: 'Reporting' },
      { id: 'settings', label: 'Settings' },
    ],
    activeItemId: 'automations',
  },
  {
    id: 'floating-nav-003-mega-submenu',
    sequence: 3,
    title: 'Section nav with contextual submenu',
    description: 'When a nav item exposes secondary destinations, the submenu inherits popover tokens for consistent depth.',
    items: [
      { id: 'overview', label: 'Overview' },
      {
        id: 'platform',
        label: 'Platform',
        children: [
          {
            id: 'platform-1',
            label: 'Command Center',
            description: 'Operational dashboard with live metrics and automation triggers.',
          },
          {
            id: 'platform-2',
            label: 'Workflows',
            description: 'Drag-and-drop builder with conditional routing.',
          },
          {
            id: 'platform-3',
            label: 'Data Graph',
            description: 'Unified customer model with governance controls.',
          },
        ],
      },
      {
        id: 'solutions',
        label: 'Solutions',
        children: [
          {
            id: 'solutions-1',
            label: 'Ecommerce',
            description: 'Conversion-focused templates and integrations.',
          },
          {
            id: 'solutions-2',
            label: 'Fintech',
            description: 'Ledger automation with SOC2-ready audit trails.',
          },
        ],
      },
      { id: 'pricing', label: 'Pricing' },
      { id: 'docs', label: 'Docs' },
    ],
    activeItemId: 'platform',
  },
] as const;

function FloatingNavBar({
  items,
  activeItemId,
  openDropdownId,
  onRequestOpen,
  scenarioId,
  alignment,
  showLogo,
  logoPlacement,
  showAvatar,
}: {
  items: readonly FloatingNavItem[];
  activeItemId?: string;
  openDropdownId: string | null;
  onRequestOpen: (itemId: string | null) => void;
  scenarioId: string;
  alignment: NavAlignment;
  showLogo: boolean;
  logoPlacement: LogoPlacement;
  showAvatar: boolean;
}) {
  const pillNeutral = pillTokens.neutral;
  const pillActive = pillTokens.active;
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overflowOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!overflowRef.current?.contains(event.target as Node)) {
        setOverflowOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOverflowOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [overflowOpen]);

  const renderNavItems = (
    subset: readonly FloatingNavItem[],
    groupKey: string,
    allowOverflow: boolean,
    className: string,
  ) => {
    const inlineItems = allowOverflow ? subset.slice(0, 4) : subset;
    const overflowItems = allowOverflow ? subset.slice(4) : [];
    const hasOverflow = allowOverflow && overflowItems.length > 0;
    const dropdownSurface = dropdownTokens.surface;

    return (
      <div className={className}>
        {inlineItems.map((item) => {
          const compoundId = `${scenarioId}-${groupKey}-${item.id}`;
          const isActive = item.id === activeItemId;
          const token = isActive ? pillActive : pillNeutral;
          const isOpen = openDropdownId === compoundId;
          const hasChildren = Boolean(item.children?.length);

          return (
            <div key={compoundId} className="relative">
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-xs rounded-full border px-md py-xs text-sm font-medium capitalize transition-transform duration-200',
                  hasChildren ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-default',
                )}
                style={{
                  background: token.background,
                  color: token.foreground,
                  borderColor: token.border,
                  boxShadow: token.shadow,
                }}
                onClick={() => onRequestOpen(hasChildren ? (isOpen ? null : compoundId) : null)}
                aria-haspopup={hasChildren ? 'menu' : undefined}
                aria-expanded={hasChildren ? isOpen : undefined}
              >
                {item.label}
                {hasChildren ? <ChevronDown className="h-3.5 w-3.5" aria-hidden /> : null}
              </button>
              {hasChildren && isOpen ? (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-[100]">
                  <FloatingSubmenu label={item.label} entries={item.children!} />
                </div>
              ) : null}
            </div>
          );
        })}
        {allowOverflow && hasOverflow ? (
          <div ref={overflowRef} className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-xs rounded-full border px-md py-xs text-sm font-medium capitalize transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: overflowOpen ? pillActive.background : dropdownSurface.controlBackground,
                color: overflowOpen ? pillActive.foreground : dropdownSurface.controlForeground,
                borderColor: dropdownSurface.controlBorder,
                boxShadow: dropdownSurface.menuShadow,
              }}
              onClick={() => {
                setOverflowOpen((previous) => !previous);
                onRequestOpen(null);
              }}
              aria-haspopup="menu"
              aria-expanded={overflowOpen}
            >
              More
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
            {overflowOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[120] flex min-w-[12rem] flex-col gap-xs rounded-xl border border-border bg-card/95 p-sm text-sm shadow-lg backdrop-blur">
                {overflowItems.map((item) => (
                  <button
                    key={`${scenarioId}-${groupKey}-${item.id}`}
                    type="button"
                    className="flex items-center justify-between rounded-lg px-sm py-xs text-left text-sm transition-colors duration-150 hover:bg-muted/40"
                    onClick={() => {
                      setOverflowOpen(false);
                      onRequestOpen(item.children?.length ? `${scenarioId}-${groupKey}-${item.id}` : null);
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children ? <ChevronDown className="h-3 w-3" aria-hidden /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  };

  const alignmentClass: Record<NavAlignment, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const logoNode = showLogo ? (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-muted/70 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
      Logo
    </div>
  ) : null;

  const avatarNode = showAvatar ? (
    <div className={cn('flex items-center gap-xs', showLogo && logoPlacement === 'center' ? 'ml-2' : 'ml-auto')}>
      <div className="h-9 w-9 rounded-full border border-border/60 bg-gradient-to-br from-primary/55 to-secondary/45 shadow-sm" aria-hidden />
      <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">Profile</span>
    </div>
  ) : null;

  if (showLogo && logoPlacement === 'center') {
    const midpoint = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, midpoint);
    const rightItems = items.slice(midpoint);

    return (
      <div className="relative z-[80] flex w-full items-center gap-sm rounded-full border border-border bg-card/90 px-sm py-xs shadow-md backdrop-blur">
        {renderNavItems(leftItems, 'left', false, 'flex flex-1 items-center justify-end gap-xs')}
        {logoNode}
        {renderNavItems(rightItems, 'right', false, 'flex flex-1 items-center justify-start gap-xs')}
        {avatarNode}
      </div>
    );
  }

  return (
    <div className="relative z-[80] flex w-full items-center gap-sm rounded-full border border-border bg-card/90 px-sm py-xs shadow-md backdrop-blur">
      {showLogo ? <div className="pl-sm">{logoNode}</div> : null}
      {renderNavItems(
        items,
        'primary',
        true,
        cn('flex flex-1 items-center gap-xs', alignmentClass[alignment]),
      )}
      {avatarNode}
    </div>
  );
}

function FloatingSubmenu({ label, entries }: { label: string; entries: readonly FloatingNavChild[] }) {
  const token = overlayTokens.popover;
  return (
    <div
      className="flex flex-col gap-sm rounded-2xl border px-md py-md shadow-lg"
      style={{
        background: token.background,
        color: token.foreground,
        borderColor: token.border,
        boxShadow: token.shadow,
      }}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-current/70">{label} • submenu</span>
      <ul className="grid gap-sm" role="list">
        {entries.map((child) => (
          <li
            key={child.id}
            className="rounded-xl border border-border/50 bg-background/60 px-sm py-xs text-sm text-muted-foreground"
          >
            <span className="block font-semibold text-foreground">{child.label}</span>
            <span>{child.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Floating navigation showcase highlighting smart overflow, submenu layout, and token-driven styling.
 */
export function FloatingNavigationShowcase() {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [navAlignment, setNavAlignment] = useState<NavAlignment>('center');
  const [showLogo, setShowLogo] = useState(true);
  const [logoPlacement, setLogoPlacement] = useState<LogoPlacement>('left');
  const [showAvatar, setShowAvatar] = useState(true);

  useEffect(() => {
    if (!openDropdownId) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!showcaseRef.current?.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [openDropdownId]);

  return (
    <section ref={showcaseRef} className="flex flex-col gap-md" aria-labelledby="floating-nav-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="floating-nav-showcase-heading" className="text-lg font-semibold text-foreground">
          Floating navigation variants
        </h3>
        <p className="text-sm text-muted-foreground">
          Bubble navigation, overflow affordances, and contextual submenus rendered with <code className="font-mono">dropdownTokens</code> and <code className="font-mono">overlayTokens</code>.
        </p>
      </header>
      <div className="flex flex-col gap-md px-sm py-sm md:px-md">
        <div className="flex flex-wrap items-center gap-sm">
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Alignment</span>
            <div className="flex items-center gap-xs">
              {(['left', 'center', 'right'] as NavAlignment[]).map((value) => {
                const isActive = navAlignment === value;
                const token = pillTokens[isActive ? 'active' : 'neutral'];
                return (
                  <button
                    key={value}
                    type="button"
                    className="rounded-full border px-sm py-xs text-xs font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: token.background,
                      color: token.foreground,
                      borderColor: token.border,
                      boxShadow: token.shadow,
                    }}
                    aria-pressed={isActive}
                    onClick={() => {
                      setOpenDropdownId(null);
                      setNavAlignment(value);
                    }}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Logo</span>
            <div className="flex items-center gap-xs">
              <button
                type="button"
                className="rounded-full border px-sm py-xs text-xs font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: showLogo ? pillTokens.active.background : pillTokens.neutral.background,
                  color: showLogo ? pillTokens.active.foreground : pillTokens.neutral.foreground,
                  borderColor: showLogo ? pillTokens.active.border : pillTokens.neutral.border,
                  boxShadow: showLogo ? pillTokens.active.shadow : pillTokens.neutral.shadow,
                }}
                aria-pressed={showLogo}
                onClick={() => {
                  setOpenDropdownId(null);
                  setShowLogo((previous) => {
                    const next = !previous;
                    if (!next) {
                      setLogoPlacement('left');
                    }
                    return next;
                  });
                }}
              >
                {showLogo ? 'Logo on' : 'Logo off'}
              </button>
              <button
                type="button"
                className="rounded-full border px-sm py-xs text-xs font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background:
                    showLogo && logoPlacement === 'left'
                      ? pillTokens.active.background
                      : pillTokens.neutral.background,
                  color:
                    showLogo && logoPlacement === 'left'
                      ? pillTokens.active.foreground
                      : pillTokens.neutral.foreground,
                  borderColor:
                    showLogo && logoPlacement === 'left'
                      ? pillTokens.active.border
                      : pillTokens.neutral.border,
                  boxShadow:
                    showLogo && logoPlacement === 'left'
                      ? pillTokens.active.shadow
                      : pillTokens.neutral.shadow,
                }}
                aria-pressed={showLogo && logoPlacement === 'left'}
                disabled={!showLogo}
                onClick={() => {
                  if (!showLogo) return;
                  setOpenDropdownId(null);
                  setLogoPlacement('left');
                }}
              >
                Logo left
              </button>
              <button
                type="button"
                className="rounded-full border px-sm py-xs text-xs font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background:
                    showLogo && logoPlacement === 'center'
                      ? pillTokens.active.background
                      : pillTokens.neutral.background,
                  color:
                    showLogo && logoPlacement === 'center'
                      ? pillTokens.active.foreground
                      : pillTokens.neutral.foreground,
                  borderColor:
                    showLogo && logoPlacement === 'center'
                      ? pillTokens.active.border
                      : pillTokens.neutral.border,
                  boxShadow:
                    showLogo && logoPlacement === 'center'
                      ? pillTokens.active.shadow
                      : pillTokens.neutral.shadow,
                }}
                aria-pressed={showLogo && logoPlacement === 'center'}
                disabled={!showLogo}
                onClick={() => {
                  if (!showLogo) return;
                  setOpenDropdownId(null);
                  setLogoPlacement('center');
                }}
              >
                Logo center
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Profile avatar</span>
            <button
              type="button"
              className="rounded-full border px-sm py-xs text-xs font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: showAvatar ? pillTokens.active.background : pillTokens.neutral.background,
                color: showAvatar ? pillTokens.active.foreground : pillTokens.neutral.foreground,
                borderColor: showAvatar ? pillTokens.active.border : pillTokens.neutral.border,
                boxShadow: showAvatar ? pillTokens.active.shadow : pillTokens.neutral.shadow,
              }}
              aria-pressed={showAvatar}
              onClick={() => {
                setOpenDropdownId(null);
                setShowAvatar((previous) => !previous);
              }}
            >
              {showAvatar ? 'Avatar on' : 'Avatar off'}
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-lg">
        {SCENARIOS.map((scenario) => (
          <article
            key={scenario.id}
            className="relative flex flex-col gap-sm rounded-2xl border border-border/60 bg-card/85 p-md shadow-sm backdrop-blur"
          >
            <PromptCopyButton
              className="absolute right-sm top-sm"
              prompt={[
                `use the FloatingNavigation component variant ${scenario.sequence.toString().padStart(2, '0')}`,
                `scenario: ${scenario.title}`,
                `alignment: ${navAlignment}`,
                `logo: ${showLogo ? `enabled (${logoPlacement})` : 'disabled'}`,
                `profile avatar: ${showAvatar ? 'enabled' : 'disabled'}`,
                `nav items: ${scenario.items.map((item) => item.label).join(', ')}`,
              ].join(' | ')}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-wide">
                {scenario.sequence.toString().padStart(2, '0')} · {scenario.id}
              </span>
              <span>
                {`Align ${navAlignment} · ${showLogo ? `Logo ${logoPlacement}` : 'No logo'} · ${
                  showAvatar ? 'Avatar on' : 'Avatar off'
                }`}
              </span>
            </div>
            <h4 className="text-base font-semibold text-foreground">{scenario.title}</h4>
            <p className="text-sm text-muted-foreground">{scenario.description}</p>
            <FloatingNavBar
              items={scenario.items}
              activeItemId={scenario.activeItemId}
              openDropdownId={openDropdownId}
              onRequestOpen={setOpenDropdownId}
              scenarioId={`${scenario.id}__align-${navAlignment}__logo-${showLogo ? logoPlacement : 'none'}__avatar-${
                showAvatar ? 'on' : 'off'
              }`}
              alignment={navAlignment}
              showLogo={showLogo}
              logoPlacement={logoPlacement}
              showAvatar={showAvatar}
            />
            {scenario.items.some((item) => item.children?.length) ? (
              <div className="grid gap-sm md:grid-cols-2">
                {scenario.items
                  .filter((item): item is FloatingNavItem & { children: readonly FloatingNavChild[] } =>
                    Array.isArray(item.children) && item.children.length > 0,
                  )
                  .map((item) => (
                    <FloatingSubmenu key={`${scenario.id}-${item.id}`} label={item.label} entries={item.children} />
                  ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
