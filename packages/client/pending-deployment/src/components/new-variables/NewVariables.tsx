import { NewVariable } from '@pivot/client/pending-deployment';
import { button, form, icon, iconStyles, util } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

interface Props {
  newVariables: NewVariable[];
  removeNewVariable: (id: string) => void;
  updateNewVariableName: (id: string, name: string) => void;
  updateNewVariableValue: (id: string, value: string) => void;
}

export function NewVariables({
  newVariables,
  removeNewVariable,
  updateNewVariableName,
  updateNewVariableValue,
}: Props) {
  return (
    <>
      {newVariables.map(({ id, name, value }, ndx) => (
        <div className={cx(form.element)} key={id}>
          <div className={cx('field is-grouped', util['align-vertically'])}>
            <div className={cx('control is-expanded')}>
              <input
                autoFocus={ndx === 0 && !name}
                className={cx('input')}
                defaultValue={name}
                onBlur={(e) => updateNewVariableName(id, e.target.value)}
                type="text"
              />
            </div>
            <div className={cx('control is-expanded')}>
              <input
                className={cx('input')}
                defaultValue={value}
                onBlur={(e) => updateNewVariableValue(id, e.target.value)}
                type="text"
              />
            </div>
            <button className={cx(button.base, button.icon)} onClick={() => removeNewVariable(id)}>
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
