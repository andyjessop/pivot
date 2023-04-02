import { Router } from '@pivot/client/router';
import { cx } from '@pivot/util/classname';

import styles from './main-nav.module.css';
import { NavItem } from './types';

interface NavbarProps {
  items: NavItem[];
  link: Router['link'];
}

export function MainNav({ items, link }: NavbarProps) {
  return (
    <nav role="navigation" aria-label="main navigation">
      <ul className={styles.nav}>
        {items.map((item) => (
          <li
            className={cx({ [styles.active]: item.active }, styles.item)}
            key={item.text}
          >
            <a href="#" onClick={link({ name: item.route })}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
