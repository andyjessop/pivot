export const config: ServiceCollection = {
  router: {
    dependencies: [slices.get('router')],
    asyncFactoryFn: (state) =>
      import('@pivot/core-router').then((m) =>
        m.router(
          {
            home: 'home',
            login: 'login',
          },
          state,
        ),
      ),
  },
  routerSlice: {
    dependencies: [],
    asyncFactoryFn: () =>
      Promise.resolve({
        navigateSuccess: (route: any) => route,
      }),
  },
};

/*
const routerSlice = useSlice('router');
const service = useService('router', routerConfig, slices.get('router'));

//

const otherService = {
  asyncFactoryFn: (state, router) => import('@pivot/core-test').then((m) => m.test(state, router)),
  dependencies: [slices.inject('test'), services.inject('router')]
}




*/

type ServiceCollection = {
  [key: string]: {
    asyncFactoryFn: (...args: any[]) => Promise<any>;
    dependencies: Injectable[];
  };
};

type Injectable = () => Promise<any>;

export function serviceManager(services: ServiceCollection) {
  const serviceMap = new Map();

  function get(name: string) {
    if (serviceMap.has(name)) {
      return serviceMap.get(name);
    }

    const service = services[name];

    if (!service) {
      throw new Error(`Service ${name} not found`);
    }

    const { asyncFactoryFn, dependencies } = service;

    const promise = Promise.all(dependencies.map((dep) => dep())).then(
      (deps) => {
        return asyncFactoryFn(...deps);
      },
    );

    serviceMap.set(name, promise);

    return promise;
  }

  /**
   * Return an injectable function that will return the service
   */
  function inject(name: string) {
    return () => get(name);
  }

  return {
    get,
    inject,
  };
}
