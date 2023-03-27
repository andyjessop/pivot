import { html } from 'lit';

import type { Project } from '@pivot/client-shared-interfaces';
import { card, spaced, typography } from '@pivot/design-css';
import { cx } from '@pivot/util-classname';
import { relativeTime } from '@pivot/util-time';
import { stripProtocol } from '@pivot/util-url';

import deploymentCard from './deployments.module.css';

export function deployments(deploymentsData: Project.Model['deployments']) {
  return html`
    <div class=${cx(spaced.container, spaced.vertical, spaced.small)}>
      ${deploymentsData.map((deployment) => {
        return html`
          <div
            class=${cx(card.container, card.small, deploymentCard.container)}
          >
            <div class=${spaced.container}>
              ${envTag(deployment.environment.name)}

              <a
                href=${deployment.url}
                target="_blank"
                rel="noopener noreferrer"
                ><span>${stripProtocol(deployment.url)}</span>
                <span class="icon is-medium">
                  <i class="las la-external-link-alt"></i> </span
              ></a>

              <span class=${typography.subtitle}
                >${relativeTime(deployment.created_at)}</span
              >

              ${
                deployment.latest
                  ? html`<span class=${cx('tag', 'is-success')}>Latest</span>`
                  : null
              }
            </div>

            <div class=${deploymentCard.actions}>
              <button
                <!-- dispatch('clone-deployment', { id: deployment.uuid }) -->
                class="button is-dark"
              >
                <span class="icon is-medium">
                  <i class="las la-clone"></i>
                </span>

                <span>Clone</span>
              </button>
            </div>
          </div>
        `;
      })}
    </div>
  `;
}

export function envTag(env: string) {
  let tagClass = 'is-link';

  switch (env) {
    case 'production':
      tagClass = 'is-danger';
      break;
    case 'staging':
      tagClass = 'is-warning';
      break;
    case 'preview':
      tagClass = 'is-info';
      break;
    default:
      tagClass = 'is-link';
      break;
  }

  return html`
    <span
      class=${cx(
        tagClass,
        deploymentCard['tag'],
        'tag',
        'is-normal',
        'is-capitalized',
      )}
      >${env}</span
    >
  `;
}
