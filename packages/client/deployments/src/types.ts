export interface Deployment {
  created_at: string;
  environment_id: string;
  project_id: string;
  release_id: string;
  url: string;
  uuid: string;
}

export const isDeployment = (deployment: any): deployment is Deployment => {
  return (
    typeof deployment === 'object' &&
    deployment !== null &&
    typeof deployment.created_at === 'string' &&
    typeof deployment.environment_id === 'string' &&
    Array.isArray(deployment.features) &&
    typeof deployment.project_id === 'string' &&
    typeof deployment.release_id === 'string' &&
    typeof deployment.url === 'string' &&
    typeof deployment.uuid === 'string' &&
    Array.isArray(deployment.variables)
  );
};
