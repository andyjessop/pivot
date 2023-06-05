import { getParentPath } from './flatten-config';
import { flattenConfig } from './flatten-config';

export type StateUnion<T> = T extends { states: Record<infer K, unknown> }
  ? K | StateUnion<T['states'][K]>
  : never;

export type Prettify<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;

export type ActionUnion<T> = {
  [K in keyof T]: K extends `actions`
    ? keyof T[K] | ActionUnion<T[K]>
    : T[K] extends Record<string, unknown>
    ? ActionUnion<T[K]>
    : never;
}[keyof T];

export interface Config {
  actions?: Record<string, string>;
  initial?: string;
  states?: Record<string, Config>;
}

export function machine<T extends Config>(config: T) {
  const flattened = flattenConfig(config);

  return {
    transition,
  };

  function transition(state: StateUnion<T>, action: ActionUnion<T>): StateUnion<T> | undefined {
    const stateStr = state as string;
    const actionStr = action as string;
    const currentState = flattened[state as string];

    if (!currentState) {
      throw new Error(`State ${stateStr} not found`);
    }

    const handlingState = getParentPath(flattened, stateStr).find(
      (stateStr) => flattened[stateStr].actions[actionStr],
    );

    if (!handlingState) {
      return;
    }

    const nextState = flattened[handlingState].actions[actionStr] as StateUnion<T> | undefined;

    return nextState;
  }
}
