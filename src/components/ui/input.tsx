'use client';

// 2025-11-03T05:32:00-05:00 - Token-driven input primitives with validation and formatting harnesses.

import { ChangeEvent, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import dayjs from 'dayjs';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  buttonTokens,
  dropdownTokens,
  fieldTokens,
  toggleTokens,
  type ButtonVariant,
  type DropdownVariant,
  type FieldVariant,
} from '@/theme';
import { formatPhoneNumber, sanitizePhoneNumber } from '@/lib/phone';

/**
 * Supported interactive control types for the input showcase.
 */
export type InputKind =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'number'
  | 'search'
  | 'url'
  | 'phone'
  | 'datetime'
  | 'range'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'file';

/**
 * Metadata describing a single input variation rendered inside the testing ground.
 */
export interface InputVariantDefinition {
  /** Stable identifier (e.g., used for analytics or QA references). */
  id: string;
  /** Numerical ordering for deterministic rendering. */
  sequence: number;
  /** Input category (text, email, checkbox, etc.). */
  kind: InputKind;
  /** Human readable label placed above the control. */
  label: string;
  /** Supplementary description explaining the scenario. */
  description: string;
  /** Placeholder for textual inputs. */
  placeholder?: string;
  /** Default value for text-like inputs. */
  defaultValue?: string;
  /** Default checked state for boolean-based controls. */
  defaultChecked?: boolean;
  /** Optional helper copy rendered beneath the control. */
  helperText?: string;
  /** Field token variant to apply (default, filled, etc.). */
  fieldVariant?: FieldVariant;
  /** Allowable options for radio-style controls. */
  options?: readonly string[];
}

/**
 * Ordered catalogue of input variants exercised within the testing ground.
 */
export const inputVariants: readonly InputVariantDefinition[] = Object.freeze([
  {
    id: 'input-001-text',
    sequence: 1,
    kind: 'text',
    label: 'Project title',
    description: 'Baseline text input validating minimum character length.',
    placeholder: 'Atlas redesign',
    fieldVariant: 'default',
  },
  {
    id: 'input-002-email',
    sequence: 2,
    kind: 'email',
    label: 'Notification email',
    description: 'Ensures proper RFC-5322 email formatting with live validation.',
    placeholder: 'team@borealis.io',
    fieldVariant: 'default',
  },
  {
    id: 'input-003-password',
    sequence: 3,
    kind: 'password',
    label: 'Service token',
    description: 'Password requirements enforce length and mixed characters.',
    placeholder: '••••••••',
    fieldVariant: 'default',
  },
  {
    id: 'input-004-textarea',
    sequence: 4,
    kind: 'textarea',
    label: 'Executive summary',
    description: 'Multiline textarea with helper copy and max length validation.',
    placeholder: 'Summarize the launch narrative…',
    helperText: 'Aim for fewer than 280 characters to keep dashboards tidy.',
    fieldVariant: 'filled',
  },
  {
    id: 'input-005-number',
    sequence: 5,
    kind: 'number',
    label: 'Seats requested',
    description: 'Numeric input constrained between 1 and 500 inclusive.',
    placeholder: '42',
    defaultValue: '12',
    fieldVariant: 'default',
  },
  {
    id: 'input-006-search',
    sequence: 6,
    kind: 'search',
    label: 'Global search',
    description: 'Search variant validates non-empty queries and trims whitespace.',
    placeholder: 'Search incidents or alerts…',
    fieldVariant: 'filled',
  },
  {
    id: 'input-007-url',
    sequence: 7,
    kind: 'url',
    label: 'Webhook endpoint',
    description: 'URL field with https enforcement and failure messaging.',
    placeholder: 'https://hooks.borealis.io/deploy',
    fieldVariant: 'default',
  },
  {
    id: 'input-008-phone',
    sequence: 8,
    kind: 'phone',
    label: 'On-call phone number',
    description: 'Auto-formats US numbers while tolerating international prefixes.',
    placeholder: '(555) 123-4567',
    fieldVariant: 'default',
  },
  {
    id: 'input-009-datetime',
    sequence: 9,
    kind: 'datetime',
    label: 'Maintenance window',
    description: 'Paired date/time inputs surface formatted range output via Day.js.',
    defaultValue: dayjs().add(1, 'day').hour(14).minute(30).toISOString(),
    fieldVariant: 'default',
  },
  {
    id: 'input-010-range',
    sequence: 10,
    kind: 'range',
    label: 'Risk tolerance',
    description: 'Slider enforces values between 0 and 100 with live display.',
    defaultValue: '35',
    fieldVariant: 'default',
  },
  {
    id: 'input-011-color',
    sequence: 11,
    kind: 'color',
    label: 'Brand accent color',
    description: 'Color picker renders selected hex value for verification.',
    defaultValue: '#3B82F6',
    fieldVariant: 'default',
  },
  {
    id: 'input-012-checkbox',
    sequence: 12,
    kind: 'checkbox',
    label: 'Enable anomaly detection',
    description: 'Checkbox toggles validation ensuring a boolean payload.',
    defaultChecked: true,
  },
  {
    id: 'input-013-radio',
    sequence: 13,
    kind: 'radio',
    label: 'Billing cadence',
    description: 'Radio group validates against allowed enumerations.',
    options: ['Monthly', 'Quarterly', 'Annually'],
    defaultValue: 'Monthly',
  },
  {
    id: 'input-014-switch',
    sequence: 14,
    kind: 'switch',
    label: 'Dark mode auto-detect',
    description: 'Switch control uses toggle tokens and reports boolean state.',
    defaultChecked: false,
  },
  {
    id: 'input-015-file',
    sequence: 15,
    kind: 'file',
    label: 'Upload compliance report',
    description: 'File input validates extension and exposes chosen filename.',
    helperText: 'Accepts PDF or CSV attachments up to 10MB.',
  },
]);

const textualKinds = new Set<InputKind>([
  'text',
  'email',
  'password',
  'textarea',
  'number',
  'search',
  'url',
  'phone',
]);

type SchemaMap = Partial<Record<InputKind, z.ZodTypeAny>>;

const inputSchemas: SchemaMap = {
  text: z.string().min(3, 'Enter at least 3 characters.'),
  email: z.string().email('Provide a valid email address.'),
  password: z
    .string()
    .min(8, 'Minimum of 8 characters.')
    .regex(/[A-Z]/, 'Include an uppercase character.')
    .regex(/[0-9]/, 'Include at least one digit.'),
  textarea: z.string().max(280, 'Keep summaries under 280 characters.'),
  number: z.coerce
    .number()
    .min(1, 'Minimum value is 1.')
    .max(500, 'Maximum value is 500.'),
  search: z.string().trim().min(1, 'Search queries cannot be empty.'),
  url: z.string().url('Only valid URLs are accepted.'),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,}$/g, 'Provide at least 10 digits.'),
  datetime: z.object({
    date: z.string().refine((value) => dayjs(value, 'YYYY-MM-DD', true).isValid(), {
      message: 'Select a valid date.',
    }),
    time: z.string().refine((value) => dayjs(value, 'HH:mm', true).isValid(), {
      message: 'Select a valid time.',
    }),
  }),
  range: z.coerce
    .number()
    .min(0)
    .max(100),
  color: z.string().regex(/^#([A-Fa-f0-9]{6})$/, 'Pick a 6-digit hex color.'),
  checkbox: z.boolean(),
  radio: z.string(),
  switch: z.boolean(),
  file: z
    .string()
    .regex(/\.(pdf|csv)$/i, 'Only PDF or CSV files are permitted.')
    .optional(),
};

const fieldClassName =
  'w-full rounded-xl border px-md py-sm text-sm outline-none transition-all duration-150 focus:shadow-lg';
const textareaClassName = cn(fieldClassName, 'min-h-[6.5rem] resize-y');
const dropdownControlClassName =
  'w-full rounded-xl border px-md py-sm text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const toggleBaseClass =
  'inline-flex items-center justify-center border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function resolveFieldStyle(variant: FieldVariant = 'default'): CSSProperties {
  const token = fieldTokens[variant];
  return {
    background: token.background,
    color: token.foreground,
    borderColor: token.border,
    boxShadow: token.focusShadow,
  } satisfies CSSProperties;
}

function resolveCheckboxStyle(checked: boolean): CSSProperties {
  const token = toggleTokens.checkbox[checked ? 'checked' : 'unchecked'];
  return {
    background: token.background,
    color: token.foreground,
    borderColor: token.border,
    boxShadow: token.focusShadow,
  } satisfies CSSProperties;
}

function resolveRadioStyle(checked: boolean): CSSProperties {
  const token = toggleTokens.radio[checked ? 'checked' : 'unchecked'];
  return {
    background: token.background,
    borderColor: token.border,
    boxShadow: token.focusShadow,
  } satisfies CSSProperties;
}

function resolveSwitchStyle(state: 'on' | 'off' | 'disabled'): CSSProperties {
  const token = toggleTokens.switch[state];
  return {
    background: token.track,
    borderColor: token.border,
    boxShadow: token.focusShadow,
  } satisfies CSSProperties;
}

function resolveSwitchThumb(state: 'on' | 'off' | 'disabled'): CSSProperties {
  const token = toggleTokens.switch[state];
  return {
    background: token.background,
    color: token.foreground,
    boxShadow: token.focusShadow,
  } satisfies CSSProperties;
}

function resolveFileButtonStyle(variant: ButtonVariant = 'primary'): CSSProperties {
  const token = buttonTokens[variant];
  return {
    background: token.background,
    color: token.foreground,
    borderColor: token.border,
  } satisfies CSSProperties;
}

function resolveDropdownControlStyle(variant: DropdownVariant = 'surface'): CSSProperties {
  const token = dropdownTokens[variant];
  return {
    background: token.controlBackground,
    color: token.controlForeground,
    borderColor: token.controlBorder,
    boxShadow: token.menuShadow,
  } satisfies CSSProperties;
}

interface InputCardProps {
  definition: InputVariantDefinition;
}

/**
 * Renders a token-driven input control with built-in validation, formatting, and meta output.
 */
export function InputVariantCard({ definition }: InputCardProps) {
  const initialText = useMemo(() => {
    if (definition.kind === 'phone' && definition.defaultValue) {
      return formatPhoneNumber(definition.defaultValue);
    }
    if (definition.kind === 'radio' && definition.defaultValue) {
      return definition.defaultValue;
    }
    return definition.defaultValue ?? '';
  }, [definition.defaultValue, definition.kind]);

  const [textValue, setTextValue] = useState<string>(initialText);
  const [boolValue, setBoolValue] = useState<boolean>(definition.defaultChecked ?? false);
  const [radioValue, setRadioValue] = useState<string>(
    definition.defaultValue ?? definition.options?.[0] ?? '',
  );
  const [fileName, setFileName] = useState<string>('');
  const [dateValue, setDateValue] = useState<string>(
    definition.kind === 'datetime' && definition.defaultValue
      ? dayjs(definition.defaultValue).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
  );
  const [timeValue, setTimeValue] = useState<string>(
    definition.kind === 'datetime' && definition.defaultValue
      ? dayjs(definition.defaultValue).format('HH:mm')
      : dayjs().format('HH:mm'),
  );
  const [rangeValue, setRangeValue] = useState<number>(
    definition.defaultValue ? Number(definition.defaultValue) : 50,
  );
  const [colorValue, setColorValue] = useState<string>(definition.defaultValue ?? '#3B82F6');
  const [error, setError] = useState<string | null>(null);

  const schema = inputSchemas[definition.kind];

  const runValidation = (payload: unknown) => {
    if (!schema) {
      setError(null);
      return;
    }
    const result = schema.safeParse(payload);
    if (result.success) {
      setError(null);
    } else {
      setError(result.error.issues[0]?.message ?? 'Invalid value.');
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let nextValue = event.target.value;
    if (definition.kind === 'phone') {
      const sanitized = sanitizePhoneNumber(nextValue);
      nextValue = formatPhoneNumber(sanitized);
      runValidation(sanitized);
    } else if (definition.kind === 'number' || definition.kind === 'range') {
      const numeric = Number(nextValue);
      runValidation(Number.isNaN(numeric) ? nextValue : numeric);
    } else if (definition.kind === 'url') {
      nextValue = nextValue.trim();
      runValidation(nextValue);
    } else if (definition.kind === 'search') {
      runValidation(nextValue.trim());
    } else {
      runValidation(nextValue);
    }
    setTextValue(nextValue);
  };

  const handleCheckboxToggle = () => {
    const next = !boolValue;
    setBoolValue(next);
    runValidation(next);
  };

  const handleSwitchToggle = () => {
    const next = !boolValue;
    setBoolValue(next);
    runValidation(next);
  };

  const handleRadioChange = (option: string) => {
    setRadioValue(option);
    runValidation(option);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const name = file?.name ?? '';
    setFileName(name);
    runValidation(name ? `.${name.split('.').pop() ?? ''}` : undefined);
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numeric = Number(event.target.value);
    setRangeValue(numeric);
    runValidation(numeric);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextDate = event.target.value;
    setDateValue(nextDate);
    runValidation({ date: nextDate, time: timeValue });
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = event.target.value;
    setTimeValue(nextTime);
    runValidation({ date: dateValue, time: nextTime });
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextColor = event.target.value;
    setColorValue(nextColor);
    runValidation(nextColor);
  };

  const formattedDateTime = useMemo(() => {
    if (definition.kind !== 'datetime') {
      return null;
    }
    if (!dateValue || !timeValue) {
      return 'Awaiting selection…';
    }
    const combined = dayjs(`${dateValue}T${timeValue}`);
    if (!combined.isValid()) {
      return 'Invalid selection';
    }
    return `${combined.format('MMMM D, YYYY h:mm A')} (UTC${combined.format('Z')})`;
  }, [dateValue, timeValue, definition.kind]);

  let control: ReactNode = null;

  if (textualKinds.has(definition.kind)) {
    if (definition.kind === 'textarea') {
      control = (
        <textarea
          value={textValue}
          onChange={handleTextChange}
          placeholder={definition.placeholder}
          className={textareaClassName}
          style={resolveFieldStyle(definition.fieldVariant)}
          aria-label={definition.label}
        />
      );
    } else {
      const type = definition.kind === 'phone' ? 'tel' : definition.kind;
      control = (
        <input
          value={textValue}
          onChange={handleTextChange}
          placeholder={definition.placeholder}
          className={fieldClassName}
          style={resolveFieldStyle(definition.fieldVariant)}
          aria-label={definition.label}
          type={type}
        />
      );
    }
  } else {
    switch (definition.kind) {
      case 'datetime':
        control = (
          <div className="grid gap-sm sm:grid-cols-2">
            <input
              type="date"
              value={dateValue}
              onChange={handleDateChange}
              className={dropdownControlClassName}
              style={resolveDropdownControlStyle('surface')}
              aria-label={`${definition.label} date`}
            />
            <input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className={dropdownControlClassName}
              style={resolveDropdownControlStyle('surface')}
              aria-label={`${definition.label} time`}
            />
          </div>
        );
        break;
      case 'range':
        control = (
          <input
            type="range"
            min={0}
            max={100}
            value={rangeValue}
            onChange={handleRangeChange}
            className="w-full"
            style={{
              accentColor: dropdownTokens.surface.controlBorder,
            }}
            aria-label={definition.label}
          />
        );
        break;
      case 'color':
        control = (
          <input
            type="color"
            value={colorValue}
            onChange={handleColorChange}
            className="h-12 w-16 rounded-md border"
            style={resolveDropdownControlStyle('surface')}
            aria-label={definition.label}
          />
        );
        break;
      case 'checkbox':
        control = (
          <button
            type="button"
            onClick={handleCheckboxToggle}
            className={cn(toggleBaseClass, 'h-6 w-6 rounded')}
            style={resolveCheckboxStyle(boolValue)}
            role="checkbox"
            aria-checked={boolValue}
          >
            {boolValue ? '✓' : ''}
          </button>
        );
        break;
      case 'radio':
        control = (
          <div className="flex flex-col gap-xs">
            {definition.options?.map((option) => {
              const checked = radioValue === option;
              return (
                <button
                  key={`${definition.id}-${option}`}
                  type="button"
                  onClick={() => handleRadioChange(option)}
                  className={cn(toggleBaseClass, 'h-6 w-6 rounded-full')}
                  style={resolveRadioStyle(checked)}
                  role="radio"
                  aria-checked={checked}
                  aria-label={`${definition.label} ${option}`}
                >
                  {checked ? '•' : ''}
                </button>
              );
            })}
          </div>
        );
        break;
      case 'switch':
        control = (
          <button
            type="button"
            role="switch"
            aria-checked={boolValue}
            onClick={handleSwitchToggle}
            className={cn('relative flex h-8 w-14 items-center rounded-full transition-transform duration-300')}
            style={resolveSwitchStyle(boolValue ? 'on' : 'off')}
          >
            <span
              className="absolute h-6 w-6 rounded-full transition-all duration-300"
              style={{
                ...resolveSwitchThumb(boolValue ? 'on' : 'off'),
                transform: `translateX(${boolValue ? '1.5rem' : '0.25rem'})`,
              }}
            />
            <span className="sr-only">{definition.label}</span>
          </button>
        );
        break;
      case 'file':
        control = (
          <label className="inline-flex cursor-pointer items-center gap-sm">
            <span
              className="rounded-full border px-lg py-sm text-sm font-semibold transition-colors duration-200"
              style={resolveFileButtonStyle('primary')}
            >
              Choose file
            </span>
            <input
              type="file"
              accept=".pdf,.csv"
              className="sr-only"
              onChange={handleFileChange}
            />
            <span className="text-xs text-muted-foreground">
              {fileName ? fileName : 'No file selected'}
            </span>
          </label>
        );
        break;
      default:
        control = null;
    }
  }

  return (
    <article
      className="flex flex-col gap-sm rounded-2xl border border-border/70 bg-card/85 p-md shadow-sm backdrop-blur"
      data-input-id={definition.id}
    >
      <header className="flex flex-col gap-xs">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wide">
            {definition.sequence.toString().padStart(2, '0')} · {definition.id}
          </span>
          <span>{definition.kind}</span>
        </div>
        <h4 className="text-base font-semibold text-foreground">{definition.label}</h4>
        <p className="text-sm text-muted-foreground">{definition.description}</p>
      </header>

      {control}

      {definition.helperText ? (
        <p className="text-xs text-muted-foreground">{definition.helperText}</p>
      ) : null}

      {definition.kind === 'range' ? (
        <p className="text-xs text-muted-foreground">Current value: {rangeValue}</p>
      ) : null}

      {definition.kind === 'color' ? (
        <p className="text-xs text-muted-foreground">Hex value: {colorValue.toUpperCase()}</p>
      ) : null}

      {definition.kind === 'phone' ? (
        <p className="text-xs text-muted-foreground">Formatted: {textValue || 'Awaiting input'}</p>
      ) : null}

      {definition.kind === 'datetime' && formattedDateTime ? (
        <p className="text-xs text-muted-foreground">Selected window: {formattedDateTime}</p>
      ) : null}

      {definition.kind === 'radio' ? (
        <p className="text-xs text-muted-foreground">Selected option: {radioValue}</p>
      ) : null}

      {definition.kind === 'switch' || definition.kind === 'checkbox' ? (
        <p className="text-xs text-muted-foreground">State: {boolValue ? 'Enabled' : 'Disabled'}</p>
      ) : null}

      {definition.kind === 'file' ? (
        <p className="text-xs text-muted-foreground">
          {fileName ? 'Uploaded file recognized.' : 'Awaiting selection.'}
        </p>
      ) : null}

      {error ? <p className="text-xs font-medium text-danger">{error}</p> : null}
    </article>
  );
}
