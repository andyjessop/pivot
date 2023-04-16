import { retry } from '.';

describe('retry function', () => {
  test('succeeds without retries', async () => {
    const fn = () => Promise.resolve(42);
    const result = await retry(fn);
    expect(result).toBe(42);
  });

  test('succeeds with retries', async () => {
    let counter = 0;
    const fn = () => {
      counter++;
      if (counter === 2) {
        return Promise.resolve(42);
      }
      return Promise.reject(new Error('Failed'));
    };
    const result = await retry(fn);
    expect(result).toBe(42);
  });

  test('fails when retries are exhausted', async () => {
    const fn = () => Promise.reject(new Error('Failed'));
    await expect(retry(fn)).rejects.toThrow('Retry failed');
  });

  test('respects custom successCondition', async () => {
    const fn = () => Promise.resolve(42);
    const successCondition = (result: number) => result === 24;
    await expect(retry(fn, successCondition)).rejects.toThrow('Retry failed');
  });
});
