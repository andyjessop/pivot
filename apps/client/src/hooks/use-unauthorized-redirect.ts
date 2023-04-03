import { useEffect } from 'react';

import { selectIsAuthorized, selectRouteName } from '@pivot/client/router';

import { useService } from '~services';
import { useSelector } from '~store';

export function useUnauthorizedRedirect() {
  const router = useService('router');
  const isAuthorized = useSelector(selectIsAuthorized);
  const routeName = useSelector(selectRouteName);

  useEffect(() => {
    if (!isAuthorized && router) {
      router.navigate({ name: 'notFound' });
    }
  }, [isAuthorized, router, routeName]);
}
