import { Deployment } from '@pivot/client/deployments';
import { Environment } from '@pivot/client/environments';
import { Release } from '@pivot/client/releases';
import { animate, button, form, icon, modal, spaced, typography } from '@pivot/design/css';
import { useEscapeKey } from '@pivot/hooks';
import { cx } from '@pivot/util/classname';
import { Draft } from '@pivot/util/model';

interface Props {
  Variables: JSX.Element;
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

  return (
    <div className={cx(modal.base)}>
      <div className={modal.overlay} onClick={clear}></div>
      <dialog
        aria-modal="true"
        className={cx(modal.container, animate.element, animate['fade-in-up-tiny'], animate.fast)}>
        <header className={modal.header}>
          <h2 className={typography.heading}>Create New Deployment</h2>
          <button aria-label="close" className="delete" onClick={clear}></button>
        </header>
        <section className={modal.body}>
          <div className={cx(spaced.container, spaced.stretched, form.fieldset)}>
            <div>
              <label className={cx(typography.heading, form.label)} htmlFor={release_id}>
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
              <label className={cx(typography.heading, form.label)} htmlFor={environment_id}>
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
              <div>
                <label className={cx(typography.heading, form.label)} htmlFor={environment_id}>
                  URL
                </label>
                <div className="control">
                  <input
                    className="input"
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
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
            <h4 className={cx(typography.heading, form.label)}>Variables</h4>
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
