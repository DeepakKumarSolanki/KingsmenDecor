import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 4096, // Limit inlining assets to 4KB
    outDir: 'dist', // Output directory
    assetsDir: 'assets', // Directory for static assets inside dist
    target: 'esnext', // Optimize for modern environments
    chunkSizeWarningLimit: 1000, // Avoid large chunk warnings
    rollupOptions: {
      output: {
        sourcemap: true, // Enable sourcemaps for debugging
      },
    },
  },
  server: {
    port: process.env.PORT || 5173, // Bind to Render's dynamic port or fallback to 5173
    host: '0.0.0.0', // Allow external access
  },
  resolve: {
    alias: {
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      '@mui/styled-engine': '@mui/styled-engine',
    },
  },
});
