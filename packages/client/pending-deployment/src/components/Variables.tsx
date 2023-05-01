import { VariablesList } from '@pivot/client/pending-deployment';
import { cx } from '@pivot/util/classname';

import styles from './variables.module.css';

interface Props {
  variables: VariablesList;
  updateVariable: (uuid: string, value: string) => void;
}

export function Variables({ variables, updateVariable }: Props) {
  const onTextChange = (uuid: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateVariable(uuid, value);
  };

  return (
    <>
      {variables.map(({ name, value, uuid }) => (
        <div className={styles.variable} key={uuid}>
          <div className={cx(styles.inner, 'field is-grouped')}>
            <div className="control has-icons-left is-expanded">
              <input className="input" disabled type="text" value={name} />
              <span className="icon is-left">
                <i className="las la-tags"></i>
              </span>
            </div>
            <div className="control has-icons-left is-expanded">
              <input className="input" onChange={onTextChange(uuid)} type="text" value={value} />
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
