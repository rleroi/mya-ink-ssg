// Afspraakformulier → e-mail via Resend (https://resend.com/docs/api-reference/emails/send-email)
//
// Environment variables (Cloudflare Pages → Settings → Variables, lokaal in .dev.vars):
// - RESEND_API_KEY
// - CONTACT_EMAIL_FROM  bijv. "Mya Ink formulier <formulier@send.mya-ink.nl>" (domein geverifieerd in Resend)
// - CONTACT_EMAIL_TO    bijv. "info@mya-ink.nl"

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  // In stukken, anders loopt String.fromCharCode vast op grote bestanden
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function row(label, value) {
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#5F5B57;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:6px 0;color:#161514">${value}</td>
  </tr>`;
}

export async function onRequestPost(context) {
  const { env, request } = context;

  let formData;
  try {
    formData = await request.formData();
  } catch (e) {
    return new Response('Bad request', { status: 400 });
  }

  const name = formData.get('name')?.toString().trim();
  const address = formData.get('address')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim() || '';
  const days = formData.get('days')?.toString().trim() || '';
  const body = formData.get('body')?.toString().trim();

  if (!name || !address || !body || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    return new Response('Missing or invalid fields', { status: 400 });
  }

  // Geen `instanceof File`: in de Workers-runtime is dat niet betrouwbaar
  const files = formData.getAll('files').filter((file) => typeof file === 'object' && typeof file.arrayBuffer === 'function' && file.size > 0);
  const totalBytes = files.reduce((total, file) => total + file.size, 0);

  if (files.length > MAX_FILES || totalBytes > MAX_TOTAL_BYTES) {
    return new Response('Too many or too large files', { status: 413 });
  }

  const attachments = await Promise.all(files.map(async (file, i) => ({
    filename: file.name || `afbeelding-${i + 1}.jpg`,
    content: toBase64(await file.arrayBuffer()),
  })));

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">
    <h2 style="font-weight:normal;margin:0 0 16px">Nieuwe aanvraag via mya-ink.nl</h2>
    <table style="border-collapse:collapse">
      ${row('Naam', escapeHtml(name))}
      ${row('E-mail', `<a href="mailto:${escapeHtml(address)}">${escapeHtml(address)}</a>`)}
      ${row('Telefoon', escapeHtml(phone) || '–')}
      ${row('Dagen', escapeHtml(days) || '–')}
      ${row('Foto\'s', files.length ? `${files.length} bijlage${files.length === 1 ? '' : 'n'}` : '–')}
    </table>
    <p style="margin:24px 0 8px;color:#5F5B57">Omschrijving</p>
    <p style="margin:0;white-space:pre-wrap">${escapeHtml(body)}</p>
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_EMAIL_FROM,
        to: [env.CONTACT_EMAIL_TO],
        reply_to: address,
        subject: `Aanvraag van ${name}`,
        html,
        attachments,
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text());
      return new Response('Mail error', { status: 502 });
    }

    return new Response('OK', { status: 202 });
  } catch (e) {
    console.error(e.message);
    return new Response('error', { status: 500 });
  }
}

export function onRequestGet() {
  return new Response('Method not allowed', { status: 405 });
}
