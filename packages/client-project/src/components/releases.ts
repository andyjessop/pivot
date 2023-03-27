import { html } from 'lit';

import type { Project } from '@pivot/client-shared-interfaces';

import { release } from './release';

export function releases(releasesData: Project.Model['releases']) {
  return html`${releasesData.map((releaseData) => release(releaseData))}`;
}
