import {
  DeploymentVariable,
  DraftDeploymentVariableWithName,
} from '@pivot/client/deployment-variables';
import { form, spaced, util } from '@pivot/design/css';
import { Loader } from '@pivot/design/react/loader';
import { cx } from '@pivot/util/classname';
import { Draft } from '@pivot/util/model';

import styles from './deployment-variables.module.css';

interface Props {
  deploymentVariables: DraftDeploymentVariableWithName[];
  isFetchingVariables?: boolean;
  updateVariable: (uuid: string, variable: Partial<Draft<DeploymentVariable>>) => void;
}

export function DeploymentVariables({
  isFetchingVariables,
  deploymentVariables = [],
  updateVariable,
}: Props) {
  const onTextChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateVariable(name, { value });
  };

  if (isFetchingVariables) {
    return (
      <div className={cx(styles.container, util['centered-container'])}>
        <div className={cx(spaced.container)}>
          <Loader size="large" />
          <span>Loading deployment variables...</span>
        </div>
      </div>
    );
  }

  if (deploymentVariables.length === 0) {
    return (
      <div className={cx(styles.container, util['centered-container'])}>
        <p>There are no variables set specifically for this deployment.</p>
      </div>
    );
  }

  return (
    <>
      {deploymentVariables.map(({ name, value, variable_id }) => (
        <div className={form.element} key={name}>
          <div className={cx('field is-grouped')}>
            <div
              className={cx(
                'control is-expanded',
                form['label-inline'],
                spaced.container,
                util.stretch,
              )}>
              {name}
            </div>
            <div className={cx('control has-icons-left is-expanded', util.stretch)}>
              <input
                className="input"
                onChange={onTextChange(variable_id)}
                type="text"
                value={value}
              />
              <span className="icon is-left">
                <i className="las la-key"></i>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
