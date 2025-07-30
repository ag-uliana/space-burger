import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/space-burger',
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
