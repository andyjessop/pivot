import { createContext, useContext, useEffect, useState } from 'react';

import { ExtractInstance } from '@pivot/injectable';

import { ServicesConfig } from './types';

export function servicesContext<T extends ServicesConfig>(config: T) {
  const Services = createContext(config);

  return {
    Services,
    useService,
  };

  function useService<K extends keyof typeof config>(key: K) {
    const context = useContext(Services);

    // The context contains injectables, so we need to extract the instance.
    type Service = ExtractInstance<(typeof config)[K]>;

    const [service, setService] = useState<Service | null>(null);

    if (context === undefined) {
      throw new Error('useService must be used within a ServicesProvider');
    }

    useEffect(() => {
      resolveService();

      return () => {
        if (service) {
          context[key].onDestroy(service as any);
        }
      };
    }, []);

    return service;

    async function resolveService() {
      try {
        const response = await context[key].get();

        setService(response as Service);
      } catch (error) {
        /* ... */
      }
    }
  }
}
