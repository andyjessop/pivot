import { DraftDeploymentVariableWithName } from '@pivot/client/deployment-variables';
import { button, form, icon, iconStyles, spaced, util } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

interface Props {
  deploymentVariables: DraftDeploymentVariableWithName[];
  removeVariable: (variable_id: string) => void;
  updateVariable: (variable_id: string, value: string) => void;
}

export function DeploymentVariables({
  deploymentVariables = [],
  removeVariable,
  updateVariable,
}: Props) {
  const onTextChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateVariable(name, value);
  };

  return (
    <>
      {deploymentVariables.map(({ name, value, variable_id }) => (
        <div className={form.element} key={variable_id}>
          <div className={cx('field is-grouped', util['align-vertically'])}>
            <div
              className={cx(
                'control is-expanded',
                form['label-inline'],
                spaced.container,
                util.stretch,
              )}>
              {name}
            </div>
            <div className={cx('control is-expanded', util.stretch)}>
              <input
                className="input"
                onChange={onTextChange(variable_id)}
                type="text"
                value={value}
              />
            </div>
            <button
              className={cx(button.base, button.icon)}
              onClick={() => removeVariable(variable_id)}>
              <span className={iconStyles.base}>
                <i className={icon.remove}></i>
              </span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
