import { DynamicStore } from '@pivot/lib/dynamic-store';

import { SubscriptionEntry, Subscriptions } from './types';

export type { Subscriptions } from './types';

export function subscriptionManager<T extends Subscriptions>(store: DynamicStore, config: T) {
  type SubscriptionEntryCollection = {
    [K in keyof T]: SubscriptionEntry<T[K]['handler']>;
  };

  let entries = {} as SubscriptionEntryCollection;

  resetSubscriptions();

  return {
    resetSubscriptions,
    runSubscriptions,
  };

  async function runSubscriptions() {
    const state = store.getState();
    const subNames = Object.keys(config) as (keyof T & string)[];

    for (const subName of subNames) {
      const { handler, currentValue, selector } = entries[subName];

      entries[subName].currentValue = selector(state);

      if (
        // either the value has changed or
        currentValue !== entries[subName].currentValue ||
        // it's the first time we're calling the handler
        (!entries[subName].called && entries[subName].currentValue !== undefined)
      ) {
        const deps = await Promise.all(
          (config[subName].dependencies || []).map((dep) => dep.get()),
        );

        if (deps.some((dep) => dep === undefined)) {
          continue;
        }

        entries[subName].called = true;

        handler(...deps)(entries[subName].currentValue);
      }
    }

    return true;
  }

  function resetSubscriptions() {
    entries = (Object.keys(config) as (keyof T)[]).reduce((acc, key) => {
      acc[key] = {
        ...config[key],
        called: false,
        currentValue: null,
      };
      return acc;
    }, {} as SubscriptionEntryCollection);
  }
}
