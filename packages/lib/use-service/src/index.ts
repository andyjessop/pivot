import { useEffect, useState } from 'react';

import { ExtractInstance } from '@pivot/lib/injectable';

import { ServicesConfig } from './types';

export function createUseService<T extends ServicesConfig>(config: T) {
  return function useService<K extends keyof T>(key: K) {
    // The context contains injectables, so we need to extract the instance.
    type Service = ExtractInstance<T[K]>;

    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
      resolveService();

      return () => {
        if (service) {
          config[key].onDestroy(service as any);
        }
      };
    }, []);

    return service;

    async function resolveService() {
      try {
        const response = await config[key].get();

        setService(response as Service);
      } catch (error) {
        /* ... */
      }
    }
  };
}
