import { Router } from '@pivot/client/router';
import { alignment, icon, spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { Part } from '../types';

import style from './breadcrumb.module.css';

interface BreadcrumbProps {
  Link: Router['Link'];
  parts: Part[];
}
export function Breadcrumb({ Link, parts }: BreadcrumbProps) {
  return (
    <div className={cx(spaced.container, spaced.small, alignment['center-vertical'])}>
      <Link className={style.root} to={{ name: 'root' }}>
        <span className={cx(style.icon, icon.home)}></span>
      </Link>
      {parts.map((part, ndx) => (
        <div
          key={part.text}
          className={cx(
            style.container,
            spaced.container,
            spaced.small,
            alignment['center-vertical'],
          )}>
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
