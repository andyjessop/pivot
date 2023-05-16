import { Suspense } from 'react';

import { Breadcrumb } from '@pivot/client/breadcrumb';
import { Navbar, UserNav } from '@pivot/client/components';
import { animate, horizontalLeftContent as layout } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectAuth } from '~app/modules/auth';
import { selectBreadcrumbParts } from '~app/modules/breadcrumb';

import logo from '../../assets/logo.png';

import styles from './root.module.css';
interface Props {
  Outlet: JSX.Element;
}

export default function Root({ Outlet }: Props) {
  const router = useService('router');
  const auth = useService('auth');
  const head = useService('head');

  const breadcrumbParts = useSelector(selectBreadcrumbParts);
  const authState = useSelector(selectAuth);
  const shouldShowNavs = !authState.isChecking;

  if (!router || !auth || !head) {
    return null;
  }

  /**
   * Fallback blank screen.
   */
  const PageFallback = <div className={cx(layout.subheader, styles.subheader)}></div>;

  /**
   * Main navigation component.
   */
  const LeftNav = shouldShowNavs ? (
    <span className={cx(animate.element, animate['fade-in'])}>
      <Breadcrumb Link={router.Link} parts={breadcrumbParts} />
    </span>
  ) : null;

  const Logo = (
    <img
      className={cx(styles.logo, animate.element, animate['flip-in-x'])}
      height="35"
      src={logo}
      width="35"
    />
  );

  /**
   * User login component.
   */
  const RightNav = shouldShowNavs ? (
    <span className={cx(animate.element, animate['fade-in'])}>
      <UserNav actions={auth} data={authState} />
    </span>
  ) : null;

  return (
    <div className={cx(layout.container, styles.content)}>
      <div className={cx(layout.top, styles.header)}>
        <Navbar LeftNav={LeftNav} Logo={Logo} RightNav={RightNav} />
      </div>
      <Suspense fallback={PageFallback}>{Outlet}</Suspense>
    </div>
  );
}
