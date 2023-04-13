import { http } from '../http';

import { User } from './model';

export type Http = ReturnType<typeof http>;

export interface UserResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}
