import { html } from 'lit-html';

import type { Project } from '@pivot/client/shared-interfaces';
import { date, link, tag } from '@pivot/design/lit';

import styles from './releases.module.css';

export function release(releaseData: Project.Release) {
  return html` <div class=${styles['card']}>
    ${tag(releaseData.commit_url, releaseData.hash)}
    ${link(releaseData.commit_url, releaseData.commit_message)}
    ${date(releaseData.created_at)}

    <div class=${styles.actions}>
      <button class="button is-dark">
        <span class="icon is-medium">
          <i class="las la-arrow-circle-up"></i>
        </span>
        <span>Deploy</span>
      </button>
    </div>
  </div>`;
}
