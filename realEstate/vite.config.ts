import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Updated for Vercel deployment
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'icons': ['lucide-react']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@icons': '/src/utils/iconAliases'
    }
  }
});
