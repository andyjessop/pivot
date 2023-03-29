import { Injectable } from './types';

export function byDependencyOrder(a: Injectable, b: Injectable) {
  // a ends up before b
  if (b.dependencies?.includes(a)) {
    return -1;
  }

  // a ends up after b
  if (a.dependencies?.includes(b)) {
    return 1;
  }

  // doesn't matter which one comes first
  return 0;
}
