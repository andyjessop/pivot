import '@pivot/design/variables';
import './entry.css';

import { Suspense } from 'react';

import { MainNav, Navbar, UserNav } from '@pivot/client/components';
import { horizontalLeftContent as layout } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectAuth } from '~app/modules/auth';
import { selectNavItems } from '~app/modules/nav';
import { selectRouteName } from '~app/modules/router';
import logo from '~assets/react.svg';

import styles from './app.module.css';
import { routeComponents } from './route-components';

export default function Entry() {
  const router = useService('router');
  const auth = useService('auth');
  const head = useService('head');

  const name = useSelector(selectRouteName) as keyof typeof routeComponents;
  const navItems = useSelector(selectNavItems);
  const authState = useSelector(selectAuth);

  if (!router || !auth || !head || !name) {
    return null;
  }

  /**
   * Lazy-loaded route handler component.
   */
  const PageContent = routeComponents[name] ?? routeComponents['404'];

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
