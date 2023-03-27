import { html, render } from 'lit-html';

import { cx } from '@pivot/util/classname';

import { features as featuresComponent } from '../components/features';
import { variables as variablesComponent } from '../components/variables';
import { Model, Service } from '../types';

export function createDeploymentModalView(root: HTMLElement) {
  return function template(data: Model, actions: Service) {
    const { clearPendingDeployment } = actions;

    render(template(), root);

    function template() {
      if (!data) return html``;

      const { environmentId, environments, features, variables } = data;

      return html`
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <h4 class="modal-card-title">New Deployment</h4>
              <button
                class="delete"
                aria-label="close"
                @click=${clearPendingDeployment}
              ></button>
            </header>
            <section class="modal-card-body">
              <h4 class="is-size-6 has-text-weight-semibold mb-2">Release</h4>
              <!-- compactRelease(release) -->
              <h4 class="is-size-6 has-text-weight-semibold mb-2">
                Environment
              </h4>
              <div class="select">
                <select>
                  ${environments.map(
                    (env) =>
                      html`<option
                        value=${env.uuid}
                        ?selected=${env.uuid === environmentId}
                      >
                        ${env.name}
                      </option>`,
                  )}
                </select>
              </div>
              <h4 class="is-size-6 has-text-weight-semibold mb-2 mt-4">
                Feature Overrides
              </h4>
              ${featuresComponent(features as any)}
              <h4 class="is-size-6 has-text-weight-semibold mb-2">
                Variable Overrides
              </h4>
              ${variablesComponent(variables as any)}
            </section>
            <footer class="modal-card-foot">
              <div class="buttons is-right">
                <button class=${cx('button', 'is-dark', 'is-loading')}>
                  <span class="icon is-medium">
                    <i class="las la-arrow-circle-up"></i>
                  </span>
                  <span>Deploy</span>
                </button>
                <button class="button" @click=${clearPendingDeployment}>
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        </div>
      `;
    }
  };
}
