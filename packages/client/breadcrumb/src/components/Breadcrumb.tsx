import { Router } from '@pivot/client/router';
import { alignment, icon, spaced } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { Part } from '../types';

import style from './breadcrumb.module.css';

interface BreadcrumbProps {
  link: Router['link'];
  parts: Part[];
}
export function Breadcrumb({ link, parts }: BreadcrumbProps) {
  return (
    <div
      className={cx(
        spaced.container,
        spaced.small,
        alignment['center-vertical'],
      )}
    >
      <a href="" className={style.home} onClick={link({ name: 'home' })}>
        <span className={cx(style.icon, icon.home)}></span>
      </a>
      {parts.map((part, ndx) => (
        <div
          key={part.text}
          className={cx(
            style.container,
            spaced.container,
            spaced.small,
            alignment['center-vertical'],
          )}
        >
          <a
            href=""
            className={cx(style.link, {
              [style.active]: ndx === parts.length - 1,
            })}
            onClick={link({ name: part.route.name, params: part.route.params })}
          >
            {part.text}
          </a>
          {ndx < parts.length - 1 ? (
            <span className={cx(style.icon, icon.angleRight)}></span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
