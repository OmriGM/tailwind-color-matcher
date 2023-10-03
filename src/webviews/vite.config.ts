import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../media/compiled',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'main.[ext]',
      },
    },
  },
});
