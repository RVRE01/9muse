import { z } from 'zod';

export const buildInterestOptions = [
  { value: 'detailing', label: 'Detailing, PPF, interior, or exterior' },
  { value: 'wrap-tint', label: 'Wrap and tint' },
  { value: 'bodywork-paint-restoration', label: 'Bodywork, paint, or restoration' },
  { value: 'performance-dyno', label: 'Performance and dyno packages' },
  { value: 'complete-build', label: 'Complete multi-category build' },
  { value: 'consultation', label: 'Unsure - consultation requested' },
] as const;

export const budgetOptions = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-50k', label: '$25,000-$50,000' },
  { value: '50k-100k', label: '$50,000-$100,000' },
  { value: '100k-200k', label: '$100,000-$200,000' },
  { value: '200k-plus', label: '$200,000+' },
  { value: 'guidance', label: 'Need guidance' },
] as const;

export const transportOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
] as const;

const interestValues = buildInterestOptions.map((option) => option.value);
const budgetValues = budgetOptions.map((option) => option.value);
const transportValues = transportOptions.map((option) => option.value);

const requiredText = (label: string, maximum: number) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(maximum, `${label} is too long.`);

const optionalText = (maximum: number) =>
  z.string().trim().max(maximum, 'This value is too long.').optional().default('');

export const inquirySchema = z
  .object({
    name: requiredText('Full name', 120),
    email: z
      .string({ error: 'Email address is required.' })
      .trim()
      .email('Enter a valid email address.')
      .max(254, 'Email address is too long.')
      .transform((value) => value.toLowerCase()),
    phone: optionalText(40),
    location: requiredText('City, state, or ZIP code', 160),
    vehicleMake: requiredText('Vehicle make', 80),
    vehicleModel: requiredText('Vehicle model', 100),
    vehicleYear: requiredText('Vehicle year', 24),
    otherMake: optionalText(80),
    otherModel: optionalText(100),
    buildInterests: z
      .array(z.enum(interestValues))
      .min(1, 'Select at least one build interest.')
      .max(interestValues.length),
    projectNotes: requiredText('Project notes', 5000),
    budget: z.enum(budgetValues, {
      error: 'Select an investment range.',
    }),
    desiredDate: z
      .string()
      .trim()
      .max(10)
      .refine(
        (value) => value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value),
        'Enter a valid desired completion date.',
      )
      .optional()
      .default(''),
    transport: z.enum(transportValues, {
      error: 'Select a transport preference.',
    }),
    consent: z.literal(true, {
      error: 'Consent is required before submitting.',
    }),
    company: optionalText(120),
    referrer: optionalText(1000),
    source: optionalText(120),
    medium: optionalText(120),
    campaign: optionalText(120),
  })
  .superRefine((value, context) => {
    if (
      value.vehicleMake === 'Other / Not Listed' &&
      value.otherMake.length === 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['otherMake'],
        message: 'Enter the vehicle make.',
      });
    }

    if (
      value.vehicleModel === 'Other / Not Listed' &&
      value.otherModel.length === 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['otherModel'],
        message: 'Enter the vehicle model.',
      });
    }
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryData = z.output<typeof inquirySchema>;

export const labelForInterest = (value: string) =>
  buildInterestOptions.find((option) => option.value === value)?.label ?? value;

export const labelForBudget = (value: string) =>
  budgetOptions.find((option) => option.value === value)?.label ?? value;

export const labelForTransport = (value: string) =>
  transportOptions.find((option) => option.value === value)?.label ?? value;
