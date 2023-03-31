type AnyFunction = (...args: any[]) => void;

export interface AsyncQueue {
  add(fn: AnyFunction, ...params: unknown[]): Promise<unknown>;
  clear(): void;
  entries: AsyncQueueEntry[];
  flush(): Promise<unknown>;
}

export interface AsyncQueueEntry {
  fn: AnyFunction;
  params: unknown[];
  reject: AnyFunction;
  resolve: AnyFunction;
}

export function asyncQueue(): AsyncQueue {
  const entries: AsyncQueueEntry[] = [];
  let flushing = false;

  return {
    add,
    clear,
    entries,
    flush,
  };

  function add(fn: AnyFunction, ...params: unknown[]): Promise<unknown> {
    let rej: AnyFunction = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    let res: AnyFunction = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });

    entries.push({
      fn,
      params,
      reject: rej,
      resolve: res,
    });

    return promise;
  }

  function clear() {
    flushing = false;

    entries.length = 0;
  }

  async function flush(): Promise<void> {
    if (flushing) {
      return;
    }

    const entry = entries[0];

    if (!entry) {
      return;
    }

    flushing = true;

    try {
      const result = await entry.fn(...entry.params);

      entry.resolve(result);

      entries.shift();

      flushing = false;

      return flush();
    } catch (e) {
      entry.reject(e);
    }
  }
}
