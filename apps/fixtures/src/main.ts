import { config } from 'dotenv';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';

config();

const PROJECT_NAME = 'pivot';
const USER_ID = 'b6b92239-6bf7-46ed-949a-7249eb1c3116';
const FIXTURE_PATH = resolve(
  __dirname,
  '../../../packages/fixtures/src/fixtures',
);
const ENVIRONMENTS_PATH = resolve(FIXTURE_PATH, 'environments.ts');
const DEPLOYMENTS_PATH = resolve(FIXTURE_PATH, 'deployments.ts');
const FEATURES_PATH = resolve(FIXTURE_PATH, 'features.ts');
const VARIABLES_PATH = resolve(FIXTURE_PATH, 'variables.ts');
const PROJECTS_PATH = resolve(FIXTURE_PATH, 'projects.ts');
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
  const features = await fetchFeatures(pivot.uuid);
  const variables = await fetchVariables(pivot.uuid);
  const teams = await fetchTeams();

  write(
    ENVIRONMENTS_PATH,
    `export const environments = ${JSON.stringify(environments)}`,
  );
  write(
    DEPLOYMENTS_PATH,
    `export const deployments = ${JSON.stringify(deployments)}`,
  );
  write(FEATURES_PATH, `export const features = ${JSON.stringify(features)}`);
  write(
    VARIABLES_PATH,
    `export const variables = ${JSON.stringify(variables)}`,
  );
  write(PROJECTS_PATH, `export const projects = ${JSON.stringify(projects)}`);
  write(TEAMS_PATH, `export const teams = ${JSON.stringify(teams)}`);
  write(
    USERS_PATH,
    `export const users = ${JSON.stringify([{ id: USER_ID }])}`,
  );

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

  async function fetchAccessToken() {
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

  async function fetchFeatures(projectId: string) {
    return getProjectComponent(projectId, 'feature?select=*');
  }

  async function fetchVariables(projectId: string) {
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

  async function fetchTeams() {
    return get(`team?select=*,users:team_user(*),projects:project(*)`);
  }
}

function setup() {
  rmSync(FIXTURE_PATH, { recursive: true, force: true });
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
