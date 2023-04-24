import { Router } from '@pivot/client/router';
import { spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { SubheaderItems } from './subheader.selectors';
import styles from './subnav.module.css';

export function SubNav({
  items,
  Link,
}: {
  items: SubheaderItems;
  Link: Router['Link'];
}) {
  return (
    <>
      {items.map((item) => (
        <Link
          className={cx(spaced.container, spaced.small, styles.link, {
            [styles.active]: item.isActive,
          })}
          key={item.text}
          to={{ name: item.routeName, params: item.routeParams }}
        >
          <span className={cx(item.icon, styles.icon)}></span>
          {item.text}
        </Link>
      ))}
    </>
  );
}
