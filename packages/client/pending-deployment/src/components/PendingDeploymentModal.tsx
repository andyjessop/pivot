import { Environment } from '@pivot/client/environments';
import { cx } from '@pivot/util/classname';

import { PendingDeployment } from '../types';

interface Props {
  environments: Environment[];
  pendingDeployment: PendingDeployment;
}

export function PendingDeploymentModal({
  environments,
  pendingDeployment,
}: Props) {
  const { environment_id } = pendingDeployment;

  const clearPendingDeployment = () => {
    console.log('clearPendingDeployment');
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <h4 className="modal-card-title">New Deployment</h4>
          <button
            className="delete"
            aria-label="close"
            onClick={clearPendingDeployment}
          ></button>
        </header>
        <section className="modal-card-body">
          <h4 className="is-size-6 has-text-weight-semibold mb-2">Release</h4>

          <h4 className="is-size-6 has-text-weight-semibold mb-2">
            Environment
          </h4>
          <div className="select">
            <select>
              {environments.map((env) => (
                <option value={env.uuid} selected={env.uuid === environment_id}>
                  {env.name}
                </option>
              ))}
            </select>
          </div>
          <h4 className="is-size-6 has-text-weight-semibold mb-2 mt-4">
            Feature Overrides
          </h4>
          {/* {featuresComponent(features as any)} */}
          <h4 className="is-size-6 has-text-weight-semibold mb-2">
            Variable Overrides
          </h4>
          {/* {variablesComponent(variables as any)} */}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons is-right">
            <button className={cx('button', 'is-dark', 'is-loading')}>
              <span className="icon is-medium">
                <i className="las la-arrow-circle-up"></i>
              </span>
              <span>Deploy</span>
            </button>
            <button className="button" onClick={clearPendingDeployment}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
