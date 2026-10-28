import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: { allowedHosts: ['terminal.local'] },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});

