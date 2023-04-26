import { Environment } from '@pivot/client/environments';
import { Release } from '@pivot/client/releases';
import { useEscapeKey } from '@pivot/hooks';
import { cx } from '@pivot/util/classname';

import { PendingDeployment } from '../types';

interface Props {
  clear: () => void;
  environments: Environment[];
  Features: JSX.Element;
  pendingDeployment: PendingDeployment;
  releases: Release[];
  update: (deployment: Partial<PendingDeployment>) => void;
  Variables: JSX.Element;
}

export function PendingDeploymentModal({
  clear,
  environments,
  Features,
  pendingDeployment,
  releases,
  update,
  Variables,
}: Props) {
  useEscapeKey(clear);

  const { environment_id, release_id } = pendingDeployment;

  const selectEnvironment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update({ environment_id: e.target.value });
  };

  return (
    <div className="modal is-active is-dark">
      <div onClick={clear} className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <h4 className="modal-card-title">Create New Deployment</h4>
          <button
            className="delete"
            aria-label="close"
            onClick={clear}
          ></button>
        </header>
        <section className="modal-card-body">
          <h4 className="is-size-6 has-text-weight-semibold mb-2">Release</h4>
          <div className="select">
            <select defaultValue={release_id}>
              {releases.map((release) => (
                <option key={release.uuid} value={release.uuid}>
                  {release.hash}
                </option>
              ))}
            </select>
          </div>
          <h4 className="is-size-6 has-text-weight-semibold mb-2">
            Environment
          </h4>
          <div className="select">
            <select defaultValue={environment_id} onChange={selectEnvironment}>
              {environments.map((env) => (
                <option key={env.uuid} value={env.uuid}>
                  {env.name}
                </option>
              ))}
            </select>
          </div>
          <h4 className="is-size-6 has-text-weight-semibold mb-2 mt-4">
            Feature Overrides
          </h4>
          {Features}
          <h4 className="is-size-6 has-text-weight-semibold mb-2">
            Variable Overrides
          </h4>
          {Variables}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons is-right">
            <button className={cx('button', 'is-dark')}>
              <span className="icon is-medium">
                <i className="las la-arrow-circle-up"></i>
              </span>
              <span>Deploy</span>
            </button>
            <button className="button" onClick={clear}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
