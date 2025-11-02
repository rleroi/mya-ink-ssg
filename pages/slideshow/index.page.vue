<template>
  <div class="slideshow-wrapper w-screen h-screen fixed top-0 left-0 overflow-hidden">
    <vue-flux
      v-if="rscs.length > 0"
      :options="vfOptions"
      :rscs="rscs"
      :transitions="vfTransitions"
      class="w-full h-full"
    />
    <div v-else class="loading flex items-center justify-center w-full h-full text-2xl">Loading slideshow...</div>
  </div>
</template>
<script>
import { shallowReactive } from 'vue';
import { VueFlux, Img, Slide } from 'vue-flux';
import 'vue-flux/style.css';

const pageProps = ['slideshow'];
export default {
  props: pageProps,
  components: {
    VueFlux,
  },
  data() {
    return {
      vfOptions: shallowReactive({
        autoplay: true,
        autoplayTime: 5000,
        transitionDuration: 1000,
        allowFullscreen: false,
      }),
      vfTransitions: shallowReactive([Slide]),
    };
  },
  computed: {
    rscs() {
      if (!this.slideshow?.images) {
        return [];
      }
      return this.slideshow.images.map(img => new Img(img.url, img.title || ''));
    },
  },
};
</script>
<style scoped>
.slideshow-wrapper :deep(.vue-flux) {
  width: 100%;
  height: 100%;
}

.slideshow-wrapper :deep(.vue-flux img),
.slideshow-wrapper :deep(.vue-flux-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.slideshow-wrapper :deep(.vue-flux-wrapper) {
  width: 100%;
  height: 100%;
}

.slideshow-wrapper :deep(.vue-flux-slide) {
  width: 100%;
  height: 100%;
}
</style>
