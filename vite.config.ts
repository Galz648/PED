import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./public/index.html",
        editor: './public/editor.html',
        shortcuts: './public/shortcuts.html'
      }
    }
  },
})
