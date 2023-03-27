import { cx } from '@pivot/util/classname';

import styles from './navbar.module.css';

interface NavbarProps {
  LeftNav: JSX.Element;
  Logo: JSX.Element;
  RightNav: JSX.Element;
}

export function Navbar({ LeftNav, Logo, RightNav }: NavbarProps) {
  return (
    <nav className={cx('navbar', styles.container)} role="navigation">
      <div className="navbar-brand">
        <a href="/" className={styles.logo}>
          {Logo}
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="main-nav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="main-nav" className="navbar-menu">
        <div className="navbar-start">{LeftNav}</div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">{RightNav}</div>
      </div>
    </nav>
  );
}
