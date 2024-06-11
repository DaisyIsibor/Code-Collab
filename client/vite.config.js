// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5051',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
