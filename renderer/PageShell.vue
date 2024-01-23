<template>
    <div class="flex flex-col w-auto max-w-screen-xl xl:mx-auto px-8 py-8 md:px-16 md:py-16">
<!--  <div class="flex flex-col w-auto max-w-screen-xl xl:mx-auto px-8 py-8 md:px-16 md:py-16"
       :class="{'h-screen overflow-hidden': state.menuOpen}">-->

    <Sidebar v-model:visible="state.menuOpen" position="right" class="pt-4 px-4">
<!--    <div v-show="state.menuOpen"
         class="absolute left-0 top-0 w-full h-full z-50 flex flex-col lg:hidden bg-white px-8 py-8">-->
<!--      <button aria-label="Menu" @click="openMenu(false)" class="ml-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"
             focusable="false">
          <path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path>
        </svg>
      </button>-->
      <ol class="flex flex-col text-right menu">
        <li class="mb-4">
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li class="mb-4">
          <Link href="/faq">FAQ</Link>
        </li>
        <li class="mb-4">
          <Link href="/risicos">Risico's</Link>
        </li>
        <li class="mb-4">
          <Link href="/nazorg">Nazorg</Link>
        </li>
        <li class="mb-4">
          <Link href="/afspraak">Maak een afspraak</Link>
        </li>
      </ol>
    </Sidebar>

    <div class="flex justify-between items-center relative">
      <div class="w-1/3">
        <a href="/" title="Mya Ink">
          <img class="w-[287px]" src="./myaink.png" alt="Mya Ink - Tattooshop Woerden">
        </a>
      </div>
      <div class="w-2/3 justify-end hidden lg:flex items-center">
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/risicos">Risico's</Link>
        <Link href="/nazorg">Nazorg</Link>
        <Link :cta="true" href="/afspraak">Maak een afspraak</Link>
      </div>
      <button aria-label="Menu" class="lg:hidden border border-primary/30 hover:bg-primary/5 transition-all duration-300 rounded-md ml-4 p-2" @click="openMenu(true)">
        <svg class="fill-primary" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="4" y="7.5" width="16" height="1.5"></rect>
          <rect x="4" y="15" width="16" height="1.5"></rect>
        </svg>
      </button>
    </div>
    <div class="mt-32">
      <slot/>
    </div>
    <div class="flex mt-32 justify-between flex-col sm:flex-row">
      <div class="flex flex-col mr-4 mb-4 sm:mb-0">
        <strong>Mya Ink</strong>
        <span>Molenvlietbrink 248</span>
        <span>3448 HS Woerden</span>
          <a class="underline" rel="noreferrer noopener" href="https://goo.gl/maps/MFzvyKoCisYjUH2C7" target="_blank">
            <i class="pi pi-map-marker w-[18px] mr-2"/>
            <span>Google Maps</span>
        </a>
        <a class="underline" href="mailto:info@mya-ink.nl">
          <i class="pi pi-envelope w-[18px] mr-2"/>
          <span>info@mya-ink.nl</span>
        </a>

        <a class="underline" href="tel:0348754071">
          <i class="pi pi-phone w-[18px] mr-2"/>
          <span>0348 754 071</span>
        </a>

        <a class="underline md:hidden" href="https://www.instagram.com/mya_ink/" title="Volg mya_ink op Instagram" target="_blank" rel="noreferer noopener">
          <svg class="inline w-[18px] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>mya_ink</span>
        </a>
      </div>
      <div class="hidden md:flex justify-center items-center flex-col">
        <a class="block w-[120px] h-[120px] rounded-full border-2 border-neutral-300 overflow-hidden"
           href="https://www.instagram.com/mya_ink/" title="Volg mya_ink op Instagram" target="_blank"
           rel="noreferer noopener">
          <img src="./mya.png" alt="Mya" class="w-full object-cover"/>
        </a>
        <a class="block mt-2" href="https://www.instagram.com/mya_ink/" title="Volg mya_ink op Instagram" target="_blank" rel="noreferer noopener">
          <svg class="inline w-[18px] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span>mya_ink</span>
        </a>
      </div>
      <!--<div class="hidden md:flex">
        <a class="relative w-[150px] h-[150px] rounded-full border-2 border-neutral-300 overflow-hidden"
           href="https://www.instagram.com/mya_ink/" title="Volg mya_ink op Instagram" target="_blank"
           rel="noreferer noopener">
          <img src="./mya.png" alt="Mya" class="w-full object-cover"/>
          <div class="absolute h-full w-full top-0 hover:opacity-0 bg-white/80 backdrop-blur-sm transition-all bg-white backdrop-grayscale duration-300 fill-black text-black flex-col flex justify-center items-center">
            <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <div>mya_ink</div>
          </div>
        </a>
      </div>-->
      <div class="flex flex-col">
        <strong>Openingstijden</strong>
        <span>Ma: gesloten</span>
        <span>Di t/m vr: 12:00 – 18:00</span>
        <span>Za: 12:00 – 17:00</span>
        <span>Zo: gesloten</span>
      </div>
    </div>

    <Toast position="top-center"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import Link from './Link.vue';
import Toast from "primevue/toast";
import Sidebar from "primevue/sidebar";

const state = reactive({
  menuOpen: false,
});

function openMenu(isOpen) {
  state.menuOpen = isOpen;
}

</script>

