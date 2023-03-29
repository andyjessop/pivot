import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { service, Variable } from '@pivot/client/env';

const env = service();

const users = [
  {
    accessToken: undefined,
    email: 'user',
    id: 1,
    password: 'password',
    refreshToken: undefined,
  },
] as {
  accessToken: string | undefined;
  email: string;
  id: number;
  password: string;
  refreshToken: string | undefined;
}[];

export function createHandlers(apiUrl: string) {
  return [
    rest.post(`${apiUrl}/auth/v1/token`, async (req, res, ctx) => {
      const grantType = req.url.searchParams.get('grant_type');

      if (grantType === 'password') {
        return handleLogin(req, res, ctx);
      }

      if (grantType === 'refresh_token') {
        return handleRefreshToken(req, res, ctx);
      }
    }),

    rest.get(`${apiUrl}/auth/v1/user`, handleUser),

    rest.post(`${apiUrl}/auth/v1/logout`, handleLogout),
  ];
}

async function handleLogin(
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) {
  const { email, password } = await req.json();
  const apiKey = req.headers.get('apiKey');
  const contentType = req.headers.get('Content-Type');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(ctx.status(401));
  }

  if (contentType !== 'application/json') {
    return res(ctx.status(401));
  }

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res(ctx.status(401));
  }

  user.accessToken = Date.now().toString();
  user.refreshToken = Date.now().toString();

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

async function handleRefreshToken(
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) {
  const { refresh_token } = await req.json();
  const apiKey = req.headers.get('apiKey');
  const contentType = req.headers.get('Content-Type');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(ctx.status(401));
  }

  if (contentType !== 'application/json') {
    return res(ctx.status(401));
  }

  const user = users.find((user) => user.refreshToken === refresh_token);

  if (!user) {
    return res(ctx.status(401));
  }

  user.refreshToken = Date.now().toString();
  user.accessToken = Date.now().toString();

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

async function handleUser(
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) {
  const apiKey = req.headers.get('apiKey');
  const authorization = req.headers.get('authorization');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(ctx.status(401));
  }

  if (!authorization) {
    return res(ctx.status(401));
  }

  const accessToken = authorization.replace('Bearer ', '');
  const user = users.find((user) => user.accessToken === accessToken);

  if (!user) {
    return res(ctx.status(401));
  }

  return res(
    ctx.json({
      email: user.email,
    }),
  );
}

async function handleLogout(
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext,
) {
  const apiKey = req.headers.get('apiKey');
  const authorization = req.headers.get('authorization');

  if (apiKey !== env.get(Variable.SUPABASE_API_KEY)) {
    return res(ctx.status(401));
  }

  if (!authorization) {
    return res(ctx.status(401));
  }

  const accessToken = authorization.replace('Bearer ', '');
  const user = users.find((user) => user.accessToken === accessToken);

  if (!user) {
    return res(ctx.status(401));
  }

  user.accessToken = undefined;
  user.refreshToken = undefined;

  return res(ctx.json('ok'));
}
