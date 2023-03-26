# `dynamicSliceRegistry`

The `dynamicSliceRegistry` function creates a dynamic registry for managing and activating Redux slices based on the application state. It takes a `DynamicStore` and an optional `SliceCollection` as its arguments, and returns an object with a get method for accessing slice instances.

## Usage

```ts
import { dynamicSliceRegistry } from 'path/to/dynamicSliceRegistry';
import { DynamicStore } from '@pivot/dynamic-store';
import { SliceCollection } from 'path/to/types';

const store: DynamicStore = { ... };
const config: SliceCollection = { ... };

const registry = dynamicSliceRegistry(store, config);
```

## Parameters

- `store: DynamicStore`: A dynamic store instance that the registry will use to manage and activate slices.
- `config: SliceCollection`: An optional object representing the SliceCollection, which is a record of slice names and their corresponding slice configuration.

## Return Value

The function returns an object with the following methods:

- `get`: A method for accessing slice instances.

### get

A method to access slice instances by their name. It takes a `sliceName` as its argument and returns a promise that resolves with the slice instance.

#### Parameters

`sliceName: string`: The name of the slice to access.

#### Return Value

- `Promise<Slice>`: A promise that resolves with the slice instance.

## Example

```ts
const registry = dynamicSliceRegistry(store, config);

async function accessSlice() {
  const mySlice = await registry.get('mySlice');
  // Do something with the slice
}
```

## Notes

This function subscribes to the store and listens for state changes. When the state changes, it evaluates the active status of each slice and activates or deactivates them accordingly. When a slice is activated, its middleware and reducer are added to the store, and when it is deactivated, they are removed.
