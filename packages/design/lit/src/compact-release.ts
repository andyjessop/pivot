import { html } from 'lit-html';

import { Project } from '@pivot/client/shared-interfaces';
import { card } from '@pivot/design/css';

import { date } from './date';
import { link } from './link';
import { tag } from './tag';

export function compactRelease(releaseData: Project.Release) {
  return html`<div class=${card.container}>
    ${tag(releaseData.commit_url, releaseData.hash)}
    ${link(releaseData.commit_url, releaseData.commit_message)} ${date(releaseData.created_at)}
  </div>`;
}
