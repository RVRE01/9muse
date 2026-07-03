'use client';

// 2025-11-03T08:15:00-05:00 - Reusable prompt copy control with tooltip preview for component variants.

import { useId, useState } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';

import { cn } from '@/lib/utils';

type PromptCopyButtonProps = {
  prompt: string;
  className?: string;
  tooltipLabel?: string;
};

export function PromptCopyButton({ prompt, className, tooltipLabel = 'Copy prompt' }: PromptCopyButtonProps) {
  const tooltipId = useId();
  const [isHovering, setIsHovering] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1600);
    } catch (error) {
      console.error('Failed to copy prompt', error);
    }
  };

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-label={tooltipLabel}
        onClick={handleCopy}
        className={cn(
          'relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground shadow-sm transition-transform duration-200',
          'hover:-translate-y-0.5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring',
        )}
      >
        {hasCopied ? <ClipboardCheck className="h-4 w-4" aria-hidden /> : <Clipboard className="h-4 w-4" aria-hidden />}
        <span className="sr-only">{tooltipLabel}</span>
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute right-0 top-[calc(100%+0.5rem)] z-[70] w-56 rounded-xl border border-border/70 bg-popover p-sm text-left shadow-lg transition-opacity duration-150',
          isHovering ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prompt preview</span>
        <p className="mt-1 text-xs font-mono leading-5 text-muted-foreground/90 whitespace-pre-wrap">{prompt}</p>
      </div>
    </div>
  );
}
