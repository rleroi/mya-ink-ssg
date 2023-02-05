<template>
  <h3 v-if="page.title" class="title text-4xl mb-16">{{page.title}}</h3>
  <div v-html="page.html"></div>

  <div class="mt-8">
    <form @submit.prevent="sendMail" ref="form" class="flex flex-col md:max-w-sm" action="#" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">
      <div>Uw naam*</div>
      <input required v-model="state.mail.name" class="mb-8 border-neutral-400 border" type="text" />

      <div>Uw mailadres*</div>
      <input required v-model="state.mail.address" class="mb-8 border-neutral-400 border" type="email" />

      <div>Uw telefoonnummer</div>
      <input v-model="state.mail.phone" class="mb-8 border-neutral-400 border" type="tel" />

      <div>Omschrijf de gewenste tattoo (Grootte, plaatsing, etc.)*</div>
      <textarea required v-model="state.mail.body" class="mb-8 border-neutral-400 border" cols="40" rows="10"></textarea>

      <div>Voeg eventueel een afbeelding toe</div>
      <input @change="state.mail.file = $event.target.files?.[0]" class="mb-8" type="file" accept="image/*" tabindex="-1" />

      <div>
        <input type="submit" class="bg-primary px-8 py-4 text-white" role="button" value="Verzenden">
      </div>
      <div class="mt-4" v-if="state.sent">Je bericht is verzonden!</div>
    </form>

  </div>

</template>

<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>

<script setup>
import { reactive, ref } from 'vue'

const form = ref(null);

const state = reactive({
  sent: false,
  mail: {
    name: null,
    address: null,
    phone: null,
    body: null,
    file: null,
  }
});

async function sendMail() {
  let formData = new FormData();
  for(const [key, value] of Object.entries(state.mail)) {
    if (value) {
      formData.append(key, value);
    }
  }

  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(await res?.text());
    }

    for(const [key, value] of Object.entries(state.mail)) {
      state.mail[key] = null;
    }

    form.value.reset();
    state.sent = true;
  } catch(e) {
    console.error(e.message);
    window.alert('Er ging iets fout, probeer het later opnieuw of mail naar info@mya-ink.nl');
  }
}
</script>

<style scoped>
</style>