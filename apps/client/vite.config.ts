import react from '@vitejs/plugin-react';
import { createHash } from 'crypto';
import path, { resolve } from 'path';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'vite';

import { getAliases } from './aliases';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      // Friendly class names in development
      generateScopedName:
        process.env.NODE_ENV === 'development'
          ? (name: string, filename: string, css: string) =>
              getClassName(name, filename, css)
          : '[name]__[local]___[hash:base64:5]',
    },
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

function getHash(text: Buffer | string): string {
  return createHash('sha256').update(text).digest('hex').substring(0, 4);
}

const tokenMap = new Map<string, string>();

function getClassName(
  classname: string,
  filename: string,
  css: string,
): string {
  const basename = path.basename(filename);

  const token = basename.includes('.scss')
    ? basename.replace(/\.module\.scss$/, '')
    : basename.replace(/\.module\.css$/, '');

  const file = tokenMap.get(token);

  if (!file) {
    tokenMap.set(basename, filename);

    return `${token}_${classname}`;
  }

  if (file === filename) {
    return `${token}_${classname}`;
  }

  return `${token}_${classname}_${getHash(css)}`;
}
