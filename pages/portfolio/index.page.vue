<template>
  <section class="container-site pt-6 md:pt-20 pb-10 md:pb-16 flex flex-wrap justify-between items-end gap-6 md:gap-8">
    <div class="flex flex-col gap-4 md:gap-5">
      <p class="eyebrow">Portfolio</p>
      <h1 class="display m-0 text-[48px] md:text-[clamp(48px,7vw,96px)] leading-none">Gezet <span class="italic">met zorg</span></h1>
    </div>
    <p class="m-0 max-w-[420px] text-base md:text-[17px] leading-[1.7] text-body">Van fineline tot cover-ups en kleur. Alles wat op Instagram verschijnt, staat hier automatisch.</p>
  </section>

  <section class="bg-white">
    <div class="container-site pt-10 md:pt-20 pb-6 md:pb-14">
      <!-- Curator.io-widget: toont automatisch de Instagram-posts van @mya_ink -->
      <div class="curator">
        <div id="curator-feed-insta-layout"><a href="https://curator.io" target="_blank" class="crt-logo crt-tag">Powered by Curator.io</a></div>
      </div>
    </div>
    <div class="container-site pb-14 md:pb-[120px] flex justify-center">
      <a class="btn btn-line w-full sm:w-auto" href="https://www.instagram.com/mya_ink/" title="Volg @mya_ink op Instagram" target="_blank" rel="noreferrer noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg>
        Meer op Instagram
      </a>
    </div>
  </section>
</template>

<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>

<script setup>
import { onMounted } from 'vue';

defineProps(['page']);

onMounted(() => {
  if (!document.querySelector('#curator-script')) {
    let i,e,d = document, s = "script";
    i = d.createElement("script");
    i.async = 1;
    i.charset = "UTF-8";
    i.src="https://cdn.curator.io/published/629e6a15-1ac0-490d-8633-8409036d0324.js";
    i.id = "curator-script"
    e = d.getElementsByTagName(s)[0];
    e.parentNode.insertBefore(i, e);
  }
})
</script>

<style scoped>
.curator {
  font-size: 10px;
}
</style>
