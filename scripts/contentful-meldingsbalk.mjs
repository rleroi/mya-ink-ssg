// Maakt in Contentful het content type "Meldingsbalk" aan, met één entry die klaarstaat (balk uit).
// Veilig om opnieuw te draaien: bestaande onderdelen worden overgeslagen.
//
// Gebruik:
//   CONTENTFUL_MANAGEMENT_TOKEN=... SPACE_ID=... node scripts/contentful-meldingsbalk.mjs
//
// Token aanmaken: Contentful → Settings → CMA tokens → Create personal access token.

import 'dotenv/config';

const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const space = process.env.SPACE_ID;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!token || !space) {
  console.error('Zet CONTENTFUL_MANAGEMENT_TOKEN en SPACE_ID.');
  process.exit(1);
}

const base = `https://api.contentful.com/spaces/${space}/environments/${environment}`;

async function api(method, path, { body, headers = {} } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 404 && method === 'GET') {
    return null;
  }

  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

const locales = await api('GET', '/locales');
const locale = locales.items.find((item) => item.default).code;
console.log(`Standaardtaal: ${locale}`);

// 1. Content type
let contentType = await api('GET', '/content_types/melding');

if (!contentType) {
  contentType = await api('PUT', '/content_types/melding', {
    body: {
      name: 'Meldingsbalk',
      description: 'De paarse balk bovenaan de website, bijvoorbeeld bij vakantie.',
      displayField: 'tekst',
      fields: [
        { id: 'actief', name: 'Balk tonen', type: 'Boolean', required: true },
        { id: 'tekst', name: 'Tekst', type: 'Symbol', required: true, validations: [{ size: { max: 200 } }] },
      ],
    },
  });
  contentType = await api('PUT', '/content_types/melding/published', {
    headers: { 'X-Contentful-Version': contentType.sys.version },
  });
  console.log('Content type "Meldingsbalk" aangemaakt.');
} else {
  console.log('Content type "Meldingsbalk" bestaat al.');
}

// 2. Schakelaar met Aan/Uit en uitleg in de editor
const editorInterface = await api('GET', '/content_types/melding/editor_interface');
await api('PUT', '/content_types/melding/editor_interface', {
  headers: { 'X-Contentful-Version': editorInterface.sys.version },
  body: {
    controls: [
      {
        fieldId: 'actief',
        widgetNamespace: 'builtin',
        widgetId: 'boolean',
        settings: {
          trueLabel: 'Aan',
          falseLabel: 'Uit',
          helpText: 'Zet op Aan om de balk bovenaan de website te tonen. Klik daarna rechts op Publish.',
        },
      },
      {
        fieldId: 'tekst',
        widgetNamespace: 'builtin',
        widgetId: 'singleLine',
        settings: {
          helpText: 'Kort houden, bijvoorbeeld: Tijdelijk gesloten wegens vakantie t/m 3 november. Aanvragen beantwoord ik daarna.',
        },
      },
    ],
  },
});
console.log('Editor ingesteld (schakelaar Aan/Uit).');

// 3. Eén entry die klaarstaat, balk uit
let entry = await api('GET', '/entries/meldingsbalk');

if (!entry) {
  entry = await api('PUT', '/entries/meldingsbalk', {
    headers: { 'X-Contentful-Content-Type': 'melding' },
    body: {
      fields: {
        actief: { [locale]: false },
        tekst: { [locale]: 'Tijdelijk gesloten wegens vakantie t/m [datum]. Aanvragen beantwoord ik daarna.' },
      },
    },
  });
  await api('PUT', '/entries/meldingsbalk/published', {
    headers: { 'X-Contentful-Version': entry.sys.version },
  });
  console.log('Entry "Meldingsbalk" aangemaakt en gepubliceerd (balk uit).');
} else {
  console.log('Entry "Meldingsbalk" bestaat al.');
}

console.log('Klaar.');
