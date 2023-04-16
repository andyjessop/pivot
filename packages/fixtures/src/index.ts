import { Model } from '@pivot/client/project';

export function getProjectFixture(projectId: string, component: string): any {
  const project = import(`./fixtures/project_${projectId}`).then(
    (m) => m[component],
  );

  return project;
}

export function getTeamFixture(teamId: string, component: string): any {
  const project = import(`./fixtures/team_${teamId}`).then((m) => m[component]);

  return project;
}

export function getUserFixture(userId: string, component: string): any {
  const project = import(`./fixtures/user_${userId}`).then((m) => m[component]);

  return project;
}

export async function findEnvironmentsByProjectId(projectId: string) {
  return import('./fixtures/environments').then((m) => {
    return m.environments.filter((e) => e.project_id === projectId);
  }) as Promise<Model[]>;
}

export async function findDeploymentsByProjectId(projectId: string) {
  return import('./fixtures/deployments').then((m) => {
    return m.deployments.filter((d) => d.project_id === projectId);
  }) as Promise<Model[]>;
}

export async function findFeaturesByProjectId(projectId: string) {
  return import('./fixtures/features').then((m) => {
    return m.features.filter((f) => f.project_id === projectId);
  }) as Promise<Model[]>;
}

export async function findVariablesByProjectId(projectId: string) {
  return import('./fixtures/variables').then((m) => {
    return m.variables.filter((v) => v.project_id === projectId);
  }) as Promise<Model[]>;
}

export async function findProjectById(id: string) {
  return import('./fixtures/projects').then((m) => {
    return m.projects.find((p) => p.uuid === id);
  }) as Promise<Model>;
}

export async function findProjectByName(name: string) {
  return import('./fixtures/projects').then((m) => {
    return m.projects.find((p) => p.name === name);
  }) as Promise<Model>;
}

export async function findProjectsByTeamId(teamId: string) {
  return import('./fixtures/projects').then((m) => {
    return m.projects.filter((p) => p.team_id === teamId);
  }) as Promise<Model[]>;
}

export async function findTeamsByUserId(userId: string) {
  return import('./fixtures/teams').then((m) => {
    return m.teams.filter((t) => t.user_id === userId);
  }) as Promise<Model[]>;
}
