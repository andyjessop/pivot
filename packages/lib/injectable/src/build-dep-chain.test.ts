import { buildDepChain } from './build-dep-chain';
import { Injectable } from './types';

describe('injectable', () => {
  describe('buildDepChain', () => {
    it('should build dependency chain for injectables without dependencies', () => {
      const injectables = [
        { dependencies: undefined },
      ] as unknown as Injectable[];

      expect(buildDepChain(injectables)).toEqual(injectables);
    });

    it('should build dependency chain for injectables with dependencies', () => {
      const dep1 = { dependencies: undefined };
      const dep2 = { dependencies: [dep1] };
      const dep3 = { dependencies: [dep2] };
      const injectables = [dep3] as unknown as Injectable[];

      expect(buildDepChain(injectables)).toEqual([dep3, dep2, dep1]);
    });

    it('should build dependency chain for injectables with shared dependencies', () => {
      const dep1 = { dependencies: undefined };
      const dep2 = { dependencies: [dep1] };
      const dep3 = { dependencies: [dep1] };
      const dep4 = { dependencies: [dep2, dep3] };
      const injectables = [dep4] as unknown as Injectable[];

      expect(buildDepChain(injectables)).toEqual([dep4, dep2, dep1, dep3]);
    });

    it('should not add injectables that have already been added to the dependency chain', () => {
      const dep1 = { dependencies: undefined };
      const dep2 = { dependencies: [dep1] };
      const dep3 = { dependencies: [dep2] };
      const injectables = [dep3, dep2] as unknown as Injectable[];

      expect(buildDepChain(injectables)).toEqual([dep3, dep2, dep1]);
    });
  });
});
