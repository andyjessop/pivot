/**
 * Create the promise object, externalizing the reject() and resolve()
 * functions so that they can be called from without the Promise.
 *
 * @example
 * ```ts
 * const { promise, resolve } = createExternallyResolvablePromise();
 *
 * promise.then(result => { ... });
 *
 * resolve([data]);
 * ```
 */
export function externallyResolvablePromise<
  T,
>(): ExternallyResolvablePromise<T> {
  let res: PromiseResolveReject | undefined;
  let rej: PromiseResolveReject | undefined;

  return {
    promise: new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    }),
    reject: rej as PromiseResolveReject,
    resolve: res as PromiseResolveReject,
  };
}

export type PromiseResolveReject = (data: any) => void;

export interface ExternallyResolvablePromise<T> {
  promise: Promise<T>;
  reject: PromiseResolveReject;
  resolve: PromiseResolveReject;
}
