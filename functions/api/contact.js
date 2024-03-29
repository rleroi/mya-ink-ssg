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
    res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: context.env.CONTACT_EMAIL_TO,
                name: 'Mya Ink',
              },
            ],
          },
        ],
        from: {
          email: context.env.CONTACT_EMAIL_FROM,
          name: 'Mya Ink Contactformulier',
        },
        reply_to: {
          email: formData.get('address'),
          name: formData.get('name'),
        },
        subject: 'Mya Ink Contactformulier',
        content: [
          {
            type: 'text/html',
            value: `<p><strong>Van</strong>: ${formData.get('name')}</p>
            <p><strong>Email</strong>: ${formData.get('address')}</p>
            <p><strong>Tel</strong>: ${formData.get('phone') || ''}</p>
            <p><strong>Dagen</strong>: ${formData.get('days') || ''}</p>
            <p><strong>Beschrijving</strong>:</p>
            <p>${formData.get('body')?.replaceAll(/\r?\n/g, '<br>')}</p>`,
          },
        ],
        attachments: attachments,
      }),
      headers: {
        'Authorization': 'Bearer ' + context.env.SENDGRID_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (res.ok) {
      return new Response('OK', {status: 202});
    } else {
      console.error(await res?.json());
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

