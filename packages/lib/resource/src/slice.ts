import { slice } from '@pivot/lib/slice';

interface State<D, E> {
  data: D | null;
  error: E | null;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
}

export type ResourceSlice<Data> = ReturnType<typeof resourceSlice<Data, any>>;

export function resourceSlice<D, E>(name: string) {
  return slice(
    name,
    {
      data: null,
      error: null,
      loading: false,
      loaded: false,
      updating: false,
    } as State<D, E>,
    {
      set: (state: State<D, E>, newState: Partial<State<D, E>>) => ({
        ...state,
        newState,
      }),
    },
  );
}
