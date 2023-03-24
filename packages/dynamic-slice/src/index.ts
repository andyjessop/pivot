import { DynamicStore } from '@pivot/dynamic-store';
import { slice, Slice } from '@pivot/slice';
import {
  ExternallyResolvablePromise,
  externallyResolvablePromise,
} from '@pivot/util-promise';

type AsyncFactoryFn<T, S> = () => Promise<{
  initialState: S;
  reducers: T;
}>;

type SliceConfig = {
  active: (state: any) => boolean;
  asyncFactoryFn: AsyncFactoryFn<any, any>;
};

type SliceEntry = SliceConfig & {
  instance?: Slice<any, any, any>;
  externallyResolvablePromise: ExternallyResolvablePromise<
    Slice<any, any, any>
  >;
  registering?: boolean;
  unregister?: () => void;
};

export type SliceCollection = Record<string, SliceConfig>;
type SliceEntryCollection = Record<string, SliceEntry>;

export function registerDynamicSlices(
  store: DynamicStore,
  config: SliceCollection = {},
) {
  const entries = Object.keys(config).reduce((acc, key) => {
    acc[key] = {
      ...config[key],
      externallyResolvablePromise: externallyResolvablePromise(),
    };
    return acc;
  }, {} as SliceEntryCollection);

  store.subscribe(listener);

  listener();

  return {
    get,
  };

  async function get(sliceName: string): Promise<Slice<any>> {
    return entries[sliceName].externallyResolvablePromise.promise;
  }

  async function listener() {
    const state = store.getState();
    const sliceNames = Object.keys(config);

    for (const sliceName of sliceNames) {
      const { active, asyncFactoryFn, registering, unregister } =
        entries[sliceName];

      const shouldBeActive = active(state);

      if (
        (shouldBeActive && (unregister || registering)) || // should be active and is
        (!shouldBeActive && !unregister && !registering) // should not be active and is not
      ) {
        return;
      }

      if (shouldBeActive) {
        // should be active and is not
        entries[sliceName].registering = true;

        const { initialState, reducers } = await asyncFactoryFn();
        const instance = slice(sliceName, initialState, reducers);

        const removeMiddleware = store.addMiddleware(instance.middleware);
        const removeReducer = store.addReducer(sliceName, instance.reducer);

        entries[sliceName] = {
          ...entries[sliceName],
          registering: false,
          unregister: () => {
            removeMiddleware();
            removeReducer();
            entries[sliceName].unregister = undefined;
          },
        };

        entries[sliceName].externallyResolvablePromise.resolve(instance);

        return;
      }

      // should not be active and is
      entries[sliceName].registering = false;
      unregister?.();
    }
  }
}
