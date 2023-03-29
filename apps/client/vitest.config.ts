import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

import { getAliases } from './aliases';

export default defineConfig({
  resolve: {
    alias: {
      ...getAliases(resolve(__dirname, '../../'), 'tsconfig.json'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./src/vitest.setup.ts'],
  },
});
