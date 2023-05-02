import { NavItem } from '@pivot/client/nav';
import { cx } from '@pivot/util/classname';

import { Link, Routes } from '~app/modules/router/router.types';

import styles from './main-nav.module.css';

interface NavbarProps {
  Link: Link;
  items: NavItem<Routes>[];
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
