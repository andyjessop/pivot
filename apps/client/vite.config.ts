import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'vite';

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
      ...getAliases(resolve(__dirname, '../../'), 'tsconfig.json'),
    },
  },
  server: {
    port: 3000,
  },
});
