import { html } from 'lit';

import { cx } from '@pivot/util/classname';

import { Model } from '../types';

import styles from './variables.module.css';

export function variables(featuresData: Model['variables']) {
  return html`${featuresData.map(
    ({ name, value }) =>
      html`
        <div class=${styles['variable']}>
          <div class=${cx(styles['inner'], 'field is-grouped')}>
            <div class="control has-icons-left is-expanded">
              <input class="input" type="text" value=${name} />
              <span class="icon is-left">
                <i class="las la-tags"></i>
              </span>
            </div>
            <div class="control has-icons-left is-expanded">
              <input class="input" type="text" value=${value} />
              <span class="icon is-left">
                <i class="las la-key"></i>
              </span>
            </div>
          </div>
        </div>
      `,
  )}`;
}
