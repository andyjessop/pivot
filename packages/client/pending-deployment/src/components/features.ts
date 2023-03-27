import { html } from 'lit';

import { cx } from '@pivot/util/classname';

import { Model } from '../types';

import styles from './feature.module.css';

export function features(featuresData: Model['features']) {
  return html`${featuresData.map(
    ({ name, value, feature_id }) =>
      html`
        <div class=${styles['feature']}>
          <div class=${styles['key']}>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="text" value=${name} />
                <span class="icon is-left">
                  <i class="las la-tags"></i>
                </span>
              </div>
            </div>
          </div>
          <div class=${styles['value']}>
            <div class="field">
              <div class=${cx(styles['inputs'], 'field', 'is-grouped')}>
                <input
                  id=${feature_id}
                  type="checkbox"
                  name=${feature_id}
                  class="switch is-info is-rounded"
                  .checked=${value > 0}
                />
                <label for=${feature_id}></label>
                <input
                  class=${cx(styles['slider'], 'slider', 'is-normal')}
                  step="0.05"
                  min="0"
                  max="1"
                  value=${value}
                  type="range"
                />
                <span>${value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `,
  )}`;
}
