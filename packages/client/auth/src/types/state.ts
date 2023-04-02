import { User } from './model';

export interface State {
  isChecking: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  user: User | null;
}
