import { animate, icon, spin } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

interface Props {
  delay?: number;
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ delay = 0, size }: Props) {
  let fontSize = '100%';

  switch (size) {
    case 'small':
      fontSize = '100%';
      break;
    case 'medium':
      fontSize = '150%';
      break;
    case 'large':
      fontSize = '200%';
      break;
    default:
      fontSize = '100%';
  }

  return (
    <div
      className={cx(animate.element, animate['fade-in'])}
      style={{
        ['--animate-delay' as any]: `${delay}ms`,
        fontSize,
      }}>
      <div className={cx(spin.container, icon.spinner)}></div>
    </div>
  );
}
