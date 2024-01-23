<template>
  <a :class="{ active: pageContext.urlPathname === $attrs.href, cta: props.cta }">
    <slot/>
  </a>
</template>
<style scoped>
a {
  @apply pl-4;
}

a, a:hover {
  @apply text-black;
}

a.active:not(.cta) {
  @apply underline;
}

a:hover:not(.cta)
{
  @apply underline;
}

.cta {
  @apply border border-primary/30 hover:bg-primary/10 bg-primary/5 transition-all duration-300 rounded-md ml-4 px-4 py-2;
}
</style>
<script setup>
import {usePageContext} from './usePageContext'

const pageContext = usePageContext()

const props = defineProps({
  cta: Boolean
})
</script>
