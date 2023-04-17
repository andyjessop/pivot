import { service } from './service';

export type Head = ReturnType<typeof service>;

export type State = {
  title: string;
};
