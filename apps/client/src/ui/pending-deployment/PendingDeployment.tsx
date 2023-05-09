import { PendingDeploymentModal, Variables } from '@pivot/client/pending-deployment';

import { useSelector, useService } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import { selectPendingDeployment, selectVariablesList } from '~app/modules/pending-deployment';
import { selectReleasesResourceData } from '~app/modules/releases';

export function PendingDeployment() {
  const service = useService('pendingDeployment');
  const environments = useSelector(selectEnvironmentsResourceData);
  const pendingDeployment = useSelector(selectPendingDeployment);
  const releases = useSelector(selectReleasesResourceData);
  const variables = useSelector(selectVariablesList);

  if (!environments || !pendingDeployment || !releases || !service || !variables) {
    return null;
  }

  const { clearDrafts, setDeployment, setVariable } = service;

  // const FeaturesComponent = (
  //   <Features features={features} updateFeature={updateFeature} />
  // );

  const deploy = () => {
    if (!pendingDeployment) {
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
      environments={environments}
      pendingDeployment={pendingDeployment}
      releases={releases}
      update={update}
      // Features={FeaturesComponent}
    />
  );
}
