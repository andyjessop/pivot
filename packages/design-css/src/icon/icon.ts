import { cx } from '@pivot/util-classname';
import { html } from 'lit';

const icons = {
  bell: 'las la-bell',
  'check-circle': 'las la-check-circle',
  clone: 'las la-clone',
  deploy: 'las la-cloud-upload-alt',
  mountain: 'las la-mountain',
  plus: 'las la-plus',
  'plus-circle': 'las la-plus-circle',
  projects: 'las la-cubes',
  'shipping-fast': 'las la-shipping-fast',
  spinner: 'las la-spinner',
  stream: 'las la-stream',
  tasks: 'las la-tasks',
  'times-circle': 'las la-times-circle',
  user: 'las la-user',
} as Record<string, string>;

export function icon(type: string, classname?: string) {
  return html`<i class="${cx(icons[type], classname)}"></i>`;
}
