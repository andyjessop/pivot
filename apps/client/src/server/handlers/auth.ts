import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { service as cacheService } from '@pivot/client/cache';
import { service as envService, Variable } from '@pivot/client/env';
import { sleep } from '@pivot/util/time';

const env = envService();
const cache = cacheService();

const USERS_CACHE_KEY = 'pivot-client:users';

interface User {
  accessToken: string | undefined;
  email: string;
  id: number;
  password: string;
  refreshToken: string | undefined;
}

const usersCache = cache.get(USERS_CACHE_KEY) as User[];

if (!usersCache) {
  cache.set(USERS_CACHE_KEY, [
    {
      accessToken: undefined,
      email: 'user@user.com',
      id: 1,
      password: 'password',
      refreshToken: undefined,
    },
  ]);
}

export function authHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    rest.post(`${apiUrl}/auth/v1/token`, async (req, res, ctx) => {
      const grantType = req.url.searchParams.get('grant_type');

      if (grantType === 'password') {
        if (isBrowser) {
          await sleep(250);
        }

        return handleLogin(req, res, ctx);
      }

      if (grantType === 'refresh_token') {
        if (isBrowser) {
          await sleep(250);
        }

        return handleRefreshToken(req, res, ctx);
      }
    }),

    rest.get(`${apiUrl}/auth/v1/user`, async (req, res, ctx) => {
      if (isBrowser) {
        await sleep(250);
      }

      return handleUser(req, res, ctx);
    }),

    rest.post(`${apiUrl}/auth/v1/logout`, async (req, res, ctx) => {
      if (isBrowser) {
        await sleep(250);
      }

      return handleLogout(req, res, ctx);
    }),
  ];
}

async function handleLogin(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  const { email, password } = await req.json();
  const apiKey = req.headers.get('apiKey');
  const contentType = req.headers.get('Content-Type');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(ctx.status(401));
  }

  if (contentType !== 'application/json') {
    return res(
      ctx.status(415),
      ctx.json({
        message: `Wrong content type. Expected 'application/json' but got '${contentType}'`,
      }),
    );
  }

  const users = cache.get(USERS_CACHE_KEY) as User[];

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res(
      ctx.status(404),
      ctx.json({
        message: `User with email '${email}' not found`,
      }),
    );
  }

  user.accessToken = Date.now().toString();
  user.refreshToken = Date.now().toString();

  cache.set(USERS_CACHE_KEY, users);

  return res(
    ctx.json({
      access_token: user.accessToken,
      expires_in: 9999999,
      refresh_token: user.refreshToken,
      token_type: 'token_type',
      user: {
        email,
      },
    }),
  );
}

async function handleRefreshToken(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  const { refresh_token } = await req.json();
  const apiKey = req.headers.get('apiKey');
  const contentType = req.headers.get('Content-Type');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Not authorized. Please provide a valid apiKey header.',
      }),
    );
  }

  if (contentType !== 'application/json') {
    return res(
      ctx.status(415),
      ctx.json({
        message: `Wrong content type. Expected 'application/json' but got '${contentType}'`,
      }),
    );
  }

  const users = cache.get(USERS_CACHE_KEY) as User[];

  const user = users.find((user) => user.refreshToken === refresh_token);

  if (!user) {
    return res(
      ctx.status(404),
      ctx.json({
        message: `User with refresh_token '${refresh_token}' not found`,
      }),
    );
  }

  user.refreshToken = Date.now().toString();
  user.accessToken = Date.now().toString();

  cache.set(USERS_CACHE_KEY, users);

  return res(
    ctx.json({
      access_token: user.accessToken,
      expires_in: 9999999,
      refresh_token: user.refreshToken,
      token_type: 'token_type',
      user: {
        email: user.email,
      },
    }),
  );
}

async function handleUser(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  const apiKey = req.headers.get('apiKey');
  const authorization = req.headers.get('authorization');
  const contentType = req.headers.get('Content-Type');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Not authorized. Please provide a valid apiKey header.',
      }),
    );
  }

  if (contentType !== 'application/json') {
    return res(
      ctx.status(415),
      ctx.json({
        message: `Wrong content type. Expected 'application/json' but got '${contentType}'`,
      }),
    );
  }

  if (!authorization) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Not authorized. Please provide a valid authorization header.',
      }),
    );
  }

  const accessToken = authorization.replace('Bearer ', '');

  const users = cache.get(USERS_CACHE_KEY) as User[];

  const user = users.find((user) => user.accessToken === accessToken);

  if (!user) {
    return res(
      ctx.status(404),
      ctx.json({
        message: `User with accessToken '${accessToken}' not found`,
      }),
    );
  }

  return res(
    ctx.json({
      email: user.email,
    }),
  );
}

async function handleLogout(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  const apiKey = req.headers.get('apiKey');
  const authorization = req.headers.get('authorization');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Not authorized. Please provide a valid apiKey header.',
      }),
    );
  }

  if (!authorization) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Not authorized. Please provide a valid authorization header.',
      }),
    );
  }

  const accessToken = authorization.replace('Bearer ', '');

  const users = cache.get(USERS_CACHE_KEY) as User[];

  const user = users.find((user) => user.accessToken === accessToken);

  if (!user) {
    return res(ctx.status(401));
  }

  user.accessToken = undefined;
  user.refreshToken = undefined;

  cache.set(USERS_CACHE_KEY, users);

  return res(ctx.json('ok'));
}
