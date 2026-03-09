import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        standardiste: resolve(__dirname, 'standardiste.html'),
        assistante_rh: resolve(__dirname, 'assistante-rh.html'),
        generation_leads: resolve(__dirname, 'generation-leads.html'),
        packs_startup: resolve(__dirname, 'packs-startup.html'),
        lazarus: resolve(__dirname, 'lazarus.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
