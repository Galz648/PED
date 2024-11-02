// import { defineConfig } from 'vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//     base: "/home"
// })

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        editor: './editor.html',
        shortcuts: './shortcuts.html'
      }
    }
  },

})

