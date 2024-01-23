<template>
  <div>
    <h3 v-if="page.title" class="title text-4xl mb-16">{{ page.title }}</h3>
    <div class="flex flex-col gap-8">
      <div v-html="page.html"></div>

      <div class="md:rounded w-screen md:w-full -mx-8 md:mx-0 p-8 md:p-4 lg:p-16 md:border bg-gray-100 flex flex-col md:flex-row gap-4 lg:gap-16">
        <form @submit.prevent="sendMail" ref="form" class="flex flex-col md:max-w-sm justify-center items-stretch"
              action="#" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">

          <span class="mb-4">
            <input-text @blur="state.isDirty.name = true" :class="{'p-invalid': state.isDirty.name && !state.mail.name}" v-model="state.mail.name" class="w-full" id="name" placeholder="Naam*"></input-text>
          </span>
          <span class="mb-4">
            <input-text @blur="state.isDirty.address = true" :class="{'p-invalid': state.isDirty.address && !state.mail.address}" v-model="state.mail.address" class="w-full" id="address" type="email"
                        placeholder="Emailadres*"></input-text>
          </span>
          <span class="mb-4">
            <input-text v-model="state.mail.phone" id="phone" class="w-full" type="tel"
                        placeholder="Telefoonnummer"></input-text>
          </span>
          <span class="mb-4">
            <multi-select placeholder="Kies beschikbare dagen" scroll-height="500px" id="days" class="w-full"
                          v-model="state.days" display="chip"
                          :options="['Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']"/>
          </span>
          <span class="mb-4">
            <TextArea @blur="state.isDirty.body = true" :class="{'p-invalid': state.isDirty.body && !state.mail.body}" v-model="state.mail.body" autoResize id="body" class="border-green w-full" size="small" cols="40" rows="5"
                      placeholder="Tattoo omschrijving*"></TextArea>
            <small class="opacity-60">Omschrijf gewenste grootte in CM, lichaamsdeel, etc.</small>
          </span>
          <div class="mb-8">
            <label for="file">
              <input multiple ref="file" class="hidden" type="file" id="file"
                     @change="state.mail.file = $event.target.files?.[0]" accept="image/*"/>
              <Button @click="addFile" class="w-full flex justify-center bg-white" outlined>
                <span>{{ state.mail.file ? state.mail.file.name : 'Afbeelding toevoegen' }}</span>
                <i class="pi pi-image w-6 ml-2"/>
              </Button>
            </label>
          </div>

          <div class="">
            <Button type="submit" class="w-full flex justify-center">
              <span>Verzenden</span>
              <i class="pi pi-send w-6 ml-2"/>
            </Button>
          </div>
        </form>

        <div class="w-full hidden md:block h-[618px] rounded-md border bg-gray-100 overflow-hidden">
          <iframe class="border-none h-full w-full" style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Mya%20Ink%2C%20Molenvlietbrink%2C%20Woerden%2C%20Netherlands&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
        </div>
      </div>

      <div class="w-full mt-16 h-[300px] md:hidden rounded-md border bg-gray-100 overflow-hidden">
        <iframe class="border-none h-full w-full" style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Mya%20Ink%2C%20Molenvlietbrink%2C%20Woerden%2C%20Netherlands&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
      </div>

    </div>
  </div>
</template>

<script>
const pageProps = ['page'];
export default {props: pageProps};
</script>

<script setup>
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import {useToast} from "primevue/usetoast";
import {reactive, ref} from 'vue'

const form = ref(null);
const file = ref(null);
const toast = useToast();

const state = reactive({
  days: [],
  isDirty: {
    name: false,
    address: false,
    body: false,
  },
  mail: {
    name: null,
    address: null,
    phone: null,
    body: null,
    file: null,
    days: null,
  }
});

function addFile() {
  file.value.click();
}

async function sendMail() {
  if (!state.mail.body || !state.mail.address || !state.mail.name) {
    toast.add({
      severity: 'warn',
      summary: 'Niet alles ingevuld',
      detail: 'Vul alle verplichte velden in a.u.b.',
      life: 5000,
    });
    state.isDirty.name = true;
    state.isDirty.address = true;
    state.isDirty.body = true;
    return;
  }

  let formData = new FormData();
  for (const [key, value] of Object.entries(state.mail)) {
    if (value) {
      formData.append(key, value);
    }
  }

  if (state.days.length) {
    formData.append('days', state.days.join(', '));
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(await res?.text());
    }

    for (const [key, value] of Object.entries(state.mail)) {
      state.mail[key] = null;
    }

    for (const [key, value] of Object.entries(state.mail)) {
      state.isDirty[key] = false;
    }

    state.days = [];

    form.value.reset();
    toast.add({severity: 'success', summary: 'Bericht verzonden', detail: 'Bedankt voor je aanvraag', life: 5000})
  } catch (e) {
    console.error(e.message);
    toast.add({
      severity: 'error',
      summary: 'Er ging iets fout',
      detail: 'Probeer het later opnieuw of mail naar info@mya-ink.nl',
      life: 5000
    })
  }
}
</script>
