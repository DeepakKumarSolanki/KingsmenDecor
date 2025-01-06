// 

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Ensures assets are not inlined as base64
    outDir: 'dist', // Output directory
    assetsDir: 'assets', // Directory for static assets inside dist
  },
  resolve: {
    alias: {
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      '@mui/styled-engine': '@mui/styled-engine',
    },
  },
});
