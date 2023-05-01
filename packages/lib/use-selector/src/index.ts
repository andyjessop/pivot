import { useEffect, useState } from 'react';

import { DynamicStore } from '@pivot/lib/dynamic-store';

export function createUseSelector(store: DynamicStore) {
  return function useSelector<T extends (state: any) => any>(selector: T): ReturnType<T> {
    const [selectedState, setSelectedState] = useState<ReturnType<T>>(selector(store.getState()));

    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setSelectedState(selector(store.getState()));
      });

      return () => unsubscribe();
    }, [store, selector]);

    return selectedState;
  };
}
