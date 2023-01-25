<template>
  <a :class="{ active: pageContext.urlPathname === $attrs.href }">
    <slot />
  </a>
</template>
<style scoped>
a {
  padding: 3px 10px;
}
/* a.active {
  @apply bg-neutral-100
  @apply underline;
} */

a:hover/*:not(a.active)*/ {
  @apply underline;
}
</style>
<script setup>
import { usePageContext } from './usePageContext'
const pageContext = usePageContext()
</script>
