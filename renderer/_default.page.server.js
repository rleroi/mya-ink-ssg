import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from './app'
import logoUrl from './favicon.png'
import { business, getSeo, SITE_URL } from './seo'

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Manrope:wght@400;500;600&display=swap'

// Prefetch internal pages on hover/touch, so the next page opens instantly
const speculationRules = JSON.stringify({ prefetch: [{ source: 'document', where: { href_matches: '/*' }, eagerness: 'moderate' }] })
const jsonLd = JSON.stringify(business).replace(/</g, '\\u003c')

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

async function render(pageContext) {
  const app = createApp(pageContext)
  const appHtml = await renderToString(app)

  // See https://vite-plugin-ssr.com/head
  const seo = getSeo(pageContext)
  const ogImage = `${SITE_URL}/images/og.jpg`

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="nl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${seo.title}</title>
        <meta name="description" content="${seo.description}" />
        ${seo.noindex ? escapeInject`<meta name="robots" content="noindex" />` : escapeInject`<link rel="canonical" href="${seo.url}" />`}
        <link rel="icon" href="${logoUrl}" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F5F4F1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mya Ink" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:title" content="${seo.title}" />
        <meta property="og:description" content="${seo.description}" />
        <meta property="og:url" content="${seo.url}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Mya aan het werk in haar tattoostudio in Woerden" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="${FONTS_URL}" />
        <script type="speculationrules">${dangerouslySkipEscape(speculationRules)}</script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J1CCNVPL8M"></script>
        <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-J1CCNVPL8M');</script>
        <script type="application/ld+json">${dangerouslySkipEscape(jsonLd)}</script>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}
