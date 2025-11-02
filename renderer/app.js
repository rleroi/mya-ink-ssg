import { createSSRApp, h } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import PageShell from './PageShell.vue'
import { setPageContext } from './usePageContext'
import './tailwind.css'
import './primevue-theme.css'
import 'primeicons/primeicons.css'

export { createApp }

function createApp(pageContext) {
  const { Page, pageProps, urlPathname } = pageContext
  
  // Skip PageShell for slideshow page
  const skipPageShell = urlPathname === '/slideshow'
  
  const PageWithLayout = {
    render() {
      if (skipPageShell) {
        return h(Page, pageProps || {})
      }
      
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {})
          }
        }
      )
    }
  }

  const app = createSSRApp(PageWithLayout)

  // We make `pageContext` available from any Vue component
  setPageContext(app, pageContext)

  app.use(PrimeVue);
  app.use(ToastService);

  return app
}
