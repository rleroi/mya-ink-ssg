<template>
  <section class="container-site pt-6 md:pt-20 pb-10 md:pb-16">
    <h1 v-if="page.title" class="display m-0 text-[48px] md:text-[clamp(48px,7vw,96px)] leading-none">{{ page.title }}</h1>
  </section>

  <section class="bg-white">
    <div class="container-site pt-10 md:pt-20 pb-14 md:pb-[120px]">
      <article class="rt max-w-[720px]" v-html="page.html"></article>
    </div>
  </section>

  <section class="bg-ink text-paper">
    <div class="container-site py-12 md:py-20 flex flex-col md:flex-row md:flex-wrap md:justify-between md:items-center gap-4 md:gap-8">
      <p class="m-0 font-display text-[34px] md:text-[40px] leading-[1.1]">Nog <span class="italic">vragen?</span></p>
      <div class="flex flex-col md:flex-row md:flex-wrap md:gap-6 md:items-center text-[15px] leading-[1.9]">
        <a href="mailto:info@mya-ink.nl" class="text-paper hover:text-lilac">info@mya-ink.nl</a>
        <a href="tel:0348754071" class="text-paper hover:text-lilac">0348 754 071</a>
      </div>
    </div>
  </section>
</template>
<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>
