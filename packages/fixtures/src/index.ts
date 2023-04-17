import { deployments } from './fixtures/deployments';
import { environments } from './fixtures/environments';
import { features } from './fixtures/features';
import { projects } from './fixtures/projects';
import { teams } from './fixtures/teams';
import { variables } from './fixtures/variables';

export function findEnvironmentsByProjectId(projectId: string) {
  return environments.filter((e) => e.project_id === projectId)!;
}

export function findDeploymentsByProjectId(projectId: string) {
  return deployments.filter((d) => d.project_id === projectId)!;
}

export function findFeaturesByProjectId(projectId: string) {
  return features.filter((f) => f.project_id === projectId)!;
}

export function findVariablesByProjectId(projectId: string) {
  return variables.filter((v) => v.project_id === projectId)!;
}

export function findProjectById(id: string) {
  return projects.find((p) => p.uuid === id)!;
}

export function findProjectByName(name: string) {
  return projects.find((p) => p.name === name)!;
}

export function findProjectsByTeamId(teamId: string) {
  return projects.filter((p) => p.team_id === teamId)!;
}

export function findTeamsByUserId(userId: string) {
  return teams.filter((t) => t.user_id === userId)!;
}
