// Per-page title, description and indexing for <head>, plus the business details for JSON-LD.

export const SITE_URL = 'https://mya-ink.nl';

const SUFFIX = 'Mya Ink Tattooshop Woerden';

const pages = {
  '/': {
    title: 'Mya Ink – Tattooshop in Woerden | Tattoos op maat',
    description: 'Tattoostudio Mya Ink in Woerden: unieke tattoos op maat in een private studio. Fine line, black and grey, kleur, cover-ups en meer. Maak een afspraak.',
  },
  '/portfolio': {
    title: `Portfolio – ${SUFFIX}`,
    description: 'Bekijk recent werk van Mya Ink: fine line, black and grey, kleur, watercolor, cover-ups en custom tattoos. Tattoostudio in Woerden.',
  },
  '/afspraak': {
    title: `Afspraak maken – ${SUFFIX}`,
    description: 'Vraag een tattoo-afspraak aan bij Mya Ink in Woerden. Beschrijf je idee, stuur voorbeeldfoto’s mee en je hoort binnen 3 werkdagen van me.',
  },
  '/faq': {
    title: `Veelgestelde vragen – ${SUFFIX}`,
    description: 'Antwoorden over afspraken, aanbetaling, custom ontwerpen en de tattoosessie bij Mya Ink, tattooshop in Woerden.',
  },
  '/risicos': {
    title: `Risico’s van een tattoo – ${SUFFIX}`,
    description: 'Wat je moet weten over de risico’s van een tattoo en wanneer je beter kunt wachten. Informatie van Mya Ink, tattooshop in Woerden.',
  },
  '/nazorg': {
    title: `Nazorg voor je tattoo – ${SUFFIX}`,
    description: 'Nazorgadvies voor een mooie, snelle genezing van je nieuwe tattoo: benodigdheden en stap voor stap het genezingsproces.',
  },
  '/privacyverklaring': {
    title: `Privacyverklaring – ${SUFFIX}`,
    description: 'Hoe Mya Ink omgaat met je persoonsgegevens, bijvoorbeeld als je het afspraakformulier invult.',
  },
  '/slideshow': {
    title: 'Slideshow – Mya Ink',
    description: 'Slideshow voor in de studio.',
    noindex: true,
  },
};

function toText(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max = 155) {
  if (text.length <= max) {
    return text;
  }
  return text.slice(0, text.lastIndexOf(' ', max - 1)) + '…';
}

export function getSeo(pageContext) {
  const path = (pageContext.urlPathname || '/').replace(/\/+$/, '') || '/';
  const page = pageContext.pageProps?.page;
  const known = pages[path];

  // Pages are served as folders, so the final URL has a trailing slash (except the home page)
  const url = SITE_URL + (path === '/' ? '/' : `${path}/`);

  if (pageContext.is404 || pageContext.errorWhileRendering) {
    return {title: `Pagina niet gevonden – ${SUFFIX}`, description: '', url: `${SITE_URL}/`, noindex: true};
  }

  if (known) {
    return {...known, url};
  }

  // Other Contentful pages: title + first lines of the text
  return {
    title: page?.title ? `${page.title.trim()} – ${SUFFIX}` : SUFFIX,
    description: truncate(toText(page?.html)),
    url,
  };
}

export const business = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  '@id': `${SITE_URL}/#studio`,
  name: 'Mya Ink',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/myaink.png`,
  image: [`${SITE_URL}/images/og.jpg`, `${SITE_URL}/myaink.png`],
  description: 'Tattoostudio in Woerden voor unieke tattoos op maat in een private studio.',
  telephone: '+31348754071',
  email: 'info@mya-ink.nl',
  priceRange: '$$',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Debit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Molenvlietbrink 248',
    postalCode: '3448 HS',
    addressLocality: 'Woerden',
    addressCountry: 'NL',
  },
  openingHoursSpecification: [
    {'@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '12:00', closes: '18:00'},
    {'@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '12:00', closes: '17:00'},
  ],
  sameAs: ['https://www.instagram.com/mya_ink/'],
};
