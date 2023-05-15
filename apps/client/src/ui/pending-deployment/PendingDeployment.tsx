import { PendingDeploymentModal, Variables } from '@pivot/client/pending-deployment';
import { Loader } from '@pivot/design/react/loader';

import { useSelector, useService } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import {
  selectDisplayVariables,
  selectIsFetchingVariables,
  selectPendingDeployment,
} from '~app/modules/pending-deployment';
import { selectReleasesResourceData } from '~app/modules/releases';

export function PendingDeployment() {
  const service = useService('pendingDeployment');
  const environments = useSelector(selectEnvironmentsResourceData);
  const deployment = useSelector(selectPendingDeployment);
  const releases = useSelector(selectReleasesResourceData);
  const variables = useSelector(selectDisplayVariables);
  const isFetchingVariables = useSelector(selectIsFetchingVariables);

  if (!environments || !deployment || !releases || !service || !variables) {
    return null;
  }

  const { clearDrafts, clearOverride, overrideVariable, setEnvironment, setUrl } = service;

  // const FeaturesComponent = (
  //   <Features features={features} updateFeature={updateFeature} />
  // );

  const deploy = () => {
    if (!deployment) {
      throw new Error('No pending deployment');
    }

    service.deploy();
  };

  const VariablesComponent = isFetchingVariables ? (
    <Loader size="medium" />
  ) : (
    <Variables
      clearOverride={clearOverride}
      overrideVariable={overrideVariable}
      variables={variables}
    />
  );

  return (
    <PendingDeploymentModal
      Variables={VariablesComponent}
      clear={clearDrafts}
      deploy={deploy}
      deployment={deployment}
      environments={environments}
      releases={releases}
      setEnvironment={setEnvironment}
      setUrl={setUrl}
      // Features={FeaturesComponent}
    />
  );
}
