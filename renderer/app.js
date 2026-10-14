import { createSSRApp, h } from 'vue'
import PageShell from './PageShell.vue'
import { setPageContext } from './usePageContext'
import { reveal } from './reveal'
import './tailwind.css'

export { createApp }

function createApp(pageContext) {
  const { Page, urlPathname } = pageContext
  // `melding` is for PageShell (via pageContext), not a prop of the page itself
  const { melding, ...pageProps } = pageContext.pageProps || {}

  // Skip PageShell for slideshow page
  const skipPageShell = urlPathname.replace(/\/+$/, '') === '/slideshow'

  const PageWithLayout = {
    render() {
      if (skipPageShell) {
        return h(Page, pageProps)
      }

      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps)
          }
        }
      )
    }
  }

  const app = createSSRApp(PageWithLayout)

  // We make `pageContext` available from any Vue component
  setPageContext(app, pageContext)

  app.directive('reveal', reveal);

  return app
}
