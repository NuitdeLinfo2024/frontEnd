import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import compression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // Use gzip for compression (can be changed to 'brotli')
      threshold: 10240, // Only compress files larger than 10KB
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.6, 0.8],
        speed: 4,
      },
    }),
  ],
  build: {
    minify: 'esbuild', // Minification with esbuild (or terser for more aggressive)
    terserOptions: {
      compress: {
        drop_console: true, // Drop console.log statements
        drop_debugger: true, // Remove debugger
      },
    },
    cssCodeSplit: true, // Split CSS into smaller files
    cssMinify: true, // Enable CSS minification
    commonjsOptions: {
      include: [/node_modules/], // Optimize node_modules
    },
  },
})
