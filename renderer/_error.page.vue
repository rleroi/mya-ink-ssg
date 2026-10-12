<template>
  <section class="container-site pt-10 md:pt-20 pb-20 md:pb-[160px] flex flex-col gap-6 items-start">
    <p class="eyebrow">{{ is404 ? '404' : '500' }}</p>
    <h1 class="display m-0 text-[48px] md:text-[clamp(48px,7vw,96px)] leading-none">
      <template v-if="is404">Deze pagina <span class="italic">bestaat niet</span></template>
      <template v-else>Er ging <span class="italic">iets mis</span></template>
    </h1>
    <p class="m-0 max-w-[480px] text-[17px] leading-[1.7] text-body">
      {{ is404 ? 'De pagina die je zoekt kon niet gevonden worden.' : 'Probeer het later opnieuw.' }}
    </p>
    <a class="btn btn-dark" href="/">Naar de homepage</a>
  </section>
</template>

<script setup>
defineProps(['is404'])
</script>
