import { PendingDeploymentModal, Variables } from '@pivot/client/pending-deployment';

import { useSelector, useService } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import { selectDisplayVariables, selectPendingDeployment } from '~app/modules/pending-deployment';
import { selectReleasesResourceData } from '~app/modules/releases';

export function PendingDeployment() {
  const service = useService('pendingDeployment');
  const environments = useSelector(selectEnvironmentsResourceData);
  const deployment = useSelector(selectPendingDeployment);
  const releases = useSelector(selectReleasesResourceData);
  const variables = useSelector(selectDisplayVariables);

  if (!environments || !deployment || !releases || !service || !variables) {
    return null;
  }

  const { clearDrafts, setEnvironment, setVariable, setUrl } = service;

  // const FeaturesComponent = (
  //   <Features features={features} updateFeature={updateFeature} />
  // );

  const deploy = () => {
    if (!deployment) {
      throw new Error('No pending deployment');
    }

    service.deploy();
  };

  const VariablesComponent = <Variables setVariable={setVariable} variables={variables} />;

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
