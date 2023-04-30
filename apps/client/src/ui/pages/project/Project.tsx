import { Suspense } from 'react';

import { horizontalLeftContent as layout, spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectRouteName } from '~app/modules/router';

import appStyles from '../../app.module.css';

import { PendingDeployment } from './PendingDeployment';
import styles from './project.module.css';
import { routeComponents } from './route-components';
import { selectSubheaderItems } from './subheader/subheader.selectors';
import { SubNav } from './subheader/SubNav';

export default function Project() {
  const router = useService('router');
  const subheaderItems = useSelector(selectSubheaderItems);

  const name = useSelector(selectRouteName) as keyof typeof routeComponents;

  if (!router) {
    return null;
  }

  const PageContent = routeComponents[name] ?? (() => <></>);

  return (
    <>
      <div
        className={cx(
          layout.subheader,
          appStyles.subheader,
          styles.subheader,
          spaced.container,
          spaced.large,
        )}>
        <SubNav items={subheaderItems} Link={router.Link} />
      </div>
      <div className={cx(layout.content, styles.container)}>
        <div className={styles.info}></div>
        <div className={styles.content}>
          <Suspense>
            <PageContent />
          </Suspense>
        </div>
      </div>
      <PendingDeployment />
    </>
  );
}
