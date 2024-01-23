<template>
  <div v-html="page.html"></div>

  <div class="mt-16 flex justify-center">
    <a class="p-button p-component flex justify-center w-full md:w-[20rem]" href="/afspraak" title="Maak een afspraak">
      <span>Maak een afspraak</span>
    </a>
  </div>
</template>

<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>

<script setup>
</script>

<style scoped>
</style>