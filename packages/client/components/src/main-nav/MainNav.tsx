import { Router } from '@pivot/client/router';
import { cx } from '@pivot/util/classname';

import styles from './main-nav.module.css';
import { NavItem } from './types';

interface NavbarProps {
  Link: Router['Link'];
  items: NavItem[];
}

export function MainNav({ items, Link }: NavbarProps) {
  return (
    <nav aria-label="main navigation" role="navigation">
      <ul className={styles.nav}>
        {items.map((item) => (
          <li className={cx({ [styles.active]: item.active }, styles.item)} key={item.text}>
            <Link to={{ name: item.route }}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
