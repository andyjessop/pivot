import { defineConfig } from 'vitest/config';

import { getAliases } from './tools/aliases';

export default defineConfig({
  resolve: {
    alias: getAliases(),
  },
  test: {
    globals: true,
    passWithNoTests: true,
  },
});
