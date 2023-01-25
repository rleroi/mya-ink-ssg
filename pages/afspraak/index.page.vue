<template>
  <h3 class="title text-4xl">Maak een afspraak</h3>
  <div class="mt-16">
    <p>
      Wil je een afspraak maken voor het zetten van een tattoo of wil je een tattoo bespreking inplannen?<br />
      Laat dan een bericht achter via het contactformulier hieronder.
    </p>
    <p>
      Of stuur een email naar <a class="underline" href="mailto:info@mya-ink.nl">info@mya-ink.nl</a>
    </p>
  </div>

  <div class="mt-8">
    <form class="flex flex-col md:max-w-sm" action="https://formkeep.com/f/dc52ec5b142e" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">
      <div>Uw naam*</div>
      <input required class="mb-8 border-neutral-400 border" type="text" />

      <div>Uw mailadres*</div>
      <input required class="mb-8 border-neutral-400 border" type="email" />

      <div>Uw telefoonnummer</div>
      <input class="mb-8 border-neutral-400 border" type="tel" />

      <div>Omschrijf de gewenste tattoo (Grootte, plaatsing, etc.)*</div>
      <textarea required class="mb-8 border-neutral-400 border" cols="40" rows="10"></textarea>

      <div>Voeg eventueel een afbeelding toe</div>
      <input class="mb-8" type="file" />

      <div>
        <input type="submit" class="bg-primary px-8 py-4 text-white" role="button" value="Verzenden">
      </div>
    </form>

  </div>

</template>

<script setup>
</script>

<style scoped>
p {
  @apply mb-4
}
</style>