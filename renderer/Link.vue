<template>
  <a :class="{ active: isActive, cta: props.cta, 'btn btn-dark': props.cta }" :aria-current="isActive ? 'page' : null">
    <slot/>
  </a>
</template>
<style scoped>
a:not(.cta) {
  @apply no-underline text-[15px] tracking-[.02em];
}

a.active:not(.cta),
a:hover:not(.cta) {
  @apply underline underline-offset-[6px];
}
</style>
<script setup>
import {computed, useAttrs} from 'vue';
import {usePageContext} from './usePageContext'

const pageContext = usePageContext()
const attrs = useAttrs()

const props = defineProps({
  cta: Boolean
})

const trim = (path) => (path || '').replace(/\/+$/, '') || '/'
const isActive = computed(() => trim(pageContext.urlPathname) === trim(attrs.href))
</script>
