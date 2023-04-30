import { html } from 'lit-html';

import { cx } from '@pivot/util/classname';

import styles from './tag.module.css';

export function tag(url: string, text: string) {
  return html`<a
    href=${url}
    class=${styles.link}
    target="_blank"
    rel="noopener noreferrer">
    <span class=${cx('is-info', styles.tag, 'tag', 'is-normal')}>
      <span class="icon"> <i class="las la-code-branch"></i> </span
      ><span>${text}</span>
    </span>
  </a>`;
}
