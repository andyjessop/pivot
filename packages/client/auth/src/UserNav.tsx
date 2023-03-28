import { FormEvent } from 'react';

import { Service, State } from './types';

interface UserNavProps {
  data: State;
  actions: Service;
}

export function UserNav({ actions, data }: UserNavProps) {
  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.isLoggingIn) {
    return <div>Logging in.</div>;
  }

  if (data.user) {
    return <div>Logged in.</div>;
  }

  return (
    <div>
      <form onSubmit={login}>
        <div className="field is-grouped">
          <div className="control">
            <input className="input" type="email" placeholder="Email" />
          </div>
          <div className="control">
            <input className="input" type="password" placeholder="Password" />
          </div>
          <div className="control">
            <button className="button is-link" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.elements[0] as HTMLInputElement;
    const password = form.elements[1] as HTMLInputElement;

    actions.login(email.value, password.value);
  }
}
