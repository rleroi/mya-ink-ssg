import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'

export default {
  plugins: [vue(), ssr({prerender: true})],
  ssr: {
    noExternal: ['primevue'],
  }
}
