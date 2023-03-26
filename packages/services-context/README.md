# `servicesContext`

The `servicesContext` function creates a React context and a `useService` hook for managing and accessing services within a React application. It takes a `Record<string, Injectable>` object as its argument and returns an object containing the created context and the useService hook.

## Usage

```ts
import { servicesContext } from '@pivot/services-context';
import { Injectable } from '@pivot/injectable';

const config: <Record<string, Injectable> = { ... };
const { Services, useService } = servicesContext(config);
```

## Parameters

- `config: <Record<string, Injectable>`: A configuration object containing injectable services.

## Return Value

The function returns an object with the following properties:

- `Services`: The created React context.
- `useService`: A hook for accessing services from the context.

### `useService`

A custom hook to access services from the context created by `servicesContext`. It takes a key representing the service name and returns the service instance, or `null` until the service instance is resolved.

#### Parameters

- `key: string`: A key representing the service name. It should be one of the keys from the config.

#### Return Value

- `Service | null`: The service instance if resolved, or null if the service instance is not yet available.

#### Example

```ts
import { Injectable } from '@pivot/injectable';

const { Services, useService } = servicesContext({
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
