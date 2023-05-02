interface Route {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  parent?: string;
  path: string;
}

export interface Routes {
  [key: string]: Route;
}
