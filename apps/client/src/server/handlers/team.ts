import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { getTeamFixture } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

const TEAM_ID = '76ce0d5e-6766-4592-b6ff-14ecebbff3e5';

export function teamHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [rest.get(`${apiUrl}/rest/v1/project`, getComponent('project'))];

  function getComponent(component: string) {
    return async function get(
      req: RestRequest,
      res: ResponseComposition,
      ctx: RestContext,
    ) {
      if (isBrowser) {
        await sleep(500);
      }

      return res(ctx.status(200), ctx.json(getTeamFixture(TEAM_ID, component)));
    };
  }
}
