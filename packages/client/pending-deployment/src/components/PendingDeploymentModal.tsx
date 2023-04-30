import { Environment } from '@pivot/client/environments';
import { Release } from '@pivot/client/releases';
import {
  button,
  form,
  icon,
  modal,
  spaced,
  typography,
} from '@pivot/design/css';
import { useEscapeKey } from '@pivot/hooks';
import { cx } from '@pivot/util/classname';

import { PendingDeployment } from '../types';

interface Props {
  clear: () => void;
  environments: Environment[];
  // Features?: JSX.Element;
  pendingDeployment: PendingDeployment;
  releases: Release[];
  update: (deployment: Partial<PendingDeployment>) => void;
  Variables: JSX.Element;
}

export function PendingDeploymentModal({
  clear,
  environments,
  // Features,
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

  const updateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({ url: e.target.value });
  };

  const env = environments.find((env) => env.uuid === environment_id);

  return (
    <div className={modal.base}>
      <div className={modal.overlay} onClick={clear}></div>
      <dialog aria-modal="true" className={cx(modal.container)}>
        <header className={modal.header}>
          <h2 className={typography.heading}>Create New Deployment</h2>
          <button
            className="delete"
            aria-label="close"
            onClick={clear}></button>
        </header>
        <section className={modal.body}>
          <div
            className={cx(spaced.container, spaced.stretched, form.fieldset)}>
            <div>
              <label
                className={cx(typography.heading, form.label)}
                htmlFor={release_id}>
                Release
              </label>
              <div className="select">
                <select
                  defaultValue={release_id}
                  id={release_id}
                  autoFocus={true}>
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
                htmlFor={environment_id}>
                Environment
              </label>
              <div className="select">
                <select
                  defaultValue={environment_id}
                  id={environment_id}
                  onChange={selectEnvironment}>
                  {environments.map((env) => (
                    <option key={env.uuid} value={env.uuid}>
                      {env.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {env?.url === null ? (
              <div>
                <label
                  className={cx(typography.heading, form.label)}
                  htmlFor={environment_id}>
                  URL
                </label>
                <div className="control">
                  <input
                    className="input"
                    onChange={updateUrl}
                    type="text"
                    value={pendingDeployment.url || ''}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {/* {Features ? (
            <div className={form.fieldset}>
              <h4 className={cx(typography.heading, form.label)}>
                Feature Overrides
              </h4>
              {Features}
            </div>
          ) : null} */}
          <div className={form.fieldset}>
            <h4 className={cx(typography.heading, form.label)}>Variables</h4>
            {Variables}
          </div>
        </section>

        <footer className={modal.footer}>
          <div className={button.container}>
            <button className={button.base} onClick={clear}>
              Cancel
            </button>
            <button className={cx(button.base, button.success)}>
              <span className={cx(button.icon, button.before)}>
                <i className={icon.deployments}></i>
              </span>
              <span>Deploy</span>
            </button>
          </div>
        </footer>
      </dialog>
    </div>
  );
}
