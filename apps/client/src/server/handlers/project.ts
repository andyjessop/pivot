import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { getProjectFixture } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

export function projectHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    rest.get(`${apiUrl}/rest/v1/project`, getComponent('project')),
    rest.get(`${apiUrl}/rest/v1/environment`, getComponent('environments')),
    rest.get(`${apiUrl}/rest/v1/deployment`, getComponent('deployments')),
    rest.get(`${apiUrl}/rest/v1/feature`, getComponent('features')),
    rest.get(`${apiUrl}/rest/v1/variable`, getComponent('variables')),
  ];

  function getComponent(component: string) {
    return async function get(
      req: RestRequest,
      res: ResponseComposition,
      ctx: RestContext,
    ) {
      if (isBrowser) {
        await sleep(500);
      }

      const uuid = getProjectUuid(req);

      if (!uuid) {
        return res(
          ctx.status(404),
          ctx.json({
            message: 'Project not found',
          }),
        );
      }

      return res(ctx.status(200), ctx.json(getProjectFixture(uuid, component)));
    };
  }

  function getProjectUuid(req: RestRequest) {
    return req.url.searchParams.get('uuid')?.split('.')[1];
  }
}
