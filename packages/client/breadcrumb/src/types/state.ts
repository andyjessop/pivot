import { Route, RouterConfig } from '@pivot/lib/router';

export interface State<T extends RouterConfig> {
  parts: Part<T>[];
}

export interface Part<T extends RouterConfig> {
  route: Route<T>;
  text: string;
}
