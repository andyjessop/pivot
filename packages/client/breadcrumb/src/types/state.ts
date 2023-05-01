import { Route } from '@pivot/client/router';

export interface State {
  parts: Part[];
}

export interface Part {
  route: Route;
  text: string;
}
