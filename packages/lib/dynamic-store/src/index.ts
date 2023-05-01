import { applyMiddleware, compose, legacy_createStore } from 'redux';

import { middlewareRegistry, reducerRegistry } from '@pivot/lib/redux-registry';
import type { Reducer, Store } from '@pivot/lib/redux-types';

export type DynamicStore = ReturnType<typeof dynamicStore>;

export function dynamicStore({ isDev }: { isDev?: boolean } = { isDev: true }) {
  const mRegistry = middlewareRegistry();
  const rRegistry = reducerRegistry();
  const middlewareEnhancer = applyMiddleware(...[mRegistry.middleware]);

  const composeEnhancers =
    (isDev &&
      typeof window !== 'undefined' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = legacy_createStore(
    rRegistry.reducer,
    {},
    composeEnhancers(middlewareEnhancer),
  ) as Store;

  const addMiddleware = mRegistry.add;
  const addReducer = (id: string, reducer: Reducer) => {
    const remove = rRegistry.add(id, reducer);

    store.dispatch({ payload: { id }, type: '__pivot/reducer/add' });

    return () => {
      // Remove reducer from combination
      remove();

      // Remove key from state
      const state = store.getState();

      if (state[id]) {
        delete state[id];
      }

      store.dispatch({ payload: { id }, type: '__pivot/reducer/remove' });
    };
  };

  return { addMiddleware, addReducer, ...store };
}
