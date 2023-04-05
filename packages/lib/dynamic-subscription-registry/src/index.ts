import { DynamicStore } from '@pivot/lib/dynamic-store';
import { ExtractInstance, Injectable } from '@pivot/lib/injectable';

type Subscription = (val: any) => void;

type SubscriptionConfig<T extends Subscription> = {
  active: (state: any) => boolean;
  injectable: Injectable<T, any>;
  selector: (state: any) => any;
};

type SubscriptionEntry<T extends Subscription> = SubscriptionConfig<T> & {
  instance?: Subscription;
  currentValue: any;
  isActive: boolean;
};

export function dynamicSubscriptionRegistry<
  T extends Record<keyof T, SubscriptionConfig<any>>,
>(store: DynamicStore, config: T) {
  type SubscriptionEntryCollection = {
    [K in keyof T]: SubscriptionEntry<ExtractInstance<T[K]['injectable']>>;
  };

  const entries = (Object.keys(config) as (keyof T)[]).reduce((acc, key) => {
    acc[key] = {
      ...config[key],
      currentValue: null,
      isActive: false,
    };
    return acc;
  }, {} as SubscriptionEntryCollection);

  store.subscribe(listener);

  listener();

  return {};

  async function listener() {
    const state = store.getState();
    const subNames = Object.keys(config) as (keyof T & string)[];

    for (const subName of subNames) {
      const { active, injectable, isActive, currentValue, selector } =
        entries[subName];

      const shouldBeActive = active(state);

      if (shouldBeActive && !isActive) {
        await injectable.get();
      }

      if (!shouldBeActive && isActive) {
        entries[subName].isActive = false;
        entries[subName].currentValue = null;
        continue;
      }

      entries[subName].currentValue = selector(state);

      if (currentValue !== entries[subName].currentValue) {
        injectable.getInstance()?.(entries[subName].currentValue);
      }
    }
  }
}
