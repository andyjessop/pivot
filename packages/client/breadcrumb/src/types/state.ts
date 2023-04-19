import { Route } from '@pivot/client/router';

export interface State {
  parts: Part[];
}

export interface Part {
  text: string;
  route: Route;
}
