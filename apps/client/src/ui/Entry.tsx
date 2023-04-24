import '@pivot/design/variables';
import './entry.css';

import { Suspense } from 'react';

import { Breadcrumb } from '@pivot/client/breadcrumb';
import { Navbar, UserNav } from '@pivot/client/components';
import { horizontalLeftContent as layout } from '@pivot/design/css';
import { Loader } from '@pivot/design/react/loader';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectAuth } from '~app/modules/auth';
import { selectBreadcrumbParts } from '~app/modules/breadcrumb';
import { selectRouteName } from '~app/modules/router';

import styles from './app.module.css';
import { routeComponents } from './route-components';

export default function Entry() {
  const router = useService('router');
  const auth = useService('auth');
  const head = useService('head');

  const name = useSelector(selectRouteName) as keyof typeof routeComponents;
  const breadcrumbParts = useSelector(selectBreadcrumbParts);
  const authState = useSelector(selectAuth);

  if (!router || !auth || !head || !name) {
    return null;
  }

  /**
   * Lazy-loaded route handler component.
   */
  const PageContent = routeComponents[name] ?? routeComponents['404'];

  /**
   * Fallback blank screen.
   */
  const PageFallback = (
    <div className={cx(layout.subheader, styles.subheader)}></div>
  );

  /**
   * Main navigation component.
   */
  const LeftNav = (
    <>
      {breadcrumbParts.length ? (
        <Breadcrumb link={router.link} parts={breadcrumbParts} />
      ) : (
        <Loader />
      )}
    </>
  );

  /**
   * User login component.
   */
  const RightNav = <UserNav actions={auth} data={authState} />;

  return (
    <div className={cx(layout.container, styles.content)}>
      <div className={cx(layout.top, styles.header)}>
        <Navbar LeftNav={LeftNav} RightNav={RightNav} />
      </div>
      <Suspense fallback={PageFallback}>
        <PageContent />
      </Suspense>
    </div>
  );
}
