async function toBase64(file) {
  const arrayBuffer = await file.arrayBuffer();

  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))); 
}

export async function onRequestPost(context) {
  const formData = await context.request.formData();

  let attachments = [];

  if (formData.get('file')?.size) {
    const fileAsBase64 = await toBase64(formData.get('file'));
    attachments = [
      {
        content: fileAsBase64,
        filename: formData.get('file')?.name,
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
                email: 'info@mya-ink.nl',
                name: 'Mya Ink',
              },
            ],
          },
        ],
        from: {
          email: 'info@mya-ink.nl',
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
            value: `<p><strong>Van</strong>: ${formData.get('name') || ''}</p>
            <p><strong>Email</strong>: ${formData.get('address') || ''}</p>
            <p><strong>Tel</strong>: ${formData.get('phone') || ''}</p>
            <p><strong>Beschrijving</strong>:</p>
            <p>${formData.get('body') || ''}</p>`,
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
      return new Response('OK');
    } else {
      return new Response('http error');
    }
  } catch(e) {
    console.error(e.message);
    return new Response('error');
  }
}

export function onRequestGet(context) {
  return new Response("Method not allowed")
}
