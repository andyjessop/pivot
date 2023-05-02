import { alignment, icon, spaced } from '@pivot/design/css';
import { Link, RouterConfig } from '@pivot/lib/router';
import { cx } from '@pivot/util/classname';

import { Part } from '../types';

import style from './breadcrumb.module.css';

interface BreadcrumbProps<T extends RouterConfig> {
  Link: Link<T>;
  parts: Part<T>[];
}
export function Breadcrumb<T extends RouterConfig>({ Link, parts }: BreadcrumbProps<T>) {
  return (
    <div className={cx(spaced.container, spaced.small, alignment['center-vertical'])}>
      <Link className={style.root} to={{ name: 'root' }}>
        <span className={cx(style.icon, icon.home)}></span>
      </Link>
      {parts.map((part, ndx) => (
        <div
          className={cx(
            style.container,
            spaced.container,
            spaced.small,
            alignment['center-vertical'],
          )}
          key={part.text}>
          <Link
            className={cx(style.link, {
              [style.active]: ndx === parts.length - 1,
            })}
            to={{ name: part.route.name, params: part.route.params }}>
            {part.text}
          </Link>
          {ndx < parts.length - 1 ? (
            <span className={cx(style.icon, icon.angleRight)}></span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
