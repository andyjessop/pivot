/**
 * Create the promise object, externalizing the reject() and resolve()
 * functions so that they can be called from without the promise.
 *
 * @example
 * ```ts
 * const { promise, resolve } = createExternallyResolvablepromise();
 *
 * promise.then(result => { ... });
 *
 * resolve([data]);
 * ```
 */
export function externallyResolvablePromise<
  T,
>(): ExternallyResolvablePromise<T> {
  let res: promiseResolveReject | undefined;
  let rej: promiseResolveReject | undefined;

  return {
    promise: new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    }),
    reject: rej as promiseResolveReject,
    resolve: res as promiseResolveReject,
  };
}

export type promiseResolveReject = (data: any) => void;

export interface ExternallyResolvablePromise<T> {
  promise: Promise<T>;
  reject: promiseResolveReject;
  resolve: promiseResolveReject;
}
