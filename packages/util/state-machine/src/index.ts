type ActionFn<S extends string, D> = (stack: Stack, data?: D) => S;

type Stack = Array<string>;

type StateConfig<S extends string, A extends string, D> = {
  [K in A]?: S | ActionFn<S, D>;
};

type Config<S extends string, A extends string, D> = {
  [K in S]: StateConfig<S, A, D>;
};

export type ActionNames<C> = C extends Config<any, infer A, any> ? A : never;

interface Machine<C extends Config<any, any, D>, D> {
  transition(
    currentState: keyof C,
    action: ActionNames<C>,
    data: D,
  ): (keyof C & string) | undefined | undefined;
}

export function createMachine<C extends Config<any, any, D>, D>(config: C): Machine<C, D> {
  const stack: Stack = [];

  const machine: Machine<C, D> = {
    transition(
      currentState: keyof C & string,
      action: ActionNames<C> & string,
      data: D,
    ): string | undefined {
      let nextState: (keyof C & string) | undefined;
      const stateActions = config.states[currentState];
      const actionResult = stateActions && stateActions[action as keyof typeof stateActions];

      if (!actionResult) {
        throw new Error(`Invalid action: ${action}`);
      }

      if (typeof actionResult === 'function') {
        nextState = actionResult(stack, data);
      } else {
        nextState = actionResult;
      }

      if (stack.length > 0) {
        nextState = stack.pop();
        stack.length = 0;
      }

      return nextState;
    },
  };

  return machine;
}
