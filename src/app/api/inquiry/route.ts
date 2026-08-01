import { Resend } from 'resend';
import { handleInquiryRequest } from '@/lib/inquiry-handler';
import { serverLogger } from '@/lib/logging/server';

export const runtime = 'nodejs';

let resendClient: Resend | null = null;

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  resendClient ??= new Resend(apiKey);
  return resendClient;
};

export async function POST(request: Request) {
  const from = process.env.RESEND_FROM_EMAIL ?? '';
  const to = process.env.INQUIRY_TO_EMAIL ?? '9muservre@gmail.com';

  return handleInquiryRequest(request, {
    from,
    to,
    sendEmail: async (message) => {
      if (!from) {
        throw new Error('RESEND_FROM_EMAIL is not configured.');
      }

      const { error } = await getResend().emails.send({
        from: message.from,
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      if (error) {
        throw new Error('Resend rejected the inquiry email.');
      }
    },
    logError: (message, metadata) => {
      serverLogger.error(message, metadata);
    },
  });
}

