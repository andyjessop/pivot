import { DisplayVariable } from '@pivot/client/pending-deployment';
import { button, form, icon, iconStyles, spaced, util } from '@pivot/design/css';
import { Tag } from '@pivot/design/react/tag';
import { cx } from '@pivot/util/classname';

import styles from './variables.module.css';

interface Props {
  clearOverride: (variable_id: string) => void;
  overrideVariable: (variable_id: string, value: string) => void;
  variables: DisplayVariable[];
}

export function Variables({ clearOverride, overrideVariable, variables }: Props) {
  return (
    <>
      {variables.map(({ environment, name, overridden, value, variable_id }) => (
        <div className={cx(form.element)} key={name}>
          <div className={cx('field is-grouped', util['align-vertically'])}>
            <div
              className={cx(
                'control is-expanded',
                form['label-inline'],
                spaced.container,
                util.stretch,
              )}>
              {name}
              <Tag color={environment.color}>{environment.name}</Tag>
            </div>
            <div className={cx('control is-expanded', util.stretch, styles.input)}>
              <input
                className={cx('input', {
                  [styles.overridden]: overridden,
                })}
                onChange={(e) => overrideVariable(variable_id, e.target.value)}
                type="text"
                value={value}
              />
            </div>
            <button
              className={cx(button.base, button.icon)}
              disabled={!overridden}
              onClick={() => clearOverride(variable_id)}>
              <span className={iconStyles.base}>
                <i className={icon.undo}></i>
              </span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
