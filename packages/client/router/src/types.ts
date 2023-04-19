import { service } from './service';

export type Route<T extends RouterConfig = any> = {
  name: keyof T & string;
  hash?: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
};

export type FullRoute<T extends RouterConfig = any> = {
  name: keyof T & string;
  hash: string;
  params: Record<string, string>;
  search: Record<string, string>;
};

export type RouterConfig = Record<string, RouteConfig> & {
  notFound?: RouteConfig;
};

export interface RouteConfig {
  parent?: string;
  path: string;
}

export interface RouterState {
  route: Route | null;
}

export type Router = ReturnType<typeof service>;
