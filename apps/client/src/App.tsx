import { Suspense } from 'react';

import { UserNav } from '@pivot/client/auth';
import { MainNav, Navbar } from '@pivot/client/components';
import { horizontalLeftContent as layout } from '@pivot/design/css';

import logo from '~assets/react.svg';
import { selectAuth } from '~modules/auth/auth.selectors';
import { selectNavItems } from '~modules/nav/main-nav.selectors';
import { selectRouteName } from '~modules/router/router.selectors';
import { useService } from '~services';
import { useSelector } from '~store';

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
  const Logo = <img width="50" height="50" src={logo} alt="Pivot" />;

  /**
   * Main navigation component.
   */
  const LeftNav = <MainNav items={navItems} link={router.link} />;

  /**
   * User login component.
   */
  const RightNav = <UserNav actions={auth} data={authState} />;

  return (
    <div className={layout.container}>
      <div className={layout.top}>
        <Navbar Logo={Logo} LeftNav={LeftNav} RightNav={RightNav} />
      </div>
      <Suspense>
        <PageContent />
      </Suspense>
    </div>
  );
}
