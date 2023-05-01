import { cx } from '@pivot/util/classname';

import styles from './navbar.module.css';

interface NavbarProps {
  LeftNav: JSX.Element;
  RightNav: JSX.Element;
}

export function Navbar({ LeftNav, RightNav }: NavbarProps) {
  return (
    <nav className={cx('navbar', styles.container)} role="navigation">
      <div className="navbar-menu" id="main-nav">
        <div className="navbar-start">{LeftNav}</div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">{RightNav}</div>
      </div>
    </nav>
  );
}
