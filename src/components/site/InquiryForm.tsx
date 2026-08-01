'use client';

import { AlertCircle, ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import {
  type FormEvent,
  useRef,
  useState,
} from 'react';
import {
  otherVehicleOption,
  getVehicleModels,
  vehicleMakes,
  vehicleYears,
} from '@/data/vehicleCatalog';
import {
  budgetOptions,
  buildInterestOptions,
  transportOptions,
} from '@/lib/inquiry';
import styles from './Site.module.css';

type SubmissionResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

const getTrackingData = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    referrer: document.referrer || window.location.href,
    source: params.get('utm_source') ?? '',
    medium: params.get('utm_medium') ?? '',
    campaign: params.get('utm_campaign') ?? '',
  };
};

export function InquiryForm() {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const statusRef = useRef<HTMLDivElement>(null);

  const models = vehicleMake ? getVehicleModels(vehicleMake) : [];

  const errorFor = (field: string) => fieldErrors[field]?.[0];
  const describedBy = (field: string) =>
    errorFor(field) ? `${field}-error` : undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatusMessage('');
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      vehicleMake: formData.get('vehicleMake'),
      vehicleModel: formData.get('vehicleModel'),
      vehicleYear: formData.get('vehicleYear'),
      otherMake: formData.get('otherMake'),
      otherModel: formData.get('otherModel'),
      buildInterests: formData.getAll('buildInterests'),
      projectNotes: formData.get('projectNotes'),
      budget: formData.get('budget'),
      desiredDate: formData.get('desiredDate'),
      transport: formData.get('transport'),
      consent: formData.get('consent') === 'on',
      company: formData.get('company'),
      ...getTrackingData(),
    };

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as SubmissionResponse;

      if (!response.ok || !result.ok) {
        setStatusMessage(result.message);
        setFieldErrors(result.fieldErrors ?? {});
        window.requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      setSuccess(true);
      setStatusMessage(result.message);
      window.requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatusMessage(
        'The request could not be delivered. Check your connection and try again.',
      );
      window.requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        ref={statusRef}
        className={styles.successState}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 aria-hidden size={32} />
        <p className={styles.eyebrow}>Request Received</p>
        <h3>Your Commission Request Is In Review.</h3>
        <p>
          The inquiry has been received for review. The next conversation will
          focus on platform fit, scope, timing, and the appropriate build path.
        </p>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            setSuccess(false);
            setStatusMessage('');
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form className={styles.inquiryForm} onSubmit={handleSubmit} noValidate>
      {statusMessage ? (
        <div
          ref={statusRef}
          className={styles.errorSummary}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle aria-hidden size={20} />
          <div>
            <strong>Review the request</strong>
            <p>{statusMessage}</p>
          </div>
        </div>
      ) : (
        <div ref={statusRef} className={styles.srOnly} aria-live="polite" />
      )}

      <fieldset className={styles.formSection}>
        <legend>
          <span>01</span>
          Client details
        </legend>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="name">Full name *</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={Boolean(errorFor('name'))}
              aria-describedby={describedBy('name')}
            />
            {errorFor('name') ? (
              <p id="name-error" className={styles.fieldError}>
                {errorFor('name')}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email address *</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errorFor('email'))}
              aria-describedby={describedBy('email')}
            />
            {errorFor('email') ? (
              <p id="email-error" className={styles.fieldError}>
                {errorFor('email')}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="location">City, state, or ZIP code *</label>
            <input
              id="location"
              name="location"
              autoComplete="postal-code"
              required
              aria-invalid={Boolean(errorFor('location'))}
              aria-describedby={describedBy('location')}
            />
            {errorFor('location') ? (
              <p id="location-error" className={styles.fieldError}>
                {errorFor('location')}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.formSection}>
        <legend>
          <span>02</span>
          Vehicle
        </legend>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="vehicleMake">Make *</label>
            <select
              id="vehicleMake"
              name="vehicleMake"
              value={vehicleMake}
              required
              onChange={(event) => {
                setVehicleMake(event.target.value);
                setVehicleModel('');
              }}
              aria-invalid={Boolean(errorFor('vehicleMake'))}
              aria-describedby={describedBy('vehicleMake')}
            >
              <option value="">Select make</option>
              {vehicleMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
            {errorFor('vehicleMake') ? (
              <p id="vehicleMake-error" className={styles.fieldError}>
                {errorFor('vehicleMake')}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="vehicleModel">Model *</label>
            <select
              id="vehicleModel"
              name="vehicleModel"
              value={vehicleModel}
              required
              disabled={!vehicleMake}
              onChange={(event) => setVehicleModel(event.target.value)}
              aria-invalid={Boolean(errorFor('vehicleModel'))}
              aria-describedby={describedBy('vehicleModel')}
            >
              <option value="">
                {vehicleMake ? 'Select model' : 'Select make first'}
              </option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            {errorFor('vehicleModel') ? (
              <p id="vehicleModel-error" className={styles.fieldError}>
                {errorFor('vehicleModel')}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="vehicleYear">Year *</label>
            <select
              id="vehicleYear"
              name="vehicleYear"
              required
              defaultValue=""
              aria-invalid={Boolean(errorFor('vehicleYear'))}
              aria-describedby={describedBy('vehicleYear')}
            >
              <option value="">Select year</option>
              {vehicleYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errorFor('vehicleYear') ? (
              <p id="vehicleYear-error" className={styles.fieldError}>
                {errorFor('vehicleYear')}
              </p>
            ) : null}
          </div>

          {vehicleMake === otherVehicleOption ? (
            <div className={styles.field}>
              <label htmlFor="otherMake">Vehicle make *</label>
              <input
                id="otherMake"
                name="otherMake"
                required
                aria-invalid={Boolean(errorFor('otherMake'))}
                aria-describedby={describedBy('otherMake')}
              />
              {errorFor('otherMake') ? (
                <p id="otherMake-error" className={styles.fieldError}>
                  {errorFor('otherMake')}
                </p>
              ) : null}
            </div>
          ) : (
            <input type="hidden" name="otherMake" value="" />
          )}

          {vehicleModel === otherVehicleOption ? (
            <div className={styles.field}>
              <label htmlFor="otherModel">Vehicle model *</label>
              <input
                id="otherModel"
                name="otherModel"
                required
                aria-invalid={Boolean(errorFor('otherModel'))}
                aria-describedby={describedBy('otherModel')}
              />
              {errorFor('otherModel') ? (
                <p id="otherModel-error" className={styles.fieldError}>
                  {errorFor('otherModel')}
                </p>
              ) : null}
            </div>
          ) : (
            <input type="hidden" name="otherModel" value="" />
          )}
        </div>
      </fieldset>

      <fieldset className={styles.formSection}>
        <legend>
          <span>03</span>
          Build direction
        </legend>
        <div
          className={styles.checkboxGrid}
          aria-describedby={describedBy('buildInterests')}
        >
          {buildInterestOptions.map((option) => (
            <label key={option.value} className={styles.checkboxOption}>
              <input
                type="checkbox"
                name="buildInterests"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errorFor('buildInterests') ? (
          <p id="buildInterests-error" className={styles.fieldError}>
            {errorFor('buildInterests')}
          </p>
        ) : null}

        <div className={styles.field}>
          <label htmlFor="projectNotes">Custom-build notes *</label>
            <textarea
            id="projectNotes"
            name="projectNotes"
            rows={7}
            maxLength={5000}
            required
              placeholder="Describe the vehicle, intended use, service direction, performance goals, and what needs to change."
            aria-invalid={Boolean(errorFor('projectNotes'))}
            aria-describedby={describedBy('projectNotes')}
          />
          {errorFor('projectNotes') ? (
            <p id="projectNotes-error" className={styles.fieldError}>
              {errorFor('projectNotes')}
            </p>
          ) : null}
        </div>
      </fieldset>

      <fieldset className={styles.formSection}>
        <legend>
          <span>04</span>
          Scope and delivery
        </legend>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="budget">Investment range *</label>
            <select
              id="budget"
              name="budget"
              required
              defaultValue=""
              aria-invalid={Boolean(errorFor('budget'))}
              aria-describedby="budget-note"
            >
              <option value="">Select range</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p id="budget-note" className={styles.fieldHint}>
              Used to scope the inquiry. These are not package prices.
            </p>
            {errorFor('budget') ? (
              <p id="budget-error" className={styles.fieldError}>
                {errorFor('budget')}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="desiredDate">Desired completion date</label>
            <input id="desiredDate" name="desiredDate" type="date" />
          </div>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>
            Enclosed transport needed? *
          </span>
          <div className={styles.radioRow}>
            {transportOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="transport"
                  value={option.value}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errorFor('transport') ? (
            <p id="transport-error" className={styles.fieldError}>
              {errorFor('transport')}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company website</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className={styles.consentOption}>
        <input type="checkbox" name="consent" required />
        <span>
          I consent to being contacted about this private build request. *
        </span>
      </label>
      {errorFor('consent') ? (
        <p id="consent-error" className={styles.fieldError}>
          {errorFor('consent')}
        </p>
      ) : null}

      <div className={styles.formFooter}>
        <p>
          Information submitted here is used to review and respond to the build
          request.
        </p>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Send aria-hidden size={18} />
              Sending request
            </>
          ) : (
            <>
              Send My Build Request
              <ArrowUpRight aria-hidden size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
