export async function getFixture(projectId: string, component: string) {
  return await import(`./${projectId}`).then((mod) => mod[component]);
}
