# `dynamicStore` function

The dynamicStore function is a utility to create a dynamic Redux store that supports adding and removing middleware and reducers at runtime. This can be particularly useful for code splitting, lazy-loading, or working with dynamically loaded modules.

## Usage

```ts
import { dynamicStore } from './dynamicStore';

const store = dynamicStore({ isDev: true });
```

## Parameters

The function accepts an optional configuration object with the following properties:

`isDev?: boolean`: A boolean flag indicating whether the store is in development mode. When true, the Redux DevTools Extension will be enabled. Default is true.

## Returns

The function returns a DynamicStore object with the following properties and methods:

`addMiddleware`: A function to add a middleware to the store. The function accepts a middleware and returns a function to remove the middleware.
`addReducer`: A function to add a reducer to the store. The function accepts a string id and a reducer, and returns a function to remove the reducer.
`...store`: All the properties and methods of the Redux Store object.

Example

```ts
import { dynamicStore } from './dynamicStore';
import someMiddleware from './middlewares/someMiddleware';
import someReducer from './reducers/someReducer';

const store = dynamicStore({ isDev: true });

const removeMiddleware = store.addMiddleware(someMiddleware);
const removeReducer = store.addReducer('someReducer', someReducer);

// Later, when you no longer need the middleware or reducer:
removeMiddleware();
removeReducer();
```
