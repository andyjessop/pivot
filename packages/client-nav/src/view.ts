import { html, render } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { Router } from '@pivot/client-router';
import { icon } from '@pivot/design-css';
import { cx } from '@pivot/util-classname';

import type { NavItem } from './types';
import styles from './view.module.css';

export function navView(root: HTMLElement) {
  return function nav(items: NavItem[], actions: Router): void {
    const { link } = actions;

    render(template(items), root);

    function template(items: NavItem[]) {
      const listItems = repeat(
        items,
        (item) => item.route,
        (item) =>
          html`<li class=${cx({ active: item.active }, styles.item)}>
            <a href="#" @click=${link({ name: item.route })}>
              ${item.icon && icon(item.icon)} ${item.text}</a
            >
          </li>`,
      );

      return html`<ul class=${styles.nav}>
        ${listItems}
      </ul>`;
    }
  };
}
