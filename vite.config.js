import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://kolokopo.github.io/storybook-pages/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        hoistTransitiveImports: true,
      },
    },
  },
});