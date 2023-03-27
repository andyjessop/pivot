import { useEffect, useState } from 'react';
import { DynamicStore } from '@pivot/dynamic-store';

export function createUseSelector(store: DynamicStore) {
  return function useSelector<T extends (state: S) => U, S = any, U = any>(
    selector: T,
  ) {
    const [selectedState, setSelectedState] = useState<U>(
      selector(store.getState()),
    );

    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setSelectedState(selector(store.getState()));
      });

      return () => unsubscribe();
    }, [store, selector]);

    return selectedState;
  };
}
