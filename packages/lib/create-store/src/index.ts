import { dynamicSliceRegistry } from '@pivot/lib/dynamic-slice-registry';
import { dynamicStore } from '@pivot/lib/dynamic-store';
import { Injectable } from '@pivot/lib/injectable';
import { Slice } from '@pivot/lib/slice';
import { createUseSelector } from '@pivot/lib/use-selector';

export type SliceConfigs = {
  [key: string]: {
    injectable: Injectable<Slice<any>>;
    active: (state: any) => boolean;
  };
};

export function createStore<T extends SliceConfigs>(config: T) {
  const store = dynamicStore();

  const { get, selector } = dynamicSliceRegistry(store, config);

  return {
    config,
    get,
    selector,
    store,
    useSelector: createUseSelector(store),
  };
}
