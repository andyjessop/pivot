import { Cache } from '@pivot/client/cache';

import { CRUX_ACCESS_TOKEN_CACHE_KEY, CRUX_REFRESH_TOKEN_CACHE_KEY } from './config';
import { Actions, Http } from './types';

export function service(auth: Actions, cache: Cache, http: Http) {
  getUser();

  return {
    getUser,
    login,
    logout,
  };

  /**
   * 1. Check cache for access token.
   * 2. If access token is present, clear cache then fetch user.
   * 3. If user is present, set user in state and update cache with tokens.
   *    3a. Refresh tokens.
   */
  async function getUser() {
    const accessToken = cache.get(CRUX_ACCESS_TOKEN_CACHE_KEY) as string;
    const refreshToken = cache.get(CRUX_REFRESH_TOKEN_CACHE_KEY) as string;

    if (!accessToken) {
      auth.setIsChecking(false);
      return;
    }

    auth.setIsChecking(true);

    const response = await http.user(accessToken);

    if (response.email) {
      auth.setUser(response);
      auth.setIsChecking(false);

      // Refresh tokens.
      const userWithNewToken = await http.refreshToken(refreshToken);

      if (userWithNewToken.access_token && userWithNewToken.refresh_token) {
        cache.set(CRUX_ACCESS_TOKEN_CACHE_KEY, userWithNewToken.access_token);
        cache.set(CRUX_REFRESH_TOKEN_CACHE_KEY, userWithNewToken.refresh_token);
      }
    } else {
      auth.setIsChecking(false);
    }
  }

  async function login(email: string, password: string) {
    // Clear cached tokens.
    cache.remove(CRUX_ACCESS_TOKEN_CACHE_KEY);
    cache.remove(CRUX_REFRESH_TOKEN_CACHE_KEY);

    auth.setIsLoggingIn(true);

    const response = await http.login(email, password);

    if (response.access_token && response.refresh_token) {
      cache.set(CRUX_ACCESS_TOKEN_CACHE_KEY, response.access_token);
      cache.set(CRUX_REFRESH_TOKEN_CACHE_KEY, response.refresh_token);

      auth.setUser(response.user);
    }

    auth.setIsLoggingIn(false);
    auth.setIsChecking(false);

    return;
  }

  async function logout() {
    const token = cache.get(CRUX_ACCESS_TOKEN_CACHE_KEY) as string;

    // Clear cached tokens.
    cache.remove(CRUX_ACCESS_TOKEN_CACHE_KEY);
    cache.remove(CRUX_REFRESH_TOKEN_CACHE_KEY);

    if (!token) {
      return;
    }

    auth.setIsLoggingOut(true);

    await http.logout(token);

    auth.setIsLoggingOut(false);
    auth.setIsChecking(false);
    auth.setUser(null);
  }
}
