import { Router } from '@pivot/client/router';
import { cx } from '@pivot/util/classname';

import styles from './main-nav.module.css';
import { NavItem } from './types';

interface NavbarProps {
  items: NavItem[];
  Link: Router['Link'];
}

export function MainNav({ items, Link }: NavbarProps) {
  return (
    <nav role="navigation" aria-label="main navigation">
      <ul className={styles.nav}>
        {items.map((item) => (
          <li
            className={cx({ [styles.active]: item.active }, styles.item)}
            key={item.text}>
            <Link to={{ name: item.route }}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
