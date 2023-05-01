import { Suspense } from 'react';

import { Breadcrumb } from '@pivot/client/breadcrumb';
import { Navbar, UserNav } from '@pivot/client/components';
import { horizontalLeftContent as layout } from '@pivot/design/css';
import { Loader } from '@pivot/design/react/loader';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectAuth } from '~app/modules/auth';
import { selectBreadcrumbParts } from '~app/modules/breadcrumb';

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
  const LeftNav = (
    <>
      {breadcrumbParts.length ? (
        <Breadcrumb Link={router.Link} parts={breadcrumbParts} />
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
      <Suspense fallback={PageFallback}>{Outlet}</Suspense>
    </div>
  );
}
