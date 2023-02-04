<template>
  <h3 v-if="page.title" class="title text-4xl mb-16">{{page.title}}</h3>
  <div v-html="page.html"></div>

  <div class="mt-8">
    <form @submit.prevent="sendMail" ref="form" class="flex flex-col md:max-w-sm" action="#" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">
      <div>Uw naam*</div>
      <input required v-model="mail.name" class="mb-8 border-neutral-400 border" type="text" />

      <div>Uw mailadres*</div>
      <input required v-model="mail.address" class="mb-8 border-neutral-400 border" type="email" />

      <div>Uw telefoonnummer</div>
      <input v-model="mail.phone" class="mb-8 border-neutral-400 border" type="tel" />

      <div>Omschrijf de gewenste tattoo (Grootte, plaatsing, etc.)*</div>
      <textarea required v-model="mail.body" class="mb-8 border-neutral-400 border" cols="40" rows="10"></textarea>

      <div>Voeg eventueel een afbeelding toe</div>
      <input @change="mail.file = $event.target.files?.[0]" class="mb-8" type="file" accept="image/*" tabindex="-1" />

      <div>
        <input type="submit" class="bg-primary px-8 py-4 text-white" role="button" value="Verzenden">
      </div>
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

const mail = reactive({
  name: null,
  address: null,
  phone: null,
  body: null,
  file: null,
});

function sendMail() {
  let formData = new FormData();
  for(const [key, value] of Object.entries(mail)) {
    formData.append(key, value);
  }

  try {
    fetch('http://127.0.0.1:8788/api/contact', {
      method: 'POST',
      body: formData,
    });
  } catch(e) {
    console.error(e.message);
    window.alert('Er ging iets fout, probeer het later opnieuw of mail naar info@mya-ink.nl');
  }

  for(const [key, value] of Object.entries(mail)) {
    mail[key] = null;
  }
  form.value.reset();
}
</script>

<style scoped>
p {
  @apply mb-4
}
</style>