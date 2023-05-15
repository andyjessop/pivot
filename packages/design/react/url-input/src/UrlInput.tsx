import { tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { splitUrl } from './split-url';
import styles from './url-input.module.css';

interface Props {
  className?: string;
  onChange: (value: string) => void;
  url: string;
}

export function UrlInput({ className = '', onChange, url }: Props) {
  const [protocol, rest] = splitUrl(url);

  return (
    <div className={styles.container}>
      <input
        className={cx('input', styles.content, className)}
        id="url"
        onChange={(e) => onChange(`${protocol}${e.target.value}`)}
        type="url"
        value={rest}
      />
      <span className={cx(tag.container, tag.input, styles.prefix)}>{protocol}</span>
    </div>
  );
}
