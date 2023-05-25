import { cx } from '@pivot/util/classname';

import style from './footer.module.css';

interface Props {
  Notifications: JSX.Element;
  className?: string;
}
export function Footer({ className, Notifications }: Props) {
  return <div className={cx(className, style.container)}>{Notifications}</div>;
}
