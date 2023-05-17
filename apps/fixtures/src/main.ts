import { config } from 'dotenv';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';

config();

const PROJECT_NAME = 'pivot';
const USER_ID = 'b6b92239-6bf7-46ed-949a-7249eb1c3116';
const FIXTURE_PATH = resolve(__dirname, '../../../packages/fixtures/src/fixtures');
const ENVIRONMENTS_PATH = resolve(FIXTURE_PATH, 'environments.ts');
const DEPLOYMENTS_PATH = resolve(FIXTURE_PATH, 'deployments.ts');
const DEPLOYMENT_FEATURES_PATH = resolve(FIXTURE_PATH, 'deployment-features.ts');
const DEPLOYMENT_VARIABLES_PATH = resolve(FIXTURE_PATH, 'deployment-variables.ts');
const FEATURES_PATH = resolve(FIXTURE_PATH, 'features.ts');
const VARIABLES_PATH = resolve(FIXTURE_PATH, 'variables.ts');
const VARIABLE_OVERRIDES_PATH = resolve(FIXTURE_PATH, 'variable-overrides.ts');
const PROJECTS_PATH = resolve(FIXTURE_PATH, 'projects.ts');
const RELEASES_PATH = resolve(FIXTURE_PATH, 'releases.ts');
const TEAMS_PATH = resolve(FIXTURE_PATH, 'teams.ts');
const USERS_PATH = resolve(FIXTURE_PATH, 'users.ts');

main();

export async function main() {
  setup();

  const accessToken = await fetchAccessToken();

  const projects = await fetchProjects();

  const uuid = projects.find((project) => project.name === PROJECT_NAME)?.uuid;
  const pivot = (await getProject(uuid))[0];

  if (!pivot) {
    throw new Error(`Project ${PROJECT_NAME} not found`);
  }

  const environments = await fetchEnvironments(pivot.uuid);
  const deployments = await fetchDeployments(pivot.uuid);
  const deploymentFeatures = await fetchDeploymentFeatures(pivot.uuid);
  const deploymentVariables = await fetchDeploymentVariables(pivot.uuid);
  const features = await fetchFeatures(pivot.uuid);
  const releases = await fetchReleases(pivot.uuid);
  const variables = await fetchVariables(pivot.uuid);
  const variableOverrides = await fetchVariableOverrides(pivot.uuid);
  const teams = await fetchTeams();

  write(ENVIRONMENTS_PATH, `export const environments = ${JSON.stringify(environments)}`);
  write(DEPLOYMENTS_PATH, `export const deployments = ${JSON.stringify(deployments)}`);
  write(
    DEPLOYMENT_FEATURES_PATH,
    `export const deploymentFeatures = ${JSON.stringify(deploymentFeatures)}`,
  );
  write(
    DEPLOYMENT_VARIABLES_PATH,
    `export const deploymentVariables = ${JSON.stringify(deploymentVariables)}`,
  );
  write(FEATURES_PATH, `export const features = ${JSON.stringify(features)}`);
  write(RELEASES_PATH, `export const releases = ${JSON.stringify(releases)}`);
  write(VARIABLES_PATH, `export const variables = ${JSON.stringify(variables)}`);
  write(
    VARIABLE_OVERRIDES_PATH,
    `export const variableOverrides = ${JSON.stringify(variableOverrides)}`,
  );
  write(PROJECTS_PATH, `export const projects = ${JSON.stringify(projects)}`);
  write(TEAMS_PATH, `export const teams = ${JSON.stringify(teams)}`);
  write(USERS_PATH, `export const users = ${JSON.stringify([{ id: USER_ID }])}`);

  async function get(url: string) {
    const response = await fetch(`https://bzorcyxlshyjsykloifx.supabase.co/rest/v1/${url}`, {
      headers: {
        ApiKey: process.env.SUPABASE_API_KEY as string,
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });

    return await response.json();
  }

  async function fetchAccessToken() {
    const response = await fetch(
      'https://bzorcyxlshyjsykloifx.supabase.co/auth/v1/token?grant_type=password',
      {
        body: JSON.stringify({
          email: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD,
        }),
        headers: { ApiKey: process.env.SUPABASE_API_KEY as string },
        method: 'POST',
      },
    );

    const { access_token } = await response.json();

    return access_token;
  }

  async function fetchProjects(): Promise<any[]> {
    return get('project?select=*');
  }

  async function getProject(id: string) {
    return get(
      `project?uuid=eq.${id}&select=*,deployments:deployment(*),environments:environment(*),features:feature(*),variables:variable(*)`,
    );
  }

  async function fetchEnvironments(projectId: string) {
    return getProjectComponent(
      projectId,
      'environment?select=*,features:environment_feature(*),variables:environment_variable(*)',
    );
  }

  async function fetchDeployments(projectId: string) {
    return getProjectComponent(
      projectId,
      'deployment?select=*,features:deployment_feature(*),variables:deployment_variable(*)',
    );
  }

  async function fetchDeploymentFeatures(projectId: string) {
    const deployments = await fetchDeployments(projectId);

    const arrayOfArrays = await Promise.all(
      deployments.map(async (deployment: any) => {
        return get(`deployment_feature?deployment_id=eq.${deployment.uuid}&select=*`);
      }),
    );

    return arrayOfArrays.flat();
  }

  async function fetchDeploymentVariables(projectId: string) {
    const deployments = await fetchDeployments(projectId);

    const arrayOfArrays = await Promise.all(
      deployments.flatMap(async (deployment: any) => {
        return get(`deployment_variable?deployment_id=eq.${deployment.uuid}&select=*`);
      }),
    );

    return arrayOfArrays.flat();
  }

  async function fetchFeatures(projectId: string) {
    return getProjectComponent(projectId, 'feature?select=*');
  }

  async function fetchReleases(projectId: string) {
    return getProjectComponent(projectId, 'release?select=*');
  }

  async function fetchVariables(projectId: string) {
    return getProjectComponent(projectId, 'variable?select=*');
  }

  async function fetchVariableOverrides(projectId: string) {
    const deployments = await fetchDeployments(projectId);

    const arrayOfArrays = await Promise.all(
      deployments.flatMap(async (deployment: any) => {
        return get(`variable_override?deployment_id=eq.${deployment.uuid}&select=*`);
      }),
    );

    return arrayOfArrays.flat();
  }

  async function getProjectComponent(projectId: string, relativePath: string) {
    const response = await fetch(
      `https://bzorcyxlshyjsykloifx.supabase.co/rest/v1/${relativePath}&project_id=eq.${projectId}`,
      {
        headers: {
          ApiKey: process.env.SUPABASE_API_KEY as string,
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
      },
    );

    return await response.json();
  }

  async function fetchTeams() {
    return get(`team?select=*,users:team_user(*),projects:project(*)`);
  }
}

function setup() {
  rmSync(FIXTURE_PATH, { force: true, recursive: true });
  mkdirSync(FIXTURE_PATH, { recursive: true });
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
