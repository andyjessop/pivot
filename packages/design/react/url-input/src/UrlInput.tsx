import { tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { splitUrl } from './split-url';
import styles from './url-input.module.css';

interface Props {
  className?: string;
  onBlur: (value: string) => void;
  url: string;
}

export function UrlInput({ className = '', onBlur, url }: Props) {
  const [protocol, rest] = splitUrl(url);

  return (
    <div className={styles.container}>
      <input
        className={cx('input', styles.content, className)}
        defaultValue={rest}
        id="url"
        onBlur={(e) => onBlur(`${protocol}${e.target.value}`)}
        type="url"
      />
      <span className={cx(tag.container, tag.input, styles.prefix)}>{protocol}</span>
    </div>
  );
}
