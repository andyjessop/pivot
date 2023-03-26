import { LitElement } from 'lit';

export interface ClickOutsideInterface {
  onClickOutside(): void;
}

type Constructor<T = Record<string, any>> = new (...args: any[]) => T;

export const clickOutside = <T extends Constructor<LitElement>>(
  superClass: T,
) => {
  class ClickOutside extends superClass {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(...args: any[]) {
      super();
    }

    onClickOutside() {
      // Do nothing
    }

    closeIfClicked(event: Event) {
      if (!event.composedPath().includes(this)) {
        this.onClickOutside();
      }
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener('click', this.closeIfClicked.bind(this));
    }

    disconnectedCallback() {
      document.removeEventListener('click', this.closeIfClicked.bind(this));
      super.disconnectedCallback();
    }
  }

  return ClickOutside as Constructor<ClickOutsideInterface> & T;
};
