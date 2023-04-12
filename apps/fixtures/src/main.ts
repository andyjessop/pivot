import { config } from 'dotenv';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';

config();

const PROJECT_NAME = 'pivot';
const FIXTURE_PATH = resolve(__dirname, '../../../packages/fixtures/src');

main();

export async function main() {
  const accessToken = await getAccessToken();

  const projects = await getProjects();
  const uuid = projects.find((project) => project.name === PROJECT_NAME)?.uuid;
  const pivot = (await getProject(uuid))[0];

  if (!pivot) {
    throw new Error(`Project ${PROJECT_NAME} not found`);
  }

  const environments = await getEnvironments(pivot.uuid);
  const deployments = await getDeployments(pivot.uuid);
  const features = await getFeatures(pivot.uuid);
  const variables = await getVariables(pivot.uuid);

  writeProject({
    project: pivot,
    environments,
    deployments,
    features,
    variables,
  });

  async function get(url: string) {
    const response = await fetch(
      `https://bzorcyxlshyjsykloifx.supabase.co/rest/v1/${url}`,
      {
        method: 'GET',
        headers: {
          ApiKey: process.env.SUPABASE_API_KEY as string,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return await response.json();
  }

  async function getAccessToken() {
    const response = await fetch(
      'https://bzorcyxlshyjsykloifx.supabase.co/auth/v1/token?grant_type=password',
      {
        method: 'POST',
        headers: { ApiKey: process.env.SUPABASE_API_KEY as string },
        body: JSON.stringify({
          email: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD,
        }),
      },
    );

    const { access_token } = await response.json();

    return access_token;
  }

  async function getProjects(): Promise<any[]> {
    return get('project?select=*');
  }

  async function getProject(id: string) {
    return get(
      `project?uuid=eq.${id}&select=*,deployments:deployment(*),environments:environment(*),features:feature(*),variables:variable(*)`,
    );
  }

  async function getEnvironments(projectId: string) {
    return getProjectComponent(
      projectId,
      'environment?select=*,features:environment_feature(*),variables:environment_variable(*)',
    );
  }

  async function getDeployments(projectId: string) {
    return getProjectComponent(
      projectId,
      'deployment?select=*,features:deployment_feature(*),variables:deployment_variable(*)',
    );
  }

  async function getFeatures(projectId: string) {
    return getProjectComponent(projectId, 'feature?select=*');
  }

  async function getVariables(projectId: string) {
    return getProjectComponent(projectId, 'variable?select=*');
  }

  async function getProjectComponent(projectId: string, relativePath: string) {
    const response = await fetch(
      `https://bzorcyxlshyjsykloifx.supabase.co/rest/v1/${relativePath}&project_id=eq.${projectId}`,
      {
        method: 'GET',
        headers: {
          ApiKey: process.env.SUPABASE_API_KEY as string,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return await response.json();
  }

  function writeProject({
    project,
    environments,
    deployments,
    features,
    variables,
  }: {
    project: any;
    environments: any[];
    deployments: any[];
    features: any[];
    variables: any[];
  }) {
    const projectPath = resolve(FIXTURE_PATH, project.uuid);

    if (!existsSync(projectPath)) {
      mkdirSync(projectPath, { recursive: true });
    }

    write(
      `${projectPath}/project.ts`,
      `export const project = ${JSON.stringify(pivot)}`,
    );

    write(
      `${projectPath}/environments.ts`,
      `export const environments = ${JSON.stringify(environments)}`,
    );

    write(
      `${projectPath}/deployments.ts`,
      `export const deployments = ${JSON.stringify(deployments)}`,
    );

    write(
      `${projectPath}/features.ts`,
      `export const features = ${JSON.stringify(features)}`,
    );

    write(
      `${projectPath}/variables.ts`,
      `export const variables = ${JSON.stringify(variables)}`,
    );

    write(
      `${projectPath}/index.ts`,
      `export * from './project';\nexport * from './environments';\nexport * from './deployments';\nexport * from './features';\nexport * from './variables';`,
    );
  }
}

function write(path: string, content: string) {
  writeFileSync(
    path,
    format(content, {
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'all',
    }),
  );
}
