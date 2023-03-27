import { State, User } from '../types';

export function setUser(state: State, user: User) {
  return { ...state, user };
}
