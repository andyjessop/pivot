import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNesting from 'postcss-nesting';
import { getAliases } from './aliases';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      ...getAliases(),
    },
  },
  server: {
    port: 3000,
  },
});
