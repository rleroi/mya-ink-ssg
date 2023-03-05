import { RenderErrorPage } from "vite-plugin-ssr";
import { fetchPages, getPageBySlug, state, toPageResource } from "../../server/contentful";

// dev
export async function onBeforeRender(pageContext) {
    if (!state.pages) {
        await fetchPages();
    }

    const { pageSlug } = pageContext.routeParams;

    const page = getPageBySlug(pageSlug);

    if (!page) {
        console.log('should render 404 for', pageSlug);

        throw RenderErrorPage({ pageContext: {} });
    }

    return {
        pageContext: {
            pageProps: {
                page: toPageResource(page),
            }
        }
    };
}

// prod/build
export async function prerender() {
    if (!state.pages) {
        await fetchPages();
    }

    return state.pages?.items?.filter(item => !['index', 'afspraak', 'portfolio'].includes(item.fields.slug))?.map(page => {
        return {
            // Beacuse we already provide the `pageContext`, vite-plugin-ssr will *not* call
            // the `onBeforeRender()` hook for `url`.
            pageContext: {
                pageProps: {
                    page: toPageResource(page),
                },
            },
            url: `/${page.fields.slug}`,
        }
    }) || [];
}

export const passToClient = ['pageProps'];
