import { RenderErrorPage } from "vite-plugin-ssr";
import { fetchPages, getPageBySlug, state, toPageResource } from "../../server/contentful";

const pageSlug = 'index'

// dev
export async function onBeforeRender(pageContext) {
    if (!state.pages) {
        await fetchPages();
    }

    const page = getPageBySlug(pageSlug);

    if (!page) {
        console.log('should render 404 for', pageSlug);
        
        throw RenderErrorPage({pageContext: {}});
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

    
    return [{
        // Beacuse we already provide the `pageContext`, vite-plugin-ssr will *not* call
        // the `onBeforeRender()` hook for `url`.
        pageContext: {
            pageProps: {
                page: toPageResource(getPageBySlug(pageSlug)),
            },
        },
        url: `/`,
    }];
}

export const passToClient = ['pageProps'];
