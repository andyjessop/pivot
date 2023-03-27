import { readFileSync } from 'fs';
import { resolve } from 'path';

const format = (s: string) => s.replace('/*', '');

function readTsAliases(root: string, filename: string) {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf-8'))
    .compilerOptions.paths;
}

export function getAliases(
  root: string,
  filename: string,
): Record<string, string> {
  const aliases = readTsAliases(root, filename);

  return Object.keys(aliases).reduce((acc, key) => {
    const k = format(key);
    const v = format(aliases[key][0]);

    return { ...acc, ...{ [k]: resolve(root, v) } };
  }, {});
}
