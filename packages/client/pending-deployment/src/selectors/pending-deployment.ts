import { Project } from '@pivot/client/shared-interfaces';

import { Model, State } from '../types';

export function selectPendingDeployment(
  project?: Project.Model,
  pendingDeployment?: State,
): Model | null {
  if (
    !project ||
    !pendingDeployment ||
    !(pendingDeployment.deploymentId || pendingDeployment.releaseId)
  ) {
    return null;
  }

  const { deploymentId, releaseId } = pendingDeployment;

  const deployment = deploymentId
    ? project.deployments.find((d) => d.uuid === deploymentId)
    : undefined;

  const release = project.releases.find(
    (r) => r.uuid === deployment?.release_id ?? releaseId,
  );

  if (!release) {
    throw new Error(
      `Release with uuid ${deployment?.release_id ?? releaseId} not found`,
    );
  }

  const { environments } = project;

  const environmentId = deployment?.environment_id ?? environments[0]?.uuid;

  const environment = environments.find((e) => e.uuid === environmentId);

  if (!environment) {
    throw new Error(`Environment with uuid ${environmentId} not found`);
  }

  const features = environment.features.map((feature) => {
    const name = project.features.find(
      (f) => f.uuid === feature.feature_id,
    )?.name;

    if (!name) {
      throw new Error(`Feature with uuid ${feature.feature_id} not found`);
    }

    const base = {
      ...feature,
      fromEnvironment: true,
      name,
    };

    if (deployment) {
      const deploymentFeature = deployment.features.find(
        (f) => f.uuid === feature.uuid,
      );

      if (deploymentFeature) {
        return {
          ...base,
          value: deploymentFeature.value,
        };
      }
    }

    return base;
  });

  const variables = environment.variables.map((variable) => {
    const name = project.variables.find(
      (f) => f.uuid === variable.variable_id,
    )?.name;

    if (!name) {
      throw new Error(`Variable with uuid ${variable.variable_id} not found`);
    }

    const base = {
      ...variable,
      fromEnvironment: true,
      name,
    };

    if (deployment) {
      const deploymentVariable = deployment.variables.find(
        (v) => v.uuid === variable.uuid,
      );

      if (deploymentVariable) {
        return {
          ...base,
          value: deploymentVariable.value,
        };
      }
    }

    return base;
  });

  return {
    environmentId,
    environments,
    features,
    release,
    url: pendingDeployment.url,
    variables,
  };
}
