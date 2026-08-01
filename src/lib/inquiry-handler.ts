import { buildInquiryEmail, type InquiryEmail } from './inquiry-email';
import { inquirySchema } from './inquiry';

const maximumPayloadBytes = 32_768;

export type InquiryHandlerDependencies = {
  from: string;
  to: string;
  sendEmail: (message: InquiryEmail) => Promise<void>;
  now?: () => Date;
  logError?: (
    message: string,
    metadata: Record<string, string | number | boolean>,
  ) => void;
};

type ErrorPayload = {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

const jsonResponse = (
  body: ErrorPayload | { ok: true; message: string },
  status: number,
) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });

const isSameOrigin = (request: Request) => {
  const origin = request.headers.get('origin');

  if (!origin) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers
      .get('x-forwarded-host')
      ?.split(',')[0]
      .trim();
    const expectedHost =
      forwardedHost ?? request.headers.get('host') ?? requestUrl.host;
    const forwardedProtocol = request.headers
      .get('x-forwarded-proto')
      ?.split(',')[0]
      .trim();
    const expectedProtocol = forwardedProtocol
      ? `${forwardedProtocol}:`
      : requestUrl.protocol;

    return (
      originUrl.host === expectedHost &&
      originUrl.protocol === expectedProtocol
    );
  } catch {
    return false;
  }
};

export const handleInquiryRequest = async (
  request: Request,
  dependencies: InquiryHandlerDependencies,
) => {
  const requestId = crypto.randomUUID();
  const contentLength = Number(request.headers.get('content-length') ?? 0);

  if (contentLength > maximumPayloadBytes) {
    return jsonResponse(
      {
        ok: false,
        message: 'The request could not be submitted. Please shorten the notes and try again.',
      },
      413,
    );
  }

  if (!isSameOrigin(request)) {
    return jsonResponse(
      {
        ok: false,
        message: 'The request could not be submitted from this page.',
      },
      403,
    );
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: 'The request could not be read. Please try again.',
      },
      400,
    );
  }

  if (rawBody.length > maximumPayloadBytes) {
    return jsonResponse(
      {
        ok: false,
        message: 'The request could not be submitted. Please shorten the notes and try again.',
      },
      413,
    );
  }

  let parsedBody: unknown;

  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: 'The request contains invalid data. Please review the form.',
      },
      400,
    );
  }

  const result = inquirySchema.safeParse(parsedBody);

  if (!result.success) {
    return jsonResponse(
      {
        ok: false,
        message: 'Please review the highlighted fields and submit again.',
        fieldErrors: result.error.flatten().fieldErrors,
      },
      422,
    );
  }

  if (result.data.company.length > 0) {
    return jsonResponse(
      {
        ok: true,
        message: 'Your commission request is in review.',
      },
      200,
    );
  }

  try {
    const message = buildInquiryEmail({
      data: result.data,
      from: dependencies.from,
      to: dependencies.to,
      submittedAt: dependencies.now?.() ?? new Date(),
    });

    await dependencies.sendEmail(message);

    return jsonResponse(
      {
        ok: true,
        message: 'Your commission request is in review.',
      },
      200,
    );
  } catch {
    dependencies.logError?.('Inquiry delivery failed', {
      requestId,
      hasSender: Boolean(dependencies.from),
      hasRecipient: Boolean(dependencies.to),
    });

    return jsonResponse(
      {
        ok: false,
        message:
          'The request could not be delivered. Please wait a moment and try again.',
      },
      503,
    );
  }
};
