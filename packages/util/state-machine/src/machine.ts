import { getParentPath } from './flatten-config';
import { flattenConfig } from './flatten-config';

export type State<T> = T extends { states: Record<infer K, unknown> }
  ? K | State<T['states'][K]>
  : never;

export type Prettify<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;

export type Action<T, D extends number = 8, A extends any[] = []> = A['length'] extends D
  ? never
  : Prettify<
      {
        [K in keyof T]: K extends `actions`
          ? keyof T[K] | Action<T[K], D, [0, ...A]>
          : T[K] extends Record<string, unknown>
          ? Action<T[K], D, [0, ...A]>
          : never;
      }[keyof T]
    >;

export interface Config {
  actions?: Record<string, string>;
  initial?: string;
  states?: Record<string, Config>;
}

export function machine<T extends Config>(config: T) {
  const flattened = flattenConfig(config);

  return {
    states: flattened,
    transition,
  };

  function transition(state: State<T>, action: Action<T>): State<T> | undefined {
    const currentState = flattened[state];

    if (!currentState) {
      throw new Error(`State ${state} not found`);
    }

    const handlingState = getParentPath<T>(flattened, state).find(
      (s) => flattened[s]?.actions?.[action],
    );

    if (!handlingState) {
      return;
    }

    const nextState = flattened[handlingState]?.actions?.[action] as State<T> | undefined;

    return nextState;
  }
}
