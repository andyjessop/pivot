import { html, render } from 'lit';

import { Service, State } from '../types';

export function view(root: HTMLElement) {
  return function renderAuth(data: State, actions: Service): void {
    render(auth(data), root);

    function auth(data: State) {
      if (data.isLoading) {
        return html`<div>Loading...</div>`;
      }

      if (data.isLoggingIn) {
        return html`<div>Logging in.</div>`;
      }

      if (data.user) {
        return html`<div>Logged in.</div>`;
      }

      return html`<div>
        <form @submit=${login}>
          <div class="field is-grouped">
            <div class="control">
              <input class="input" type="email" placeholder="Email" />
            </div>
            <div class="control">
              <input class="input" type="password" placeholder="Password" />
            </div>
            <div class="control">
              <button class="button is-link" type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>`;
    }

    function login(event: Event) {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const email = form.elements[0] as HTMLInputElement;
      const password = form.elements[1] as HTMLInputElement;

      actions.login(email.value, password.value);
    }
  };
}
