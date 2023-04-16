import { externallyResolvablePromise } from './index';

describe('util-promise', () => {
  describe('externallyResolvablePromise', () => {
    it('should resolve with external method', async () => {
      const result = 'foobar';
      const { promise, resolve } = externallyResolvablePromise();

      resolve(result);

      return promise.then((res) => {
        expect(res).toEqual(result);
      });
    });

    it('should reject with external method', async () => {
      const result = 'bazbar';
      const { promise, reject } = externallyResolvablePromise();

      reject(result);

      return promise.catch((res) => {
        expect(res).toEqual(result);
      });
    });
  });
});
