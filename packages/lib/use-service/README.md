# `useService`

The `createUseService` function creates a `useService` hook for managing and accessing services within a React application. It takes a `Record<string, Injectable>` object as its argument.

## Usage

```ts
import { createUseService } from '@pivot/lib/use-service';
import { Injectable } from '@pivot/lib/injectable';

const config: <Record<string, Injectable>> = { ... };
const useService = createUseService(config);
```

## Parameters

- `config: <Record<string, Injectable>`: A configuration object containing injectable services.

## Return Value

The function returns the following function:

- `useService`: A hook for accessing services from the context.

### `useService`

A custom hook to access services. It takes a key representing the service name and returns the service instance, or `null` until the service instance is resolved.

#### Parameters

- `key: string`: A key representing the service name. It should be one of the keys from the config.

#### Return Value

- `Service | null`: The service instance if resolved, or null if the service instance is not yet available.

#### Example

```ts
import { Injectable } from '@pivot/lib/injectable';

const userService = createUseService({
  myService: injectable({
    importFn: () => import('./myService'), // resolves to { sayHello: () => 'Hello World' }
  }),
});

function MyComponent() {
  const myService = useService('myService');

  if (!myService) {
    return null;
  }

  return <div>{myService.sayHello()}</div>;
}
```
