import { State, User } from '../types';

export function setUser(state: State, user: User | null) {
  return { ...state, user };
}
