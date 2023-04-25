import { PendingDeployment } from './state';

export interface Actions {
  set(deployment: PendingDeployment | null): void;
  update(deployment: Partial<PendingDeployment>): void;
}
