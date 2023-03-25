import { createContext, useContext, useEffect, useState } from 'react';
import { cacheService } from '../modules/cache.module';
import { routerService } from '../modules/router.module';
import { ExtractInstance } from '@pivot/injectable';

const config = {
  cache: cacheService,
  router: routerService,
};

export const Services = createContext(config);

export function useService<K extends keyof typeof config>(key: K) {
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
