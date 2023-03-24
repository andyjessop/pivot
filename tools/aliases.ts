import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '../');
const fileName = 'tsconfig.json';

const format = (s: string) => s.replace('/*', '');

function readTsAliases() {
  return JSON.parse(readFileSync(resolve(root, fileName), 'utf-8'))
    .compilerOptions.paths;
}

export function getAliases(): Record<string, string> {
  const aliases = readTsAliases();

  return Object.keys(aliases).reduce((acc, key) => {
    const k = format(key);
    const v = format(aliases[key][0]);

    return { ...acc, ...{ [k]: resolve(root, v) } };
  }, {});
}
