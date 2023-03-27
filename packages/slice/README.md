# `slice` function

The `slice` function is a utility to help you create a "slice" of your Redux store, providing you with action creators, an API, middleware, a reducer, and a selector. The slice is generated based on the given name, initialState, and config object, which contains a set of state-modifying functions.

The key differences between this function and the RTK `createSlice`:

- The state-modifying functions do not accept actions. Instead, they accept the current state and any additional arguments. This allows you to keep your business logic separate from your Redux store.
- Along with the reducer and middleware, the slice function also returns an API object containing functions that dispatch actions and return a boolean indicating if the state has changed. This makes the API a bit more convenient to use, as it allows you to use it anywhere in the app. Pivot uses it to inject into services, so that services can dispatch actions and update the store without having to know anything about Redux.

## Usage

```ts
import { slice } from './slice';

const initialState: State = {
  count: 0,
};

const mySlice = slice('mySliceName', initialState, {
  increment: (state: State, amount: number) => ({ ...state, count: state.count + amount ]),
  reset: (state: State) => initialState,
});
```

Note how, unline a tradional Redux reducer, the state-modifying functions do not accept actions. Instead, they accept the current state and any additional arguments. This allows you to keep your business logic separate from your Redux store.

### Parameters

The function accepts the following parameters:

- `name: string`: A string representing the name of the slice.
- `initialState: State`: The initial state of the slice.
- `config: { ...reducers }`: An object containing state-modifying functions.

### Returns

The function returns a `Slice` object with the following properties:

- `actions`: An object containing action creators for each state-modifying function provided in the config object.
- `addListener((state: State) => void)) => void`: A function that adds a listener to the slice. The listener will be called whenever the slice state changes.
- `api`: An object containing API functions that dispatch actions and return a boolean indicating if the state has changed.
- `middleware`: A middleware function for use in a Redux store.
- `reducer`: A reducer function for use in a Redux store.
- `select`: A function that returns the current state of the slice.

### Additional Functions

The slice function also contains internal helper functions, which are not part of the public API:

- `select()`: Retrieves the current state of the slice.
- `getType(key: string)`: Generates a slice action type string.
- `middleware(middlewareApi: MiddlewareAPI)`: A middleware function for use in a Redux store.
- `reducer(state: State | undefined, action: Action)`: A reducer function for use in a Redux store.
