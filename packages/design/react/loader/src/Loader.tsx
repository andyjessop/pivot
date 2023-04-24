import { icon, spin } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

export function Loader() {
  return <div className={cx(spin.container, icon.spinner)}></div>;
}
