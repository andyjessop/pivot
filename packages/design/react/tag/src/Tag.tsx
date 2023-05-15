import { tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

interface Props {
  children: React.ReactNode;
  color?: string;
  type?: 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'success';
}

export function Tag({ children, color, type = 'default' }: Props) {
  return (
    <span
      className={cx(tag.container, (tag as any)[type])}
      style={{
        backgroundColor: color,
      }}>
      {children}
    </span>
  );
}
