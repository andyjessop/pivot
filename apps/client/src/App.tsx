import { Suspense } from 'react';

import { horizontalLeftContent as layout } from '@pivot/design/css';

import logo from '~assets/react.svg';
import { selectNavItems } from '~selectors/main-nav';
import { selectRouteName } from '~selectors/router';
import { useService } from '~services';
import { useSelector } from '~store';

import { routes } from './routes';
import { MainNav } from './widgets/main-nav/MainNav';
import { Navbar } from './widgets/navbar/Navbar';

export function App() {
  const router = useService('router');

  const name = useSelector(selectRouteName) as keyof typeof routes;
  const navItems = useSelector(selectNavItems);

  if (!router || !name) {
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
  const Nav = <MainNav items={navItems} link={router.link} />;

  return (
    <div className={layout.container}>
      <div className={layout.top}>
        <Navbar Logo={Logo} LeftNav={Nav} RightNav={<></>} />
      </div>
      <Suspense>
        <PageContent />
      </Suspense>
    </div>
  );
}
