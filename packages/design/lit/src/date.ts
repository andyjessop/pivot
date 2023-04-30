import { html } from 'lit-html';

import { cx } from '@pivot/util/classname';
import { relativeTime } from '@pivot/util/time';

export function date(str: string) {
  html`
    <span
      class=${cx(
        'is-size-7',
        'has-text-weight-bold',
        'has-text-grey-light',
        'is-capitalized',
      )}>
      ${relativeTime(str)}
    </span>
  `;
}
