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
