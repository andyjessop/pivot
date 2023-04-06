import { DynamicStore } from '@pivot/lib/dynamic-store';
import { Injectable } from '@pivot/lib/injectable';

type Subscription = (val: any) => void;

export type SubscriptionConfig<T extends Subscription> = {
  handler: T;
  dependencies?: Injectable<any>[];
  selector: (state: any) => any;
};

type SubscriptionEntry<T extends Subscription> = SubscriptionConfig<T> & {
  currentValue: any;
};

export type Subscriptions = Record<string, SubscriptionConfig<any>>;

export function dynamicSubscriptionRegistry<T extends Subscriptions>(
  store: DynamicStore,
  config: T,
) {
  type SubscriptionEntryCollection = {
    [K in keyof T]: SubscriptionEntry<T[K]['handler']>;
  };

  const entries = (Object.keys(config) as (keyof T)[]).reduce((acc, key) => {
    acc[key] = {
      ...config[key],
      currentValue: null,
    };
    return acc;
  }, {} as SubscriptionEntryCollection);

  store.subscribe(listener);

  listener();

  return {};

  function listener() {
    const state = store.getState();
    const subNames = Object.keys(config) as (keyof T & string)[];

    for (const subName of subNames) {
      const { handler, currentValue, selector } = entries[subName];

      entries[subName].currentValue = selector(state);

      if (currentValue !== entries[subName].currentValue) {
        const deps = (config[subName].dependencies || []).map((dep) =>
          dep.getInstance(),
        );

        if (deps.length && !deps.every((dep) => dep !== undefined)) {
          return;
        }

        handler(...deps)(entries[subName].currentValue);
      }
    }
  }
}
