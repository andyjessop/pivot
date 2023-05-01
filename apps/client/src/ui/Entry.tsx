import './entry.css';
import '@pivot/design/variables';

import { RenderRoute } from '@pivot/client/router';

import { useSelector, useService } from '~app';
import { selectRouteName } from '~app/modules/router';
import { routes } from '~routes';

export default function Entry() {
  const router = useService('router');
  const head = useService('head');

  const name = useSelector(selectRouteName);

  if (!router || !head || !name) {
    return null;
  }

  return RenderRoute(name, routes);
}
