<template>
    <h3 v-if="page.title" class="title text-4xl mb-16">{{page.title}}</h3>
    <div v-html="page.html"></div>
</template>
<script>
    const pageProps = ['page'];
    export default {props: pageProps};
</script>
<style scoped>
    p {
        @apply mb-4
    }
</style>
