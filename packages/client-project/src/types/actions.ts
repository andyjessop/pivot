export interface Actions {
  createFromRelease(releaseId: string): void;
  createFromDeployment(deploymentId: string): void;
  setCurrentNavItem(item: string): void;
}
