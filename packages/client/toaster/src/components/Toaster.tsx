import { animate, button, icon, iconStyles, typography } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { Entry } from '../types';

import style from './toaster.module.css';

interface Props {
  entries: Entry[];
  remove: (id: string) => void;
}

export function Toaster({ entries, remove }: Props) {
  return (
    <section className={style.container}>
      {entries.map((entry) => (
        <output
          className={cx(
            style.entry,
            style[entry.type ?? 'info'],
            animate.element,
            animate['fade-in-right'],
          )}
          key={entry.id}
          role="status">
          <div className={style.text}>
            <div className={cx(typography.heading, typography.h5)}>{entry.title}</div>
            <div>{entry.content}</div>
          </div>
          <button
            aria-label="close"
            className={cx(button.base, button.icon, button.small)}
            onClick={() => remove(entry.id)}>
            <span className={iconStyles.base}>
              <i className={icon.close}></i>
            </span>
          </button>
        </output>
      ))}
    </section>
  );
}
