export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result: Partial<T> = {};

  const omitKeys = new Set(keys);

  Object.keys(obj).forEach((key) => {
    if (!omitKeys.has(key as K)) {
      result[key as keyof T] = obj[key as keyof T];
    }
  });

  return result as Omit<T, K>;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result: Partial<T> = {};

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result as Pick<T, K>;
}
