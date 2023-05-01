export interface Actions {
  createFromDeployment(deploymentId: string): void;
  createFromRelease(releaseId: string): void;
  setCurrentNavItem(item: string): void;
}
