import { PendingDeploymentModal } from '@pivot/client/pending-deployment';

import { useSelector } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import { selectPendingDeploymentData } from '~app/modules/pending-deployment';

export function PendingDeployment() {
  const environments = useSelector(selectEnvironmentsResourceData);
  const pendingDeployment = useSelector(selectPendingDeploymentData);

  if (!environments || !pendingDeployment) {
    return null;
  }

  return (
    <PendingDeploymentModal
      environments={environments}
      pendingDeployment={pendingDeployment}
    />
  );
}
