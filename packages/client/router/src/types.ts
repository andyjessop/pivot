import { service } from './service';

export type Route<T extends RouterConfig = any> = {
  hash?: string;
  name: keyof T & string;
  params?: Record<string, string | undefined>;
  search?: Record<string, string>;
};

export type FullRoute<T extends RouterConfig = any> = {
  hash: string;
  name: keyof T & string;
  params: Record<string, string | undefined>;
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
