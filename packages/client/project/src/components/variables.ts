import { html } from 'lit';

import type { Project } from '@pivot/client/shared-interfaces';

import styles from './features.module.css';

export function variables(variablesData: Project.Model['variables']) {
  return html`${variablesData.map(
    (variable) =>
      html`
        <div class=${styles['action-bar']}>
          <div class="control has-addons">
            <button class="button is-dark">
              <span class="icon is-medium"><i class="las la-plus-circle"></i></span>
              <span>Add Variable</span>
            </button>
          </div>
          <div>
            <button class="button is-warning">
              <span class="icon is-medium">
                <i class="las la-redo-alt"></i>
              </span>
              <span>Revert</span>
            </button>
            <button class="button is-success">
              <span class="icon is-medium">
                <i class="las la-check-circle"></i>
              </span>
              <span>Save</span>
            </button>
          </div>
        </div>
        <div class=${styles.entry}>
          <div class=${styles.key}>
            <div class"field">
              <label class="label">Key</label>
              <div class="control has-icons-left">
                <input class="input" type="text" value=${variable.name} />
                <span class="icon is-left">
                  <i class="las la-tags"></i>
                </span>
              </div>
            </div>
              
          </div>
          <div class=${styles.values}>
            ${variable.values.map(
              ({ environment, value }: any) => html`
                <div class="field">
                  <label class="label">${environment}</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" value=${value} />
                    <span class="icon is-left">
                      <i class="las la-key"></i>
                    </span>
                    <span class="icon is-right">
                      <i class="las la-times-circle"></i>
                    </span>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>
        
      `,
  )}`;
}
