import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base fica em '/' por padrao. Para publicar em subpasta (GitHub Pages),
// rode `vite build --base=/portfolio/` — o router le import.meta.env.BASE_URL.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
