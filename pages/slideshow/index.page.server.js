import {RenderErrorPage} from "vite-plugin-ssr";
import {fetchSlideshow, getSlideshow, state} from "../../server/contentful";

const pageSlug = 'slideshow'
const id = process.env.SLIDESHOW_ID;

// dev
export async function onBeforeRender(pageContext) {
    if (!state.slideshow) {
        await fetchSlideshow(id);
    }

    const slideshow = getSlideshow(id);

    if (!slideshow) {
        console.log('should render 404 for', pageSlug);

        throw RenderErrorPage({pageContext: {}});
    }

    return {
        pageContext: {
            pageProps: {
                slideshow: slideshow,
            }
        }
    };
}

// prod/build
export async function prerender() {
    if (!state.slideshow) {
        await fetchSlideshow(id);
    }

    return [{
        // Beacuse we already provide the `pageContext`, vite-plugin-ssr will *not* call
        // the `onBeforeRender()` hook for `url`.
        pageContext: {
            pageProps: {
                slideshow: getSlideshow(id),
            },
        },
        url: `/${pageSlug}`,
    }];
}

export const passToClient = ['pageProps'];
