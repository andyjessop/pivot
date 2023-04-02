import { FormEvent } from 'react';

import { spaced } from '@pivot/design/css';

import { Service, State } from './types';

interface UserNavProps {
  data: State;
  actions: Service;
}

export function UserNav({ actions, data }: UserNavProps) {
  const { login, logout } = actions;

  if (data.isChecking) {
    return <div>Checking user...</div>;
  }

  if (data.isLoggingIn) {
    return <div>Logging in...</div>;
  }

  if (data.user) {
    return (
      <div className={spaced.container}>
        <span>{data.isLoggingOut ? 'Logging out...' : data.user.email}</span>
        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
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

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.elements[0] as HTMLInputElement;
    const password = form.elements[1] as HTMLInputElement;

    login(email.value, password.value);
  }
}
