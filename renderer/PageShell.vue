<template>
  <!-- Ruimte voor de vaste knoppenbalk onderin op mobiel (afspraakbalk, of 'Aanvraag verzenden' op /afspraak) -->
  <div class="min-h-screen bg-paper pb-[92px] lg:pb-0">

    <div v-if="melding" role="status" class="bg-plum text-white px-5 md:px-10 py-3 text-center text-sm leading-normal">{{ melding }}</div>

    <header class="container-site py-5 md:py-8 flex items-center justify-between gap-6">
      <a href="/" title="Mya Ink" class="no-underline font-display text-[26px] md:text-[32px] tracking-[.01em]">Mya <span class="italic">Ink</span></a>
      <nav aria-label="Hoofdmenu" class="hidden lg:flex items-center gap-8">
        <Link href="/portfolio/">Portfolio</Link>
        <Link href="/faq/">FAQ</Link>
        <Link href="/risicos/">Risico's</Link>
        <Link href="/nazorg/">Nazorg</Link>
        <Link :cta="true" href="/afspraak/">Maak een afspraak</Link>
      </nav>
      <button type="button" aria-label="Menu openen" :aria-expanded="state.menuOpen" aria-controls="mobile-menu"
              class="lg:hidden w-11 h-11 flex items-center justify-center border border-ink rounded-full bg-transparent text-ink cursor-pointer"
              @click="openMenu(true)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 9h16M4 15h16"></path></svg>
      </button>
    </header>

    <div v-if="state.menuOpen" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
         class="fixed inset-0 z-50 bg-ink text-paper flex flex-col px-5 pt-5 pb-8 overflow-y-auto lg:hidden"
         @keydown.esc="openMenu(false)">
      <div class="flex items-center justify-between">
        <a href="/" class="font-display text-[26px] no-underline text-paper hover:text-lilac">Mya <span class="italic">Ink</span></a>
        <button ref="closeButton" type="button" aria-label="Menu sluiten"
                class="w-11 h-11 flex items-center justify-center border border-paper rounded-full bg-transparent text-paper cursor-pointer"
                @click="openMenu(false)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </button>
      </div>
      <nav aria-label="Hoofdmenu" class="mt-14 flex flex-col">
        <a v-for="item in menuItems" :key="item.href" :href="item.href"
           :aria-current="trimPath(pageContext.urlPathname) === trimPath(item.href) ? 'page' : null"
           class="font-display text-[44px] leading-[1.15] no-underline py-1.5"
           :class="item.cta ? 'italic text-lilac hover:text-white' : 'text-paper hover:text-lilac'">{{ item.label }}</a>
      </nav>
      <div class="mt-auto pt-10 flex flex-col gap-1 text-[15px] leading-[1.7] text-fog">
        <span>Molenvlietbrink 248, Woerden</span>
        <a class="text-paper hover:text-lilac" href="tel:+31348754071">0348 754 071</a>
        <a class="text-paper hover:text-lilac" href="https://www.instagram.com/mya_ink/" target="_blank" rel="noreferrer noopener">@mya_ink</a>
      </div>
    </div>

    <main>
      <slot/>
    </main>

    <footer>
      <div class="container-site pt-12 md:pt-20 pb-8 md:pb-10 flex flex-col gap-8 md:gap-14">
        <!-- Mobiel: één gecentreerde kolom; vanaf md naast elkaar -->
        <div class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center md:justify-items-stretch text-center md:text-left gap-8 md:gap-10 text-[15px] leading-[1.8]">
          <img src="/myaink.webp" width="300" height="297" alt="Mya Ink" style="mix-blend-mode: multiply" class="w-28 h-28 md:w-[150px] md:h-[150px] object-contain md:-mt-2.5 md:-ml-2">
          <div class="flex flex-col">
            <span class="eyebrow mb-3">Studio</span>
            <span class="text-body">Molenvlietbrink 248</span>
            <span class="text-body">3448 HS Woerden</span>
            <a href="https://goo.gl/maps/MFzvyKoCisYjUH2C7" target="_blank" rel="noreferrer noopener">Route in Google Maps</a>
          </div>
          <div class="flex flex-col">
            <span class="eyebrow mb-3">Contact</span>
            <a href="mailto:info@mya-ink.nl">info@mya-ink.nl</a>
            <a href="tel:+31348754071">0348 754 071</a>
            <a href="https://www.instagram.com/mya_ink/" target="_blank" rel="noreferrer noopener">@mya_ink</a>
          </div>
          <div class="flex flex-col items-center md:items-start">
            <span class="eyebrow mb-3">Openingstijden</span>
            <!-- Twee kolommen zo breed als de inhoud: tijden staan onder elkaar, vlak naast de dagen -->
            <dl class="m-0 grid grid-cols-[auto_auto] gap-x-5 text-left tabular-nums">
              <dt>Dinsdag t/m vrijdag</dt><dd class="m-0">12:00 – 18:00</dd>
              <dt>Zaterdag</dt><dd class="m-0">12:00 – 17:00</dd>
              <dt>Zondag en maandag</dt><dd class="m-0 text-muted">gesloten</dd>
            </dl>
          </div>
        </div>
        <div class="border-t border-line pt-4 md:pt-6 flex flex-col md:flex-row md:flex-wrap items-center md:justify-between gap-2 md:gap-4 text-center text-[13px] text-muted">
          <span>© Mya Ink · KVK 72358297</span>
          <span class="flex gap-6">
            <a class="text-muted" href="/privacyverklaring/">Privacyverklaring</a>
            <a class="text-muted" href="https://www.instagram.com/mya_ink/" target="_blank" rel="noreferrer noopener">Instagram</a>
          </span>
        </div>
      </div>
    </footer>

    <div v-if="showBookingBar" class="fixed inset-x-0 bottom-0 z-40 lg:hidden px-5 pt-3 pb-6 bg-paper border-t border-line">
      <a class="btn btn-dark w-full min-h-[52px]" href="/afspraak/">Maak een afspraak</a>
    </div>

    <div class="fixed top-4 inset-x-0 z-[60] flex flex-col items-center gap-3 px-5 pointer-events-none" aria-live="polite">
      <div v-for="toast in toasts" :key="toast.id" :role="toast.severity === 'error' ? 'alert' : 'status'"
           class="pointer-events-auto w-full max-w-md rounded px-5 py-4 flex gap-3.5 items-center text-[15px] shadow-lg"
           :class="toast.severity === 'success' ? 'bg-ink text-paper' : 'bg-white text-ink border border-danger'">
        <svg v-if="toast.severity === 'success'" class="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12l5 5L20 7"></path></svg>
        <svg v-else class="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B2C2C" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v6M12 16.5v.5"></path></svg>
        <span><strong class="font-semibold">{{ toast.summary }}</strong> {{ toast.detail }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, nextTick, reactive, ref} from 'vue';
import Link from './Link.vue';
import {usePageContext} from './usePageContext';
import {useToast} from './useToast';

const pageContext = usePageContext();
const {toasts} = useToast();

const closeButton = ref(null);

const state = reactive({
  menuOpen: false,
});

const menuItems = [
  {href: '/', label: 'Home'},
  {href: '/portfolio/', label: 'Portfolio'},
  {href: '/faq/', label: 'FAQ'},
  {href: '/risicos/', label: "Risico's"},
  {href: '/nazorg/', label: 'Nazorg'},
  {href: '/afspraak/', label: 'Maak een afspraak', cta: true},
];

// Optionele meldingsbalk (bijv. vakantie) uit Contentful-type 'melding'
const melding = computed(() => pageContext.pageProps?.melding);

const trimPath = (path) => (path || '').replace(/\/+$/, '') || '/';
const showBookingBar = computed(() => trimPath(pageContext.urlPathname) !== '/afspraak');

async function openMenu(isOpen) {
  state.menuOpen = isOpen;
  document.documentElement.style.overflow = isOpen ? 'hidden' : '';

  if (isOpen) {
    await nextTick();
    closeButton.value?.focus();
  }
}

</script>

