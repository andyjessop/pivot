import {
  DeploymentFeature,
  DeploymentFeatureWithName,
} from '@pivot/client/deployments';
import { cx } from '@pivot/util/classname';

import styles from './features.module.css';

interface Props {
  features: DeploymentFeatureWithName[];
  updateFeature: (uuid: string, feature: Partial<DeploymentFeature>) => void;
}

export function Features({ features, updateFeature }: Props) {
  const onSliderChange =
    (uuid: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      updateFeature(uuid, { value: parseFloat(value) });
    };

  const onToggle =
    (uuid: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      updateFeature(uuid, { enabled: checked });
    };

  return (
    <>
      {features.map(({ enabled, name, value, uuid }) => (
        <div className={styles.feature} key={uuid}>
          <div className={styles.key}>
            <div className="field">
              <div className="control has-icons-left">
                <input
                  className="input"
                  disabled={true}
                  type="text"
                  value={name}
                />
                <span className="icon is-left">
                  <i className="las la-tags"></i>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.value}>
            <div className="field">
              <div className={cx(styles['inputs'], 'field', 'is-grouped')}>
                <input
                  id={uuid}
                  type="checkbox"
                  name={uuid}
                  onChange={onToggle(uuid)}
                  className="switch is-info is-rounded"
                  checked={enabled}
                  value={uuid}
                />
                <label htmlFor={uuid}></label>
                <input
                  className={cx(styles.slider, 'slider', 'is-normal')}
                  step="0.05"
                  min="0"
                  max="1"
                  onChange={onSliderChange(uuid)}
                  value={value}
                  type="range"
                />
                <span>{value}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
