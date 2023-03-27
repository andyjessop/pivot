export interface Service {
  clearPendingDeployment(): void;
  createFromDeployment(deploymentId: string): void;
}
