import { horizontalLeftContent as layout, spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';

import { PendingDeployment } from '../pending-deployment/PendingDeployment';
import rootStyles from '../root/root.module.css';

import styles from './project.module.css';
import { selectSubheaderItems } from './subheader/subheader.selectors';
import { SubNav } from './subheader/SubNav';

interface Props {
  Outlet: JSX.Element;
}

export default function Project({ Outlet }: Props) {
  const router = useService('router');
  const subheaderItems = useSelector(selectSubheaderItems);

  if (!router) {
    return null;
  }

  return (
    <>
      <div
        className={cx(
          layout.subheader,
          rootStyles.subheader,
          styles.subheader,
          spaced.container,
          spaced.large,
        )}>
        <SubNav Link={router.Link} items={subheaderItems} />
      </div>
      <div className={cx(layout.content, styles.container)}>
        <div className={styles.info}></div>
        <div className={styles.content}>{Outlet}</div>
      </div>
      <PendingDeployment />
    </>
  );
}
