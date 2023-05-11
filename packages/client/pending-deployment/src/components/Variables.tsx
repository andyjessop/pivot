import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { DisplayVariable } from '@pivot/client/pending-deployment';
import { cx } from '@pivot/util/classname';
import { Draft } from '@pivot/util/model';

import styles from './variables.module.css';

interface Props {
  setVariable: (uuid: string, variable: Partial<Draft<DeploymentVariable>>) => void;
  variables: DisplayVariable[];
}

export function Variables({ variables, setVariable }: Props) {
  const onTextChange = (uuid: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setVariable(uuid, { value });
  };

  return (
    <>
      {variables.map(({ name, value }) => (
        <div className={styles.variable} key={name}>
          <div className={cx(styles.inner, 'field is-grouped')}>
            <div className="control has-icons-left is-expanded">
              <input className="input" disabled type="text" value={name} />
              <span className="icon is-left">
                <i className="las la-tags"></i>
              </span>
            </div>
            <div className="control has-icons-left is-expanded">
              <input className="input" onChange={onTextChange(name)} type="text" value={value} />
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
