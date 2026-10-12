<template>
  <!-- Mobiel: kop, dan foto, dan intro (tekstblok wordt 'contents' zodat de volgorde mengt) -->
  <section class="container-site pt-4 md:pt-12 pb-14 md:pb-[120px] flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-16 md:items-end">
    <div class="contents md:flex md:flex-[1_1_480px] md:min-w-0 md:flex-col md:gap-8">
      <p class="eyebrow order-1">Tattoostudio · Woerden</p>
      <h1 class="order-2 display m-0 text-[48px] md:text-[clamp(56px,8vw,108px)] leading-[.95] tracking-[-.02em]">Tattoos op maat,<br><span class="italic text-plum">met aandacht</span> gezet.</h1>
      <div v-if="intro" class="order-4 intro max-w-[440px] text-base md:text-lg leading-[1.6] text-body" v-html="intro"></div>
      <div class="order-5 flex flex-wrap gap-4">
        <a class="btn btn-dark hidden lg:inline-flex" href="/afspraak">Maak een afspraak</a>
        <a class="btn btn-line w-full sm:w-auto" href="/portfolio">Bekijk portfolio</a>
      </div>
    </div>
    <div class="stage order-3 md:order-none mt-2 md:mt-0 md:flex-[1_1_420px] min-w-0 h-[420px] md:h-[640px]" role="img" aria-label="Wisselende foto's uit de studio">
      <img src="/images/hero-1-800.webp" srcset="/images/hero-1-800.webp 800w, /images/hero-1-1600.webp 1600w" sizes="(min-width: 768px) 960px, 100vw" width="1600" height="1066" alt="" fetchpriority="high" style="object-position: 45% center">
      <img src="/images/hero-2-800.webp" srcset="/images/hero-2-800.webp 800w, /images/hero-2-1600.webp 1365w" sizes="(min-width: 768px) 50vw, 100vw" width="1365" height="2048" alt="" style="object-position: center 30%" loading="lazy">
      <img src="/images/hero-3-800.webp" srcset="/images/hero-3-800.webp 800w, /images/hero-3-1600.webp 1600w" sizes="(min-width: 768px) 960px, 100vw" width="1600" height="1066" alt="" style="object-position: 80% center" loading="lazy">
    </div>
  </section>

  <section class="bg-white">
    <div v-reveal class="container-site py-14 md:py-[120px] flex flex-wrap gap-5 md:gap-20 items-center">
      <img src="/images/mya-800.webp" srcset="/images/mya-800.webp 800w, /images/mya-1600.webp 1279w" sizes="(min-width: 768px) 380px, 220px" width="1279" height="1600" alt="Portret van Mya in haar studio" loading="lazy"
           class="w-[220px] h-[280px] md:w-auto md:h-[480px] md:flex-[0_1_380px] min-w-0 mx-auto md:mx-0 object-cover rounded-[140px_140px_4px_4px] md:rounded-[240px_240px_4px_4px]"
           style="object-position: center 20%">
      <div class="flex-[1_1_420px] min-w-0 flex flex-col gap-5 md:gap-6">
        <p class="eyebrow">Over de studio</p>
        <h2 class="h2">Eén artiest, één stoel,<br class="hidden md:inline"> <span class="italic">alle aandacht</span> voor jou.</h2>
        <div v-if="about" class="rt max-w-[520px] !text-base md:!text-[17px] !leading-[1.7] !text-body" v-html="about"></div>
        <a href="/faq" class="link-arrow min-h-[44px] flex items-center">Lees de veelgestelde vragen →</a>
      </div>
    </div>
  </section>

  <section class="py-14 md:py-[120px]">
    <div class="container-site flex flex-wrap justify-between items-end gap-6 mb-6 md:mb-12">
      <h2 class="h2">Recent <span class="italic">werk</span></h2>
      <a href="/portfolio" class="link-arrow"><span class="md:hidden">Alles →</span><span class="hidden md:inline">Naar het portfolio →</span></a>
    </div>
    <div class="swipe md:grid md:grid-cols-4 md:gap-4 md:max-w-site md:mx-auto md:px-10 md:overflow-visible">
      <a v-for="work in recentWork" :key="work.src" v-reveal href="/portfolio" class="block">
        <img :src="`/images/${work.src}-600.webp`" :srcset="`/images/${work.src}-600.webp 600w, /images/${work.src}-900.webp 900w`"
             sizes="(min-width: 768px) 25vw, 78vw" width="900" height="900" :alt="work.alt" loading="lazy"
             class="w-full aspect-[4/5] object-cover rounded block bg-stone">
      </a>
    </div>
  </section>

  <img src="/images/studio-800.webp" srcset="/images/studio-800.webp 800w, /images/studio-1600.webp 1600w" sizes="100vw" width="1600" height="1066" alt="De studio aan de Molenvlietbrink" loading="lazy"
       class="w-full h-[260px] md:h-[560px] object-cover block" style="object-position: center 60%">

  <section class="bg-white">
    <div class="container-site py-14 md:py-[120px] flex flex-col gap-4 md:gap-14">
      <div class="flex flex-col gap-3 md:gap-4">
        <p class="eyebrow">Zo werkt het</p>
        <h2 class="h2">Van idee <span class="italic">tot tattoo</span></h2>
      </div>
      <ol class="list-none m-0 p-0 grid md:grid-cols-3 md:gap-12">
        <li v-for="(step, i) in steps" :key="step.title" v-reveal
            class="flex md:flex-col gap-4 py-5 md:py-0 border-t border-line md:border-0 last:border-b md:last:border-b-0">
          <span class="font-display italic text-[28px] md:text-[40px] leading-none text-plum" aria-hidden="true">0{{ i + 1 }}</span>
          <div class="flex flex-col gap-1 md:gap-4">
            <h3 class="m-0 text-base md:text-xl font-semibold">{{ step.title }}</h3>
            <p class="m-0 text-[15px] md:text-base leading-[1.6] md:leading-[1.7] text-body">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="py-14 md:py-[120px] flex flex-col gap-6 md:gap-14">
    <div class="container-site flex flex-wrap justify-between items-end gap-6">
      <div class="flex flex-col gap-3 md:gap-4">
        <p class="eyebrow">Ervaringen</p>
        <h2 class="h2">Wat klanten <span class="italic">zeggen</span></h2>
      </div>
      <a href="https://goo.gl/maps/MFzvyKoCisYjUH2C7" target="_blank" rel="noreferrer noopener" class="link-arrow hidden md:inline">Alle reviews op Google →</a>
    </div>
    <div class="swipe md:grid md:grid-cols-3 md:gap-12 md:max-w-site md:mx-auto md:px-10 md:overflow-visible">
      <figure v-for="review in reviews" :key="review.name" v-reveal class="m-0 flex flex-col gap-4 md:gap-6 border-t border-ink pt-5 md:pt-8">
        <blockquote class="m-0 font-display text-xl md:text-2xl leading-[1.4]">“{{ review.quote }}”</blockquote>
        <figcaption class="text-[13px] md:text-sm text-muted">{{ review.name }} · Google-review</figcaption>
      </figure>
    </div>
    <a href="https://goo.gl/maps/MFzvyKoCisYjUH2C7" target="_blank" rel="noreferrer noopener" class="link-arrow mx-5 md:hidden">Alle reviews op Google →</a>
  </section>

  <section class="bg-ink text-paper">
    <div class="container-site py-14 md:py-[120px] grid md:grid-cols-2 gap-6 md:gap-20 items-center">
      <img src="/images/cta-800.webp" srcset="/images/cta-800.webp 800w, /images/cta-1600.webp 1600w" sizes="(min-width: 768px) 50vw, 100vw" width="1600" height="1066" alt="" loading="lazy" class="w-full h-[220px] md:h-[420px] object-cover rounded block" style="object-position: center 40%">
      <div v-reveal class="flex flex-col items-start gap-6 md:gap-8">
        <h2 class="h2 !text-[40px] md:!text-[clamp(40px,5vw,72px)] !leading-none">Klaar voor je<br class="hidden md:inline"> <span class="italic">volgende tattoo?</span></h2>
        <p class="m-0 max-w-[420px] text-[15px] md:text-[17px] leading-[1.7] text-fog">Vertel wat je in gedachten hebt. Je hoort binnen 3 werkdagen van me.</p>
        <a class="btn btn-light hidden lg:inline-flex" href="/afspraak">Maak een afspraak</a>
      </div>
    </div>
  </section>
</template>

<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>

<script setup>
import {computed} from 'vue';

const props = defineProps(['page']);

// Vaste selectie; het volledige (Instagram-)portfolio staat op /portfolio
const recentWork = [
  {src: 'werk-1', alt: 'Custom koi en draak tattoo'},
  {src: 'werk-2', alt: 'Fineline tattoo van een figuur op de maan'},
  {src: 'werk-3', alt: 'Tattoo met zonnebloem, paard en Romeinse cijfers'},
  {src: 'werk-4', alt: 'Fineline anker tattoo'},
];

// Eerste alinea uit Contentful = intro in de hero, de rest = "Over de studio"
const parts = computed(() => {
  const html = props.page?.html || '';
  const end = html.indexOf('</p>');

  if (!html.startsWith('<p>') || end === -1) {
    return {intro: '', about: html};
  }

  return {intro: html.slice(0, end + 4), about: html.slice(end + 4)};
});

const intro = computed(() => parts.value.intro);
const about = computed(() => parts.value.about);

const steps = [
  {title: 'Aanvraag', text: 'Vertel via het formulier wat je wilt: idee, plek op het lichaam, grootte in cm en een paar voorbeelden.'},
  {title: 'Ontwerp', text: 'Met mijn kunstacademie-achtergrond en jaren ervaring teken ik je ontwerp helemaal op maat. Als het goed voelt, plannen we samen een datum in.'},
  {title: 'Zetten & nazorg', text: 'In de studio aan de Molenvlietbrink. Daarna krijg je alles mee wat je nodig hebt voor de nazorg.'},
];

const reviews = [
  {name: 'M. D.H', quote: 'Mya is een echte professional, ze heeft me met veel geduld geholpen en geadviseerd bij het maken en zetten van een prachtig ontwerp. Het betreft een cover up die voldoet aan al mijn wensen.'},
  {name: 'Sven', quote: 'Echt een hele hygiënische shop, neemt alle tijd, legt ook heel goed de nazorg stappen uit en echt hele goede kwaliteit tattoos. Zeker een aanrader.'},
  {name: 'Ilona K.', quote: 'Mya is een hele fijne artiest die met je meedenkt en kijkt naar je wensen. … De tattoo is super strak gezet. Ik ben heel blij met het resultaat, echt wat ik in gedachten had.'},
];
</script>

<style scoped>
.intro :deep(p) {
  @apply m-0;
}

.stage {
  @apply relative overflow-hidden rounded bg-stone;
}

.stage img {
  @apply absolute inset-0 w-full h-full object-cover opacity-0;
  animation: fade 18s infinite, zoom 18s infinite;
}

.stage img:nth-child(2) {
  animation-delay: 6s;
}

.stage img:nth-child(3) {
  animation-delay: 12s;
}

@keyframes fade {
  0% { opacity: 0 }
  6% { opacity: 1 }
  33% { opacity: 1 }
  40% { opacity: 0 }
  100% { opacity: 0 }
}

@keyframes zoom {
  0% { transform: scale(1) }
  40% { transform: scale(1.08) }
  100% { transform: scale(1.08) }
}

@media (prefers-reduced-motion: reduce) {
  .stage img {
    animation: none;
  }

  .stage img:first-child {
    opacity: 1;
  }
}
</style>
