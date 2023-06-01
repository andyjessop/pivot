import { cx } from '@pivot/util/classname';

import style from './footer.module.css';

interface Props {
  className?: string;
}
export function Footer({ className }: Props) {
  return <div className={cx(className, style.container)}></div>;
}
