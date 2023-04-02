import { State } from '../domain/types';

export const selectAuth = (state: { auth: State }) => state.auth;
