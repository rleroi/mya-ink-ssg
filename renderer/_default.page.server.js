import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from './app'
import logoUrl from './favicon.png'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

async function render(pageContext) {
  const app = createApp(pageContext)
  const appHtml = await renderToString(app)

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Mya-Ink.nl – Tattooshop Woerden'
  const desc = (documentProps && documentProps.description) || 'Mya-Ink.nl – Tattooshop Woerden'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J1CCNVPL8M"></script>
        <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-J1CCNVPL8M');</script>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "TattooParlor",
            "url": "https://mya-ink.nl",
            "logo": "https://mya-ink.nl/myaink.png",
            "image": "https://mya-ink.nl/myaink.png",
            "name": "Mya Ink",
            "priceRange": "$$",
            "currenciesAccepted": "EUR",
            "paymentAccepted":"Cash, Debit Card",
            "telephone": "0348 754 071",
            "address": "Molenvlietbrink 248, 3448 HS Woerden"
          }
        </script>
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
