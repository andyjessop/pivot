import { icon, spin } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

export function TitleLoader() {
  return <div className={cx(spin.container, icon.spinner)}></div>;
}
