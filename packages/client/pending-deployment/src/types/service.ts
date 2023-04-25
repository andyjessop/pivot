import { PendingDeployment } from './state';

export interface Service {
  clear(): void;
  create(deployment: PendingDeployment): void;
  update(deployment: Partial<PendingDeployment>): void;
}
