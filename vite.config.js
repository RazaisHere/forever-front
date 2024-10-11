import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from the local network
    port: 3000, // Optional: specify a port (default is 5173)
  },
   base: '/e-comm-forever/'
})
