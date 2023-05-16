import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { DeploymentVariable, isDraftDeploymentVariable } from '@pivot/client/deployment-variables';
import { findDeploymentVariablesByDeploymentId } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

const deploymentVariablesMap = new Map<string, DeploymentVariable[]>();

export function deploymentVariableHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    rest.get(`${apiUrl}/rest/v1/deployment_variable`, getDeploymentVariables),
    rest.post(`${apiUrl}/rest/v1/deployment_variable`, postDeploymentVariable),
  ];

  async function getDeploymentVariables(
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

    if (!deploymentVariablesMap.has(uuid)) {
      const result = findDeploymentVariablesByDeploymentId(uuid);

      if (!result) {
        return res(
          ctx.status(404),
          ctx.json(`DeploymentVariables not found for deployment ${uuid}`),
        );
      }

      deploymentVariablesMap.set(uuid, result);
    }

    return res(ctx.status(200), ctx.json(deploymentVariablesMap.get(uuid)));
  }

  async function postDeploymentVariable(
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext,
  ) {
    if (isBrowser) {
      await sleep(250);
    }

    const body = await req.json();

    if (!isDraftDeploymentVariable(body)) {
      return res(ctx.status(400), ctx.json('Invalid deployment_variable'));
    }

    const deployments = deploymentVariablesMap.get(body.deployment_id) ?? [];

    const newDeployment = {
      ...body,
      created_at: new Date().toISOString(),
      uuid: new Date().getTime().toString(),
    };

    const result = [newDeployment, ...deployments];

    deploymentVariablesMap.set(body.deployment_id, result);

    return res(ctx.status(200), ctx.json([newDeployment])); // Supabase returns an array of deployments
  }

  function getDeploymentId(req: RestRequest) {
    return req.url.searchParams.get('deployment_id')?.split('.')[1];
  }
}
