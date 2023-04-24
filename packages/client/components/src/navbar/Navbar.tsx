import { cx } from '@pivot/util/classname';

import styles from './navbar.module.css';

interface NavbarProps {
  LeftNav: JSX.Element;
  RightNav: JSX.Element;
}

export function Navbar({ LeftNav, RightNav }: NavbarProps) {
  return (
    <nav className={cx('navbar', styles.container)} role="navigation">
      <div id="main-nav" className="navbar-menu">
        <div className="navbar-start">{LeftNav}</div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">{RightNav}</div>
      </div>
    </nav>
  );
}
