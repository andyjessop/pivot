import { Environment } from '@pivot/client/environments';
import { Release } from '@pivot/client/releases';
import { form, modal, spaced, typography } from '@pivot/design/css';
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
    <div className={modal.base}>
      <div className={modal.overlay} onClick={clear}></div>
      <div className={cx(modal.container, modal.large)}>
        <header className={modal.header}>
          <h2 className={typography.heading}>Create New Deployment</h2>
          <button
            className="delete"
            aria-label="close"
            onClick={clear}
          ></button>
        </header>
        <section className={modal.body}>
          <div className={cx(spaced.container, form.fieldset)}>
            <div>
              <label
                className={cx(typography.heading, form.label)}
                htmlFor={release_id}
              >
                Release
              </label>
              <div className="select">
                <select defaultValue={release_id} id={release_id}>
                  {releases.map((release) => (
                    <option key={release.uuid} value={release.uuid}>
                      {release.hash}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                className={cx(typography.heading, form.label)}
                htmlFor={environment_id}
              >
                Environment
              </label>
              <div className="select">
                <select
                  defaultValue={environment_id}
                  id={environment_id}
                  onChange={selectEnvironment}
                >
                  {environments.map((env) => (
                    <option key={env.uuid} value={env.uuid}>
                      {env.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={form.fieldset}>
            <h4 className={cx(typography.heading, form.label)}>
              Feature Overrides
            </h4>
            {Features}
          </div>
          <div className={form.fieldset}>
            <h4 className={cx(typography.heading, form.label)}>
              Variable Overrides
            </h4>
            {Variables}
          </div>
        </section>
        <footer className={modal.footer}>
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
