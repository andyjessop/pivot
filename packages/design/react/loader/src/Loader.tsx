import { icon, spin } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

interface Props {
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ size }: Props) {
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
      className={cx(spin.container, icon.spinner)}
      style={{
        fontSize,
      }}></div>
  );
}
