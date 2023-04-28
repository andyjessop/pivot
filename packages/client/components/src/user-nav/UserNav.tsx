import { FormEvent } from 'react';

import { Service, State } from '@pivot/client/auth';
import { button, spaced } from '@pivot/design/css';

import styles from './user-nav.module.css';

interface UserNavProps {
  data: State;
  actions: Service;
}

export function UserNav({ actions, data }: UserNavProps) {
  const { login, logout } = actions;
  const { isChecking, isLoggingIn, isLoggingOut, user } = data;

  if (isChecking) {
    return <div>Checking user...</div>;
  }

  if (isLoggingIn) {
    return <div>Logging in...</div>;
  }

  if (user) {
    return (
      <div className={spaced.container}>
        <span className={styles.text}>
          {isLoggingOut ? 'Logging out...' : user.email}
        </span>
        <button className={button.base} onClick={logout}>
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
            <button className={button.base} type="submit">
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
