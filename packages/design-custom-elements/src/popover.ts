import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';

import { cx } from '@pivot/util-classname';

import { clickOutside } from './mixins/click-outside';

export class PivotPopover extends clickOutside(LitElement) {
  @property({ type: String })
  placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: String })
  trigger: 'click' | 'hover' = 'click';

  @property({ type: Number })
  'open-delay' = 0;

  @property({ type: Number })
  'close-delay' = 0;

  @state()
  private state: 'closed' | 'opening' | 'open' | 'closing' = 'closed';

  @state()
  private open = false;

  static styles = css`
    .container {
      position: relative;
      height: fit-content;
      width: fit-content;
      padding: var(--pivot-popover-gap, 1rem);
    }

    .content {
      position: absolute;
      display: block;
    }

    .content.hidden {
      display: none;
    }

    .content.right {
      left: 100%;
      bottom: 50%;
      transform: translateY(50%);
    }

    .content.left {
      right: 100%;
      bottom: 50%;
      transform: translateY(50%);
    }

    .content.top {
      bottom: 100%;
      right: 50%;
      transform: translateX(50%);
    }

    .content.bottom,
    .arrow.bottom {
      top: 100%;
      right: 50%;
      transform: translateX(50%);
    }
  `;

  private getNextState() {
    return {
      open: {},
    };
  }

  onToggle() {
    this.open = !this.open;
  }

  onOpen() {
    this.open = true;
  }

  onClose() {
    this.open = false;
  }

  onClickOutside() {
    this.onClose();
  }

  render() {
    return html`<div class="container">
      ${this.trigger === 'click'
        ? html` <slot
            name="trigger"
            @click=${this.onToggle}
            @focus=${this.onOpen}
            @blur=${this.onClose}
          >
          </slot>`
        : null}
      ${this.trigger === 'hover'
        ? html` <slot
            name="trigger"
            @mouseenter=${this.onOpen}
            @mouseleave=${this.onClose}
            @focus=${this.onOpen}
            @blur=${this.onClose}
          ></slot>`
        : null}
      <slot
        name="content"
        class=${cx('content', this.placement, !this.open ? 'hidden' : '')}
        @close-popover=${this.onClose}
      ></slot>
    </div>`;
  }
}

customElements.define('pv-popover', PivotPopover);
