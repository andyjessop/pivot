import { cx } from '.';

describe('classnames', () => {
  describe('cx', () => {
    test('cx should combine class names', () => {
      const result = cx('class1', { class2: true }, null, undefined, 'class3');

      expect(result).toBe('class1 class2 class3');
    });

    test('cx should not apply class if property is undefined', () => {
      let a;

      const result = cx({ class2: a });

      expect(result).toBe('');
    });

    test('cx should return empty string if no arguments given', () => {
      const result = cx();

      expect(result).toBe('');
    });

    test('cx should return empty string if null is provided', () => {
      const result = cx(null);

      expect(result).toBe('');
    });

    test('cx should return empty string if undefined is provided', () => {
      const result = cx(undefined);

      expect(result).toBe('');
    });

    test('cx should ignore falsy values in object', () => {
      const result = cx({ class1: true, class2: false });

      expect(result).toBe('class1');
    });

    test('cx should handle incorrect argument types', () => {
      // @ts-expect-error booleans are not a valid argument type
      const result = cx('class1', false, 'class2');

      expect(result).toBe('class1 class2');
    });

    test('cx should handle multiple objects', () => {
      const result = cx({ class1: true }, { class2: false }, { class3: true });

      expect(result).toBe('class1 class3');
    });

    test('cx should handle multiple falsy values', () => {
      // @ts-expect-error booleans are not a valid argument type
      const result = cx(false, null, undefined, 0, '');

      expect(result).toBe('');
    });
  });
});
