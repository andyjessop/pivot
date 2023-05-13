import { Deployment } from '@pivot/client/deployments';
import { Environment } from '@pivot/client/environments';
import { Release } from '@pivot/client/releases';
import { button, form, icon, modal, spaced, typography, util } from '@pivot/design/css';
import { useEscapeKey } from '@pivot/hooks';
import { cx } from '@pivot/util/classname';
import { Draft } from '@pivot/util/model';

interface Props {
  DeploymentVariables: JSX.Element;
  Variables?: JSX.Element;
  clear: () => void;
  deploy: () => void;
  // Features?: JSX.Element;
  deployment: Draft<Deployment>;
  environments: Environment[];
  releases: Release[];
  setEnvironment: (uuid: string) => void;
  setUrl: (url: string) => void;
}

export function PendingDeploymentModal({
  clear,
  deploy,
  deployment,
  DeploymentVariables,
  environments,
  // Features,
  releases,
  setEnvironment,
  setUrl,
  Variables,
}: Props) {
  useEscapeKey(clear);

  const { environment_id, release_id } = deployment;

  const env = environments.find((env) => env.uuid === environment_id);

  const addVariable = () => {
    console.log('addVariable'); // eslint-disable-line no-console
  };

  return (
    <div className={cx(modal.base)}>
      <div className={modal.overlay} onClick={clear}></div>
      <dialog aria-modal="true" className={cx(modal.container)}>
        <header className={modal.header}>
          <h2 className={cx(typography.heading, typography.h2)}>Create New Deployment</h2>
          <button aria-label="close" className="delete" onClick={clear}></button>
        </header>
        <section className={modal.body}>
          <div className={cx(spaced.container, spaced.block, form.fieldset)}>
            <div>
              <label
                className={cx(typography.heading, typography.h5, form.label)}
                htmlFor={release_id}>
                Release
              </label>
              <div className="select">
                <select autoFocus={true} defaultValue={release_id} id={release_id}>
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
                className={cx(typography.heading, typography.h5, form.label)}
                htmlFor={environment_id}>
                Environment
              </label>
              <div className="select">
                <select
                  defaultValue={environment_id}
                  id={environment_id}
                  onChange={(e) => setEnvironment(e.target.value)}>
                  {environments.map((env) => (
                    <option key={env.uuid} value={env.uuid}>
                      {env.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {env?.url === null ? (
              <div className={util.stretch}>
                <label className={cx(typography.heading, typography.h5, form.label)} htmlFor="url">
                  URL
                </label>
                <div className="control">
                  <input
                    className="input"
                    id="url"
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    value={deployment.url || ''}
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
            <h4 className={cx(typography.heading, typography.h4, form.label)}>Variables</h4>
            <div className={cx(form.heading, spaced.container, spaced.block)}>
              <h5 className={cx(typography.heading, typography.h5, util.stretch)}>
                Deployment Variables
              </h5>
              <button className={cx(button.base)} onClick={addVariable}>
                <span className={cx(button.icon, button.before)}>
                  <i className={icon.plusCircle}></i>
                </span>
                <span>Add Deployment Variable</span>
              </button>
            </div>
            {DeploymentVariables}

            <h5 className={cx(typography.heading, typography.h5)}>Environment Variables</h5>
            {Variables}
          </div>
        </section>

        <footer className={modal.footer}>
          <div className={button.container}>
            <button className={button.base} onClick={clear}>
              Cancel
            </button>
            <button className={cx(button.base, button.success)} onClick={deploy}>
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
