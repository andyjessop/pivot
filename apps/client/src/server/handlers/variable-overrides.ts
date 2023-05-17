import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { isDraftVariableOverride, VariableOverride } from '@pivot/client/variable-overrides';
import { findVariableOverridesByDeploymentId } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

const variableOverridesMap = new Map<string, VariableOverride[]>();

export function variableOverridesHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    rest.get(`${apiUrl}/rest/v1/variable_override`, getVariableOverrides),
    rest.post(`${apiUrl}/rest/v1/variable_override`, postVariableOverride),
  ];

  async function getVariableOverrides(
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext,
  ) {
    if (isBrowser) {
      await sleep(250);
    }

    const uuid = getDeploymentId(req);

    if (!uuid) {
      return res(ctx.status(200), ctx.json('Deployment not found'));
    }

    if (!variableOverridesMap.has(uuid)) {
      const result = findVariableOverridesByDeploymentId(uuid);

      if (!result) {
        return res(
          ctx.status(404),
          ctx.json(`DeploymentVariables not found for deployment ${uuid}`),
        );
      }

      variableOverridesMap.set(uuid, result);
    }

    return res(ctx.status(200), ctx.json(variableOverridesMap.get(uuid)));
  }

  async function postVariableOverride(
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext,
  ) {
    if (isBrowser) {
      await sleep(250);
    }

    const body = await req.json();

    if (!isDraftVariableOverride(body)) {
      return res(ctx.status(400), ctx.json('Invalid deployment_variable'));
    }

    const variableOverrides = variableOverridesMap.get(body.deployment_id) ?? [];

    const newVariableOverride = {
      ...body,
      created_at: new Date().toISOString(),
      uuid: new Date().getTime().toString(),
    };

    const result = [newVariableOverride, ...variableOverrides];

    variableOverridesMap.set(body.deployment_id, result);

    return res(ctx.status(200), ctx.json([newVariableOverride])); // Supabase returns an array of deployments
  }

  function getDeploymentId(req: RestRequest) {
    return req.url.searchParams.get('deployment_id')?.split('.')[1];
  }
}
