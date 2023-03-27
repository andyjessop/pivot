import { User } from './model';

export interface Http {
  login(email: string, password: string): Promise<UserResponse>;
  logout(token: string): Promise<any>;
  refreshToken(token: string): Promise<UserResponse>;
  user(token: string): Promise<User>;
}

export interface UserResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}
