import { skeleton } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import styles from './title-skeleton.module.css';

export function TitleSkeleton() {
  return (
    <div className={cx(skeleton.container, skeleton.active, styles.container)}>
      <div className={skeleton.item}></div>
    </div>
  );
}
