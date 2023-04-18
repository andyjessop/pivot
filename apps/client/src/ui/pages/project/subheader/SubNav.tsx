import { Router } from '@pivot/client/router';
import { spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { SubheaderItems } from './subheader.selectors';
import styles from './subnav.module.css';

export function SubNav({
  items,
  link,
}: {
  items: SubheaderItems;
  link: Router['link'];
}) {
  return (
    <>
      {items.map((item) => (
        <a
          className={cx(spaced.container, spaced.small, styles.link, {
            [styles.active]: item.isActive,
          })}
          href="#"
          key={item.text}
          onClick={link({ name: item.routeName, params: item.routeParams })}
        >
          <span className={cx(item.icon, styles.icon)}></span>
          {item.text}
        </a>
      ))}
    </>
  );
}
