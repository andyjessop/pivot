export interface Actions {
  setDeploymentId(deploymentId: string | null): void;
  setEnvironmentId(environmentId: string | null): void;
  setFeature(featureId: string, value: number): void;
  setReleaseId(releaseId: string | null): void;
  setUrl(url: string): void;
  setVariable(variableId: string, value: string): void;
}
