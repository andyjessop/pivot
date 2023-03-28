import { DynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';
import { Slice } from '@pivot/lib/slice';
import {
  ExternallyResolvablePromise,
  externallyResolvablePromise,
} from '@pivot/util/promise';

type SliceConfig<T extends Slice<any>> = {
  active: (state: any) => boolean;
  injectable: Injectable<T, any>;
};

type SliceEntry<T extends Slice<any>> = SliceConfig<T> & {
  instance?: Slice<any>;
  externallyResolvablePromise: ExternallyResolvablePromise<
    Slice<any, any, any>
  >;
  registering?: boolean;
  unregister?: () => void;
};

export function dynamicSliceRegistry<
  T extends Record<keyof T, SliceConfig<any>>,
>(store: DynamicStore, config: T) {
  type SliceEntryCollection = {
    [K in keyof T]: SliceEntry<ExtractInstance<T[K]['injectable']>>;
  };

  const entries = (Object.keys(config) as (keyof T)[]).reduce((acc, key) => {
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
    select,
  };

  async function get<K extends keyof SliceEntryCollection>(
    sliceName: K,
  ): Promise<ExtractInstance<Injectable<T[K]['injectable']['instance']>>> {
    return entries[sliceName].externallyResolvablePromise.promise;
  }

  async function listener() {
    const state = store.getState();
    const sliceNames = Object.keys(config) as (keyof T & string)[];

    for (const sliceName of sliceNames) {
      const { active, injectable, registering, unregister } =
        entries[sliceName];

      const shouldBeActive = active(state);

      if (
        (shouldBeActive && (unregister || registering)) || // should be active and is
        (!shouldBeActive && !unregister && !registering) // should not be active and is not
      ) {
        continue;
      }

      if (shouldBeActive) {
        // should be active and is not
        entries[sliceName].registering = true;

        const instance = await injectable.get();

        const removeMiddleware = store.addMiddleware(instance.middleware);
        const removeReducer = store.addReducer(sliceName, instance.reducer);

        entries[sliceName] = {
          ...entries[sliceName],
          instance,
          registering: false,
          unregister: () => {
            removeMiddleware();
            removeReducer();
            entries[sliceName].unregister = undefined;
          },
        };

        entries[sliceName].externallyResolvablePromise.resolve(instance);

        continue;
      }

      // should not be active and is
      entries[sliceName].registering = false;
      unregister?.();
    }
  }

  function select<K extends keyof SliceEntryCollection>(
    key: K,
  ): ReturnType<ExtractInstance<T[K]['injectable']>['select']> {
    return entries[key].instance?.select();
  }
}
