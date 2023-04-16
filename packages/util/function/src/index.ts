import { sleep } from '@pivot/util/time';

export const retry = async <T>(
  fn: () => Promise<T> | T,
  successCondition: (result: T) => boolean = () => true,
  retriesLeft = 3,
  interval = 1000,
): Promise<T> => {
  while (retriesLeft > 0) {
    try {
      const res = await fn();

      if (successCondition(res)) {
        return res;
      } else {
        retriesLeft--;
        await sleep(interval);
      }
    } catch (e) {
      retriesLeft--;
      await sleep(interval);
    }
  }

  throw new Error('Retry failed');
};
