import assert from 'node:assert/strict';
import test from 'node:test';
import { handleInquiryRequest } from './inquiry-handler';
import type { InquiryEmail } from './inquiry-email';

const validPayload = {
  name: 'Jordan Rivera',
  email: 'jordan@example.com',
  phone: '201-555-0142',
  location: 'Hoboken, NJ',
  vehicleMake: 'Porsche',
  vehicleModel: '911',
  vehicleYear: '2024',
  otherMake: '',
  otherModel: '',
  buildInterests: ['detailing', 'performance-dyno'],
  projectNotes:
    'Develop a coordinated finish and performance direction for weekend road use.',
  budget: '50k-100k',
  desiredDate: '2027-05-01',
  transport: 'unsure',
  consent: true,
  company: '',
  referrer: 'https://9muse.example/?utm_source=search',
  source: 'search',
  medium: 'organic',
  campaign: '',
};

const makeRequest = (body: unknown, origin = 'https://9muse.example') =>
  new Request('https://9muse.example/api/inquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin,
    },
    body: JSON.stringify(body),
  });

test('valid inquiry builds and sends the complete email without a live provider', async () => {
  let delivered: InquiryEmail | null = null;

  const response = await handleInquiryRequest(makeRequest(validPayload), {
    from: '9 Muse Customs <builds@9muse.example>',
    to: '9muservre@gmail.com',
    now: () => new Date('2026-07-23T12:00:00.000Z'),
    sendEmail: async (message) => {
      delivered = message;
    },
  });

  assert.equal(response.status, 200);
  assert.ok(delivered);
  const sent = delivered as InquiryEmail;
  assert.equal(sent.to, '9muservre@gmail.com');
  assert.equal(sent.replyTo, 'jordan@example.com');
  assert.match(sent.subject, /2024 Porsche 911/);
  assert.match(sent.html, /Hoboken, NJ/);
  assert.match(sent.text, /Enclosed transport: Unsure/);
});

test('server validation returns field errors and does not send', async () => {
  let sendCount = 0;
  const response = await handleInquiryRequest(
    makeRequest({ ...validPayload, email: 'not-an-email', buildInterests: [] }),
    {
      from: 'builds@9muse.example',
      to: '9muservre@gmail.com',
      sendEmail: async () => {
        sendCount += 1;
      },
    },
  );

  const body = (await response.json()) as {
    fieldErrors: Record<string, string[]>;
  };

  assert.equal(response.status, 422);
  assert.equal(sendCount, 0);
  assert.ok(body.fieldErrors.email);
  assert.ok(body.fieldErrors.buildInterests);
});

test('cross-origin requests are rejected before delivery', async () => {
  let sendCount = 0;
  const response = await handleInquiryRequest(
    makeRequest(validPayload, 'https://malicious.example'),
    {
      from: 'builds@9muse.example',
      to: '9muservre@gmail.com',
      sendEmail: async () => {
        sendCount += 1;
      },
    },
  );

  assert.equal(response.status, 403);
  assert.equal(sendCount, 0);
});

test('the browser origin is matched against the forwarded request host', async () => {
  let sendCount = 0;
  const request = new Request('http://localhost:3000/api/inquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'http://127.0.0.1:3000',
      host: '127.0.0.1:3000',
    },
    body: JSON.stringify(validPayload),
  });

  const response = await handleInquiryRequest(request, {
    from: 'builds@9muse.example',
    to: '9muservre@gmail.com',
    sendEmail: async () => {
      sendCount += 1;
    },
  });

  assert.equal(response.status, 200);
  assert.equal(sendCount, 1);
});

test('provider failures return a generic client response', async () => {
  const response = await handleInquiryRequest(makeRequest(validPayload), {
    from: 'builds@9muse.example',
    to: '9muservre@gmail.com',
    sendEmail: async () => {
      throw new Error('provider credential detail');
    },
  });

  const body = (await response.json()) as { message: string };

  assert.equal(response.status, 503);
  assert.equal(
    body.message,
    'The request could not be delivered. Please wait a moment and try again.',
  );
  assert.doesNotMatch(body.message, /credential|provider/i);
});

test('honeypot submissions receive a generic success without delivery', async () => {
  let sendCount = 0;
  const response = await handleInquiryRequest(
    makeRequest({ ...validPayload, company: 'bot value' }),
    {
      from: 'builds@9muse.example',
      to: '9muservre@gmail.com',
      sendEmail: async () => {
        sendCount += 1;
      },
    },
  );

  assert.equal(response.status, 200);
  assert.equal(sendCount, 0);
});
