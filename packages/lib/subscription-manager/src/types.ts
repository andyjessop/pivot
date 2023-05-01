import { Injectable } from '@pivot/lib/injectable';

export type Subscription = (val: any) => void;

export type SubscriptionConfig<T extends Subscription> = {
  handler: T;
  dependencies?: Injectable<any>[];
  selector: (state: any) => any;
};

export type SubscriptionEntry<T extends Subscription> = SubscriptionConfig<T> & {
  called: boolean;
  currentValue: any;
};

export type Subscriptions = Record<string, SubscriptionConfig<any>>;
