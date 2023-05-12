import { Service, State } from '@pivot/lib/resource';

import { Environment } from './model';

export type EnvironmentsResource = Service<Environment[], [string]>;
export type EnvironmentsResourceState = State<Environment[], Error>;
