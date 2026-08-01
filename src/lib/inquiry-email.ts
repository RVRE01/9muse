import {
  labelForBudget,
  labelForInterest,
  labelForTransport,
  type InquiryData,
} from './inquiry';

export type InquiryEmail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const displayMake = (data: InquiryData) =>
  data.vehicleMake === 'Other / Not Listed' ? data.otherMake : data.vehicleMake;

const displayModel = (data: InquiryData) =>
  data.vehicleModel === 'Other / Not Listed'
    ? data.otherModel
    : data.vehicleModel;

const fieldRow = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 16px 10px 0;color:#8f98a4;font-size:12px;text-transform:uppercase;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;color:#f5f7f9;font-size:15px;line-height:1.6;">${escapeHtml(value || 'Not provided')}</td>
  </tr>`;

export const buildInquiryEmail = ({
  data,
  from,
  to,
  submittedAt,
}: {
  data: InquiryData;
  from: string;
  to: string;
  submittedAt: Date;
}): InquiryEmail => {
  const make = displayMake(data);
  const model = displayModel(data);
  const interests = data.buildInterests.map(labelForInterest);
  const subject = `New 9 Muse Build Request - ${data.vehicleYear} ${make} ${model} - ${data.name}`;
  const fields = [
    ['Submitted', submittedAt.toISOString()],
    ['Client', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Location', data.location],
    ['Vehicle', `${data.vehicleYear} ${make} ${model}`],
    ['Build interests', interests.join(', ')],
    ['Investment range', labelForBudget(data.budget)],
    ['Desired completion', data.desiredDate],
    ['Enclosed transport', labelForTransport(data.transport)],
    ['Referring page', data.referrer],
    [
      'Campaign',
      [data.source, data.medium, data.campaign].filter(Boolean).join(' / '),
    ],
    ['Project notes', data.projectNotes],
  ] as const;

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#08090b;color:#f5f7f9;font-family:Arial,sans-serif;">
    <div style="max-width:720px;margin:0 auto;padding:32px 20px;">
      <div style="border-top:4px solid #ef402a;background:#11151a;padding:28px;border-radius:10px;">
        <p style="margin:0 0 10px;color:#ef402a;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Private Build Intake</p>
        <h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;">${escapeHtml(
          `${data.vehicleYear} ${make} ${model}`,
        )}</h1>
        <table role="presentation" style="border-collapse:collapse;width:100%;border-top:1px solid #2a3037;">
          ${fields.map(([label, value]) => fieldRow(label, value)).join('')}
        </table>
        <p style="margin:24px 0 0;color:#aeb5bf;font-size:13px;line-height:1.6;">Reply to this message to contact ${escapeHtml(
          data.name,
        )} at ${escapeHtml(data.email)}.</p>
      </div>
    </div>
  </body>
</html>`;

  const text = [
    'NEW 9 MUSE BUILD REQUEST',
    '',
    ...fields.map(([label, value]) => `${label}: ${value || 'Not provided'}`),
    '',
    `Reply to: ${data.name} <${data.email}>`,
  ].join('\n');

  return {
    from,
    to,
    replyTo: data.email,
    subject,
    html,
    text,
  };
};

