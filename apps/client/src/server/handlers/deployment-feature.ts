import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { DeploymentFeature, isDraftDeploymentFeature } from '@pivot/client/deployment-features';
import { findDeploymentFeaturesByDeploymentId } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

const deploymentFeaturesMap = new Map<string, DeploymentFeature[]>();

export function deploymentFeatureHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    rest.get(`${apiUrl}/rest/v1/deployment_feature`, getDeploymentFeatures),
    rest.post(`${apiUrl}/rest/v1/deployment_feature`, postDeploymentFeature),
  ];

  async function getDeploymentFeatures(
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

    if (!deploymentFeaturesMap.has(uuid)) {
      const result = findDeploymentFeaturesByDeploymentId(uuid);

      if (!result) {
        return res(
          ctx.status(404),
          ctx.json(`DeploymentFeatures not found for deployment ${uuid}`),
        );
      }

      deploymentFeaturesMap.set(uuid, result);
    }

    return res(ctx.status(200), ctx.json(deploymentFeaturesMap.get(uuid)));
  }

  async function postDeploymentFeature(
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext,
  ) {
    if (isBrowser) {
      await sleep(250);
    }

    const body = await req.json();

    if (!isDraftDeploymentFeature(body)) {
      return res(ctx.status(400), ctx.json('Invalid deployment_feature'));
    }

    const deployments = deploymentFeaturesMap.get(body.deployment_id) ?? [];

    const newDeployment = {
      ...body,
      created_at: new Date().toISOString(),
      uuid: new Date().getTime().toString(),
    };

    const result = [newDeployment, ...deployments];

    deploymentFeaturesMap.set(body.deployment_id, result);

    return res(ctx.status(200), ctx.json([newDeployment])); // Supabase returns an array of deployments
  }

  function getDeploymentId(req: RestRequest) {
    return req.url.searchParams.get('deployment_id')?.split('.')[1];
  }
}
