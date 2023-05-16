import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

import { Deployment } from '@pivot/client/deployments';
import { isPendingDeployment } from '@pivot/client/pending-deployment';
import { findDeploymentsByProjectId, findProjectById } from '@pivot/fixtures';
import { sleep } from '@pivot/util/time';

export function deploymentHandlers(
  apiUrl: string,
  {
    cache: { deployments: deploymentsMap },
    isBrowser = false,
  }: { cache: { deployments: Map<string, Deployment[]> }; isBrowser?: boolean },
) {
  return [
    rest.get(`${apiUrl}/rest/v1/deployment`, getDeployments),
    rest.post(`${apiUrl}/rest/v1/deployment`, postDeployment),
  ];

  async function getDeployments(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
    if (isBrowser) {
      await sleep(250);
    }

    const uuid = getProjectId(req);

    if (!uuid) {
      return res(ctx.status(200), ctx.json('Project not found'));
    }

    const project = findProjectById(uuid);

    if (!project) {
      return res(ctx.status(200), ctx.json('Project not found'));
    }

    if (!deploymentsMap.has(uuid)) {
      const result = findDeploymentsByProjectId(uuid);

      if (!result) {
        return res(ctx.status(404), ctx.json(`Deployments not found for project ${uuid}`));
      }

      deploymentsMap.set(uuid, result);
    }

    return res(ctx.status(200), ctx.json(deploymentsMap.get(uuid)));
  }

  async function postDeployment(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
    if (isBrowser) {
      await sleep(250);
    }

    const body = await req.json();

    if (!isPendingDeployment(body)) {
      return res(ctx.status(400), ctx.json('Invalid deployment'));
    }

    const deployments = deploymentsMap.get(body.project_id);

    if (!deployments) {
      return res(ctx.status(404), ctx.json(`Deployments not found for project ${body.project_id}`));
    }

    const newDeployment = {
      ...body,
      created_at: new Date().toISOString(),
      uuid: new Date().getTime().toString(),
    };

    const result = [newDeployment, ...deployments];

    deploymentsMap.set(body.project_id, result);

    return res(ctx.status(200), ctx.json([newDeployment])); // Supabase returns an array of deployments
  }

  function getProjectId(req: RestRequest) {
    return req.url.searchParams.get('project_id')?.split('.')[1];
  }
}
