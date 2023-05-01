import { PendingDeploymentModal, Variables } from '@pivot/client/pending-deployment';

import { useSelector, useService } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import { selectPendingDeploymentData, selectVariablesList } from '~app/modules/pending-deployment';
import { selectReleasesResourceData } from '~app/modules/releases';

export function PendingDeployment() {
  const service = useService('pendingDeployment');
  const environments = useSelector(selectEnvironmentsResourceData);
  const pendingDeployment = useSelector(selectPendingDeploymentData);
  const releases = useSelector(selectReleasesResourceData);
  const variables = useSelector(selectVariablesList);

  if (!environments || !pendingDeployment || !releases || !service || !variables) {
    return null;
  }

  const { set, update, updateVariable } = service;

  // const FeaturesComponent = (
  //   <Features features={features} updateFeature={updateFeature} />
  // );

  const VariablesComponent = <Variables variables={variables} updateVariable={updateVariable} />;

  return (
    <PendingDeploymentModal
      clear={() => set(null)}
      environments={environments}
      // Features={FeaturesComponent}
      pendingDeployment={pendingDeployment}
      releases={releases}
      update={update}
      Variables={VariablesComponent}
    />
  );
}
