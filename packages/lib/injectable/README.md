# `injectable` function

This function creates an `Injectable` object that allows you to manage instances and their dependencies in an asynchronous, lazy-loaded manner. The instances are created and resolved using a provided factory function and dependencies (other `Injectable` objects). The injectable function also supports an optional `onDestroy` callback that can be executed when an instance is destroyed.

## Usage

```ts
import { injectable } from './injectable';

const myInjectable = injectable({
  importFn: async (dep1, dep2) => {
    // Create the instance using the provided dependencies
  },
  dependencies: [dep1, dep2],
  onDestroy: (instance) => {
    // Cleanup the instance when it is destroyed
  },
});
```

Or lazy-loading:

```ts
const myInjectable = injectable({
  importFn: (dep1, dep2) =>
    import('./my-module').then((mod) => mod.myFunction(dep1, dep2)),
  dependencies: [dep1, dep2],
});
```

### Parameters

The function accepts an object with the following properties:

- `importFn: AsyncFactoryFn`: An asynchronous factory function that takes dependencies as arguments and returns an instance of the type T.
- `dependencies?: Injectable[]` (optional): An array of dependencies that will be resolved before creating the instance. Default is an empty array.
- `onDestroy?: (instance) => void` (optional): A callback function that is called when the instance is destroyed. Default is an empty function.

### Returns

The function returns an `Injectable<T>` object with the following properties:

- `importFn`: The provided asynchronous factory function.
- `depChain`: The flattened dependency chain.
- `dependencies`: The provided dependencies.
- `get`: A function that returns the instance. If the instance is not created yet, it creates the instance by resolving the dependencies and calling the factory function.
- `getInstance`: A function that returns the current instance without resolving or creating it.
- `isResolving`: A function that returns true if the instance is being resolved, false otherwise.
- `hasResolved`: A function that returns true if the instance has been resolved, false otherwise.
- `onDestroy`: The provided onDestroy callback function.
