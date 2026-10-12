<template>
  <!-- Mobiel: intro, foto, formulier, 'Na je aanvraag' (linkerkolom wordt 'contents' zodat de volgorde mengt) -->
  <section class="container-site pt-4 lg:pt-20 pb-0 lg:pb-[120px] flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:gap-20">
    <div class="contents lg:flex lg:flex-[1_1_380px] lg:min-w-0 lg:flex-col lg:gap-7">
      <div class="order-1 flex flex-col gap-3.5 lg:gap-7">
        <p class="eyebrow">Afspraak</p>
        <h1 class="display m-0 text-[44px] lg:text-[clamp(48px,6vw,84px)] leading-none">Vertel me over<br class="hidden lg:inline"> <span class="italic">je idee</span></h1>
        <p class="m-0 max-w-[420px] text-[15px] lg:text-[17px] leading-[1.6] lg:leading-[1.7] text-body">Elke tattoo begint met een gesprek. Ik tatoeëer vanaf 18 jaar. Hoe meer je vertelt — plek, grootte in cm, stijl, voorbeelden — hoe beter het eerste voorstel.</p>
      </div>
      <img src="/images/studio-stoel-800.webp" srcset="/images/studio-stoel-800.webp 800w, /images/studio-stoel-1600.webp 1600w" sizes="520px" width="1600" height="1067" alt="De studio, met planten en de tattoostoel" loading="lazy"
           class="order-2 block w-full lg:max-w-[520px] h-[200px] lg:h-[300px] object-cover rounded lg:mt-2">
      <div class="order-4 flex flex-col lg:max-w-[460px] mt-4 max-lg:bg-white max-lg:-mx-5 max-lg:px-5 max-lg:py-10">
        <p class="eyebrow mb-2">Na je aanvraag</p>
        <div v-for="(item, i) in after" :key="item.title" class="flex gap-4 lg:gap-5 py-4 lg:py-5 border-t border-line last:border-b">
          <span class="font-display italic text-2xl lg:text-[28px] leading-none text-plum" aria-hidden="true">0{{ i + 1 }}</span>
          <div class="flex flex-col gap-1">
            <strong class="text-base font-semibold">{{ item.title }}</strong>
            <span class="text-[15px] leading-[1.6] text-body">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="order-3 lg:flex-[1_1_480px] min-w-0 pt-2 lg:bg-white lg:rounded lg:p-14">
      <div v-if="state.sent" class="flex flex-col gap-5 py-20 text-center items-center" role="status">
        <span class="font-display italic text-[56px] text-plum">Dank je.</span>
        <p class="m-0 max-w-[360px] text-[17px] leading-[1.7] text-body">Je aanvraag is verzonden. Ik neem zo snel mogelijk contact met je op.</p>
        <button class="btn btn-dark hidden lg:inline-flex" type="button" @click="state.sent = false">Nog een aanvraag</button>
      </div>

      <form v-else id="afspraak-form" ref="form" class="flex flex-col gap-7 lg:gap-8" novalidate @submit.prevent="sendMail"
            action="#" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          <div class="field">
            <label for="name" :class="{ invalid: invalid('name') }">Naam *</label>
            <input id="name" v-model="state.mail.name" type="text" autocomplete="name" required
                   :aria-invalid="invalid('name')" @blur="state.isDirty.name = true">
            <small v-if="invalid('name')" class="error">Vul je naam in</small>
          </div>
          <div class="field">
            <label for="address" :class="{ invalid: invalid('address') }">E-mailadres *</label>
            <input id="address" v-model="state.mail.address" type="email" autocomplete="email" required
                   :aria-invalid="invalid('address')" @blur="state.isDirty.address = true">
            <small v-if="invalid('address')" class="error">Vul je e-mailadres in</small>
          </div>
        </div>
        <div class="field">
          <label for="phone">Telefoonnummer</label>
          <input id="phone" v-model="state.mail.phone" type="tel" autocomplete="tel">
        </div>
        <fieldset class="border-0 m-0 p-0">
          <legend class="text-[13px] font-medium tracking-[.04em] p-0 mb-3">Beschikbare dagen</legend>
          <div class="flex flex-wrap gap-2">
            <button v-for="day in days" :key="day" type="button" class="chip" :class="{ on: state.days.includes(day) }"
                    :aria-pressed="state.days.includes(day)" @click="toggleDay(day)">{{ day }}</button>
          </div>
        </fieldset>
        <div class="field">
          <label for="body" :class="{ invalid: invalid('body') }">Omschrijving van de tattoo *</label>
          <textarea id="body" v-model="state.mail.body" rows="4" required class="resize-y"
                    :aria-invalid="invalid('body')" aria-describedby="body-hint" @blur="state.isDirty.body = true"></textarea>
          <small v-if="invalid('body')" class="error">Omschrijf je tattoo-idee</small>
          <small id="body-hint" class="text-[13px] text-muted">Gewenste grootte in cm, lichaamsdeel, stijl.</small>
        </div>
        <div class="flex flex-col gap-3">
          <ul v-if="state.photos.length" class="list-none m-0 p-0 grid grid-cols-3 sm:grid-cols-5 gap-2" aria-label="Gekozen foto's">
            <li v-for="(photo, i) in state.photos" :key="photo.url" class="relative">
              <img :src="photo.url" :alt="`Voorbeeld ${i + 1}`" class="w-full aspect-square object-cover rounded block">
              <button type="button" class="remove" :aria-label="`Verwijder foto ${i + 1}`" @click="removePhoto(i)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
              </button>
            </li>
          </ul>
          <template v-if="state.photos.length < MAX_PHOTOS">
            <input id="file" class="sr-only" type="file" accept="image/*" multiple @change="addPhotos"/>
            <label for="file" class="upload">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><path d="M21 16l-5-5-9 9"></path></svg>
              <span>{{ state.processing ? 'Foto\'s verwerken…' : state.photos.length ? 'Nog een foto toevoegen' : 'Voorbeeldfoto\'s toevoegen' }}</span>
            </label>
          </template>
          <small class="text-[13px] text-muted">Maximaal {{ MAX_PHOTOS }} foto's, bijvoorbeeld van je idee of de plek op je lichaam.</small>
        </div>
        <label class="flex items-center gap-3 min-h-[44px] text-[15px] cursor-pointer" :class="{ 'text-danger': invalid('adult') }">
          <input v-model="state.adult" type="checkbox" required class="w-5 h-5 m-0 accent-ink" :aria-invalid="invalid('adult')">
          Ik ben 18 jaar of ouder *
        </label>
        <p class="m-0 -mt-3 text-[13px] leading-normal text-muted">Je gegevens gebruik ik alleen om je aanvraag te beantwoorden. Lees de <a href="/privacyverklaring" class="text-muted underline underline-offset-2">privacyverklaring</a>.</p>
        <button class="btn btn-dark hidden lg:inline-flex self-start min-w-[200px]" type="submit" :disabled="state.sending">
          {{ state.sending ? 'Bezig met verzenden…' : 'Verzenden' }}
        </button>
      </form>
    </div>
  </section>

  <div class="fixed inset-x-0 bottom-0 z-40 lg:hidden px-5 pt-3 pb-6 bg-paper border-t border-line">
    <button v-if="state.sent" class="btn btn-dark w-full min-h-[52px]" type="button" @click="state.sent = false">Nog een aanvraag</button>
    <button v-else class="btn btn-dark w-full min-h-[52px]" type="submit" form="afspraak-form" :disabled="state.sending">
      {{ state.sending ? 'Bezig met verzenden…' : 'Aanvraag verzenden' }}
    </button>
  </div>
</template>

<script>
const pageProps = ['page'];
export default {props: pageProps};
</script>

<script setup>
import {reactive, ref} from 'vue'
import {useToast} from '../../renderer/useToast';

defineProps(['page']);

const form = ref(null);
const toast = useToast();

const days = ['Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

const after = [
  {title: 'Reactie', text: 'Je hoort binnen 3 werkdagen van me, met vragen of een eerste idee.'},
  {title: 'Afspraak & aanbetaling', text: 'Wil je eerst langskomen voor een gesprek? Dat kan altijd. Bij het inplannen van de afspraak vraag ik een aanbetaling.'},
  {title: 'Op de dag zelf', text: 'We nemen eerst samen het ontwerp en de plek door voordat ik begin.'},
];

const MAX_PHOTOS = 5;
const MAX_SIZE = 1600;

const state = reactive({
  days: [],
  photos: [],
  processing: false,
  adult: false,
  sent: false,
  sending: false,
  isDirty: {
    name: false,
    address: false,
    body: false,
    adult: false,
  },
  mail: {
    name: null,
    address: null,
    phone: null,
    body: null,
  }
});

function invalid(key) {
  if (!state.isDirty[key]) {
    return false;
  }

  return key === 'adult' ? !state.adult : !state.mail[key];
}

function toggleDay(day) {
  state.days = state.days.includes(day) ? state.days.filter((d) => d !== day) : [...state.days, day];
}

// Telefoonfoto's zijn vaak 3-8 MB: verkleinen tot max. 1600px JPEG voordat ze verstuurd worden
async function resize(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';

    return blob ? new File([blob], name, {type: 'image/jpeg'}) : file;
  } catch (e) {
    // Formaat dat de browser niet kan lezen (bijv. HEIC op sommige toestellen): origineel meesturen
    return file;
  }
}

async function addPhotos(event) {
  const files = [...(event.target.files || [])].slice(0, MAX_PHOTOS - state.photos.length);
  event.target.value = '';
  state.processing = true;

  for (const original of files) {
    const file = await resize(original);
    state.photos.push({file, url: URL.createObjectURL(file)});
  }

  state.processing = false;
}

function removePhoto(i) {
  URL.revokeObjectURL(state.photos[i].url);
  state.photos.splice(i, 1);
}

function clearPhotos() {
  state.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
  state.photos = [];
}

async function sendMail() {
  if (!state.mail.body || !state.mail.address || !state.mail.name || !state.adult) {
    toast.add({
      severity: 'warn',
      summary: 'Niet alles ingevuld.',
      detail: 'Vul alle verplichte velden in a.u.b.',
      life: 5000,
    });
    for (const key of Object.keys(state.isDirty)) {
      state.isDirty[key] = true;
    }
    return;
  }

  let formData = new FormData();

  if (state.days.length) {
    formData.append('days', state.days.join(', '));
  }
  for (const photo of state.photos) {
    formData.append('files', photo.file, photo.file.name);
  }

  for (const [key, value] of Object.entries(state.mail)) {
    if (value) {
      formData.append(key, value);
    }
  }

  state.sending = true;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(await res?.text());
    }

    for (const key of Object.keys(state.mail)) {
      state.mail[key] = null;
    }

    for (const key of Object.keys(state.isDirty)) {
      state.isDirty[key] = false;
    }

    state.days = [];
    clearPhotos();
    state.adult = false;
    state.sent = true;
  } catch (e) {
    console.error(e.message);
    toast.add({
      severity: 'error',
      summary: 'Er ging iets fout.',
      detail: 'Probeer het later opnieuw of mail naar info@mya-ink.nl',
      life: 5000
    })
  } finally {
    state.sending = false;
  }
}
</script>

<style scoped>
.field {
  @apply flex flex-col gap-2;
}

.field label {
  @apply text-[13px] font-medium tracking-[.04em];
}

.field label.invalid,
.error {
  @apply text-danger;
}

.error {
  @apply text-[13px];
}

.field input,
.field textarea {
  @apply font-sans text-base text-ink bg-transparent border-0 border-b border-solid border-[#9C978F] px-0 py-2.5 rounded-none outline-none;
}

.field input:focus,
.field textarea:focus {
  @apply border-ink shadow-[0_1px_0_#161514];
}

.field input[aria-invalid="true"],
.field textarea[aria-invalid="true"] {
  @apply border-danger;
}

.chip {
  @apply font-sans text-sm min-h-[44px] px-[18px] rounded-full border border-solid border-[#9C978F] bg-transparent text-ink cursor-pointer transition-colors;
}

.chip.on {
  @apply bg-ink border-ink text-paper;
}

.upload {
  @apply flex items-center justify-center gap-2.5 min-h-[56px] px-4 border border-dashed border-[#9C978F] rounded text-[15px] text-body cursor-pointer transition-colors hover:border-ink hover:text-ink;
}

.remove {
  @apply absolute top-1 right-1 w-7 h-7 flex items-center justify-center rounded-full border-0 bg-ink/80 text-paper cursor-pointer hover:bg-ink;
}

#file:focus-visible + .upload {
  @apply outline outline-2 outline-offset-2 outline-plum;
}
</style>
