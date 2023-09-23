<template>
  <h3 v-if="page.title" class="title text-4xl mb-16">{{page.title}}</h3>
  <div v-html="page.html"></div>

  <div class="mt-8" style="font-size: 10px">
    <div id="curator-feed-insta-layout"><a href="https://curator.io" target="_blank" class="crt-logo crt-tag">Powered by Curator.io</a></div>
  </div>
  <div class="mt-8 text-center">
    <a class="bg-primary px-8 py-4 text-white inline-block" href="https://www.instagram.com/mya_ink/" title="Volg @mya_ink op Instagram" target="_blank" rel="noreferer noopener">
      Meer bekijken op Instagram
    </a>
  </div>
</template>

<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>

<script setup>
import { onMounted } from 'vue';

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
</style>