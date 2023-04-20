import { pick } from '.';

describe('pick', () => {
  it('should return an object with the specified properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should return an empty object if no keys are provided', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });

  it('should return an empty object if the input object is empty', () => {
    const obj = {};
    //@ts-expect-error props don't exist
    const result = pick(obj, ['a', 'b']);
    expect(result).toEqual({});
  });

  it('should ignore non-existent keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    // @ts-expect-error props don't exist
    const result = pick(obj, ['a', 'd']);
    expect(result).toEqual({ a: 1 });
  });

  it('should return an object with the correct types', () => {
    const obj = { a: 1, b: '2', c: true };
    const result = pick(obj, ['a', 'b']);
    expect(result).toEqual({ a: 1, b: '2' });
    expect(typeof result.a).toBe('number');
    expect(typeof result.b).toBe('string');
  });
});
