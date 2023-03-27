import { User } from './model';

export interface State {
  isLoading: boolean;
  isLoggingIn: boolean;
  user: User | null;
}
