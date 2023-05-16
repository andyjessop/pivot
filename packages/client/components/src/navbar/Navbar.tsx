import { cx } from '@pivot/util/classname';

import styles from './navbar.module.css';

interface NavbarProps {
  LeftNav: JSX.Element | null;
  Logo: JSX.Element;
  RightNav: JSX.Element | null;
}

export function Navbar({ LeftNav, Logo, RightNav }: NavbarProps) {
  return (
    <nav className={cx('navbar', styles.container)} role="navigation">
      <div className={styles.box} id="main-nav">
        <div className="navbar-start">{LeftNav}</div>
      </div>

      <div className={styles.box}>{Logo}</div>

      <div className={styles.box}>
        <div className="navbar-item">{RightNav}</div>
      </div>
    </nav>
  );
}
