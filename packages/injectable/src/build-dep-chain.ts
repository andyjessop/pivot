import { Injectable } from '.';

export function buildDepChain(deps: Injectable[], current: Injectable[] = []) {
  for (const dep of deps) {
    if (!current.includes(dep)) {
      current.push(dep);

      buildDepChain(dep.dependencies || [], current);
    }
  }

  return [...new Set(current)];
}
