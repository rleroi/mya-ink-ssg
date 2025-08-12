export async function onRequestPost(context) {
  const formData = await context.request.formData();

  let attachments = null;

  const file = formData.get('file');
  const fileName = formData.get('fileName') || 'attachment.jpg';
  if (file) {
    attachments = [
      {
        content: file,
        filename: fileName,
        disposition: 'attachment',
      },
    ];
  }

  let res = null;
  try {
    // Mailgun API endpoint - replace YOUR_DOMAIN with your actual Mailgun domain
    const mailgunUrl = `https://api.mailgun.net/v3/${context.env.MAILGUN_DOMAIN}/messages`;
    
    // Create form data for Mailgun
    const mailgunFormData = new FormData();
    
    // Basic email fields - use simple format for Mailgun
    mailgunFormData.append('from', context.env.CONTACT_EMAIL_FROM);
    mailgunFormData.append('to', context.env.CONTACT_EMAIL_TO);
    mailgunFormData.append('reply-to', formData.get('address'));
    mailgunFormData.append('subject', 'Mya Ink Contactformulier');

    // HTML content
    const htmlContent = `<p><strong>Van</strong>: ${formData.get('name')}</p>
    <p><strong>Email</strong>: ${formData.get('address')}</p>
    <p><strong>Tel</strong>: ${formData.get('phone') || ''}</p>
    <p><strong>Dagen</strong>: ${formData.get('days') || ''}</p>
    <p><strong>Beschrijving</strong>:</p>
    <p>${formData.get('body')?.replaceAll(/\r?\n/g, '<br>')}</p>`;
    
    mailgunFormData.append('html', htmlContent);
    
    // Add attachment if present
    if (file) {
      // Convert base64 to Uint8Array for Cloudflare Workers
      const binaryString = atob(file);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const fileBlob = new Blob([bytes], { type: 'image/jpeg' });
      mailgunFormData.append('attachment', fileBlob, fileName);
    }

    res = await fetch(mailgunUrl, {
      method: 'POST',
      body: mailgunFormData,
      headers: {
        'Authorization': 'Basic ' + btoa('api:' + context.env.MAILGUN_API_KEY),
      }
    });

    if (res.ok) {
      const responseText = await res.text();
      console.log('Mailgun success response:', responseText);
      return new Response('OK', {status: 202});
    } else {
      const errorData = await res.text();
      console.error('Mailgun error:', errorData);
      return new Response('http error', {status: 500});
    }
  } catch(e) {
    console.error(e.message);
    return new Response('error', {status: 500});
  }
}

export function onRequestGet(context) {
  return new Response("Method not allowed", {status: 405})
}

