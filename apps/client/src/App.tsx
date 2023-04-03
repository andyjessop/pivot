import { Suspense } from 'react';

import { selectAuth } from '@pivot/client/auth';
import { MainNav, Navbar, UserNav } from '@pivot/client/components';
import { selectNavItems } from '@pivot/client/nav';
import { selectRouteName } from '@pivot/client/router';
import { horizontalLeftContent as layout } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import logo from '~assets/react.svg';

import styles from './app.module.css';
import { routes } from './routes';

export function App() {
  const router = useService('router');
  const auth = useService('auth');

  const name = useSelector(selectRouteName) as keyof typeof routes;
  const navItems = useSelector(selectNavItems);
  const authState = useSelector(selectAuth);

  if (!router || !auth || !name) {
    return null;
  }

  /**
   * Lazy-loaded route handler component.
   */
  const PageContent = routes[name] ?? routes['404'];

  /**
   * Logo component.
   */
  const Logo = <img width="25" height="25" src={logo} alt="Pivot" />;

  /**
   * Main navigation component.
   */
  const LeftNav = <MainNav items={navItems} link={router.link} />;

  /**
   * User login component.
   */
  const RightNav = <UserNav actions={auth} data={authState} />;

  return (
    <div className={cx(layout.container, styles.content)}>
      <div className={cx(layout.top, styles.header)}>
        <Navbar Logo={Logo} LeftNav={LeftNav} RightNav={RightNav} />
      </div>
      <Suspense>
        <PageContent />
      </Suspense>
    </div>
  );
}
