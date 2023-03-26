import { defineConfig } from 'vitest/config';

import { getAliases } from './tools/aliases';

export default defineConfig({
  resolve: {
    alias: getAliases(),
  },
  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
  },
});
