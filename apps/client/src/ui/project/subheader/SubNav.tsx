import { animate, spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { Link } from '~app/modules/router/router.types';

import { SubheaderItems } from './subheader.selectors';
import styles from './subnav.module.css';

export function SubNav({ items, Link }: { Link: Link; items: SubheaderItems }) {
  return (
    <>
      {items.map((item) => (
        <Link
          className={cx(
            spaced.container,
            spaced.small,
            styles.link,
            animate.element,
            animate['fade-in'],
            animate.slow,
            {
              [styles.active]: item.isActive,
            },
          )}
          key={item.text}
          to={{ name: item.routeName, params: item.routeParams }}>
          <span className={cx(item.icon, styles.icon)}></span>
          {item.text}
        </Link>
      ))}
    </>
  );
}
