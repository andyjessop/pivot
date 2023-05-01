import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { findTeamsByUserId } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

const USER_ID = 'b6b92239-6bf7-46ed-949a-7249eb1c3116';

export function userHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [rest.get(`${apiUrl}/rest/v1/team`, getTeams)];

  async function getTeams(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
    if (isBrowser) {
      await sleep(500);
    }

    const teams = findTeamsByUserId(USER_ID);

    return res(ctx.status(200), ctx.json(teams));
  }
}
