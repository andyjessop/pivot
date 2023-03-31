import { asyncQueue } from '.';

import { AsyncQueue } from './types';

describe('AsyncQueue', () => {
  let queue: AsyncQueue;

  beforeEach(() => {
    queue = asyncQueue();
  });

  it('should add functions to the queue', () => {
    const asyncFunction = async () => {
      /* noop */
    };

    queue.add(asyncFunction);

    expect(queue.entries.length).toBe(1);
  });

  it('should execute functions in the order they were added', async () => {
    const results: string[] = [];

    const asyncFunctionA = async () => {
      results.push('Function A');
    };
    const asyncFunctionB = async () => {
      results.push('Function B');
    };

    queue.add(asyncFunctionA);
    queue.add(asyncFunctionB);

    await queue.flush();

    expect(results).toEqual(['Function A', 'Function B']);
  });

  it('should resolve with the result of the function execution', async () => {
    const asyncFunction = async () => {
      return 'Result';
    };

    const promise = queue.add(asyncFunction);

    await queue.flush();

    const result = await promise;

    expect(result).toBe('Result');
  });

  it('should reject with an error when the function execution fails', async () => {
    const error = new Error('Function failed');

    const asyncFunction = async () => {
      throw error;
    };

    const promise = queue.add(asyncFunction);

    await queue.flush();

    await expect(promise).rejects.toThrow(error);
  });

  it('should clear the queue', () => {
    const asyncFunction = async () => {
      /* noop */
    };

    queue.add(asyncFunction);

    queue.clear();

    expect(queue.entries.length).toBe(0);
  });

  it('should not execute functions if the queue is cleared', async () => {
    queue = asyncQueue(false);

    const results: string[] = [];

    const asyncFunctionA = async () => {
      results.push('Function A');
    };
    const asyncFunctionB = async () => {
      results.push('Function B');
    };

    queue.add(asyncFunctionA);
    queue.add(asyncFunctionB);

    queue.clear();

    await queue.flush();

    expect(results).toEqual([]);
  });
});
