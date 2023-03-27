import { card } from '@crux/design/styles';
import { Project } from '@crux/interfaces';
import { html, render as renderLit } from 'lit';

import { cx } from '@pivot/util-classname';

import { deployments } from '../components/deployments';
import { features } from '../components/features';
import { releases } from '../components/releases';
import { variables } from '../components/variables';
import { ProjectViewData } from '../selectors/project-view-data';

import styles from './view.module.css';

export function view(root: HTMLElement) {
  return function render(
    data: ProjectViewData,
    actions: Project.Service,
  ): void {
    const { cloneDeployment } = actions;

    renderLit(template(), root);

    function navigate(to: string) {
      actions.setCurrentNavItem(to);
    }

    function onCloneDeployment({ detail: { id } }: CustomEvent) {
      cloneDeployment(id);
    }

    function template() {
      const { project, ui } = data;

      if (!project) {
        return html`<div class="full-page">
          <span class="loader"></span>
        </div>`;
      }

      return html`
        <div class=${styles.container} @clone-deployment=${onCloneDeployment}>
          <aside class=${cx(styles.nav, card.container, 'menu')}>
            <ul class="menu-list">
              ${[
                'Deployments',
                'Releases',
                'Features',
                'Variables',
                'Environments',
              ].map(
                (item) => html`
                  <li>
                    <a
                      href="#"
                      @click=${() => navigate(item)}
                      class=${cx({ 'is-active': ui.currentNavItem === item })}
                      >${item}</a
                    >
                  </li>
                `,
              )}
            </ul>
          </aside>

          <main class="content">
            ${ui.currentNavItem === 'Deployments' && project.deployments
              ? deployments(project.deployments)
              : null}
            ${ui.currentNavItem === 'Releases' && project.releases
              ? releases(project.releases)
              : null}
            ${ui.currentNavItem === 'Features' && project.features
              ? features(project.features)
              : null}
            ${ui.currentNavItem === 'Variables' && project.variables
              ? variables(project.variables)
              : null}
          </main>
        </div>
      `;
    }
  };
}
