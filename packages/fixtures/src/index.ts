export async function getProjectFixture(projectId: string, component: string) {
  return import(`./project_${projectId}`).then((mod) => mod[component]);
}

export async function getUserFixture(userId: string, component: string) {
  return import(`./user_${userId}`).then((mod) => mod[component]);
}
