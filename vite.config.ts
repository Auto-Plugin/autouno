import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import dts from 'vite-plugin-dts'

import autoUno from './src'
import path from 'path'

export default defineConfig({
  root: path.resolve(process.cwd(), './dev'),
  plugins: [
    unocss({
      presets: [
        autoUno(),
      ],
    }),
    dts(),
  ],
  build: {
    outDir: '../dist',
    lib: {
      entry: path.resolve(process.cwd(), './src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['unocss'],
    }
  }
})