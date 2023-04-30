import { html } from 'lit';

import type { Project } from '@pivot/client/shared-interfaces';
import { cx } from '@pivot/util/classname';

import styles from './features.module.css';

export function features(featuresData: Project.Model['features']) {
  return html`${featuresData.map(
    (feature) =>
      html`
        <div class=${styles.entry}>
          <div class=${styles.key}>
            <div class"field">
              <label class="label">Key</label>
              <div class="control has-icons-left">
                <input class="input" type="text" value=${feature.name} />
                <span class="icon is-left">
                  <i class="las la-tags"></i>
                </span>
              </div>
            </div>
          </div>
          <div class=${styles.values}>
            ${feature.values.map(
              ({ environment, value }: any) => html`
                <div class="field">
                  <div class="control">
                    <label class="label">${environment}</label>
                  </div>
                  <div class=${cx(styles.inputs, 'field', 'is-grouped')}>
                    <input
                      id=${environment}
                      type="checkbox"
                      name=${environment}
                      class="switch is-info is-rounded"
                      .checked=${value > 0} />
                    <label for=${environment}></label>
                    <input
                      class=${cx(styles.slider, 'slider', 'is-normal')}
                      step="0.05"
                      min="0"
                      max="1"
                      value=${value}
                      type="range" />
                    <span>${value}</span>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>
      `,
  )}`;
}
