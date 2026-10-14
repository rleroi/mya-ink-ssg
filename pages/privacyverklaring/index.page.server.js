import { fetchPages, getMelding, state } from "../../server/contentful";

// Vaste pagina; alleen de site-brede melding komt uit Contentful

// dev
export async function onBeforeRender(pageContext) {
    if (!state.pages) {
        await fetchPages();
    }

    return {
        pageContext: {
            pageProps: {
                melding: getMelding(),
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
        pageContext: {
            pageProps: {
                melding: getMelding(),
            },
        },
        url: '/privacyverklaring',
    }];
}

export const passToClient = ['pageProps'];
