import { html } from 'lit-html';

import styles from './link.module.css';

export function link(url: string, text: string) {
  return html`<a
    href=${url}
    class=${styles.message}
    target="_blank"
    rel="noopener noreferrer"
  >
    ${text}
  </a>`;
}
