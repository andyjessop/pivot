import { User } from './model';

export interface Actions {
  setIsLoading: (isLoading: boolean) => void;
  setIsLoggingIn: (isLoggingIn: boolean) => void;
  setUser: (user: User | null) => void;
}
