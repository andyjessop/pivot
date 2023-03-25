import { DynamicStore } from '@pivot/dynamic-store';
import { Injectable } from '@pivot/injectable';
import { Slice } from '@pivot/slice';
import {
  ExternallyResolvablePromise,
  externallyResolvablePromise,
} from '@pivot/util-promise';

type SliceConfig<T extends Slice<any, any, any>> = {
  active: (state: any) => boolean;
  injectable: Injectable<T, any>;
};

type SliceEntry<T extends Slice<any, any, any>> = SliceConfig<T> & {
  instance?: Slice<any, any, any>;
  externallyResolvablePromise: ExternallyResolvablePromise<
    Slice<any, any, any>
  >;
  registering?: boolean;
  unregister?: () => void;
};

export type SliceCollection<
  T extends Slice<any, any, any> = Slice<any, any, any>,
> = Record<string, SliceConfig<T>>;
type SliceEntryCollection<T extends Slice<any, any, any>> = Record<
  string,
  SliceEntry<T>
>;

export function dynamicSliceRegistry<T extends Slice<any, any, any>>(
  store: DynamicStore,
  config: SliceCollection<T> = {},
) {
  const entries = Object.keys(config).reduce((acc, key) => {
    acc[key] = {
      ...config[key],
      externallyResolvablePromise: externallyResolvablePromise(),
    };
    return acc;
  }, {} as SliceEntryCollection<T>);

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
      const { active, injectable, registering, unregister } =
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

        const instance = await injectable.get();

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
