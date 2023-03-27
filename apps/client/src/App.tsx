import { Suspense } from 'react';

import { horizontalLeftContent as layout } from '@pivot/design-css';
import { cx } from '@pivot/util-classname';

import { selectRouteName } from '~selectors/router';
import { useService } from '~services';
import { useSelector } from '~store';

import { routes } from './routes';

export function App() {
  useService('router');

  const name = useSelector(selectRouteName) as keyof typeof routes;

  if (!name) {
    return null;
  }

  const Component = routes[name] ?? routes['404'];

  return (
    <Suspense>
      <div className={layout.container}>
        <div className={cx(layout['top-left'])}></div>
        <div className={layout['top-right']}></div>

        <Component />
      </div>
    </Suspense>
  );
}
