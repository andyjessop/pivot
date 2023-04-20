import { Breadcrumb } from '@pivot/client/breadcrumb';
import {
  horizontalLeftContent as layout,
  outlet,
  spaced,
} from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectBreadcrumbParts } from '~app/modules/breadcrumb';

import appStyles from '../../app.module.css';

import { selectSubheaderItems } from './subheader/subheader.selectors';
import { SubNav } from './subheader/SubNav';
import { TitleLoader } from './title/TitleLoader';

export default function Project() {
  const router = useService('router');
  const subheaderItems = useSelector(selectSubheaderItems);
  const breadcrumbParts = useSelector(selectBreadcrumbParts);

  if (!router) {
    return null;
  }

  return (
    <div className={outlet.container}>
      <div
        className={cx(
          layout.subheader,
          appStyles.subheader,
          spaced.container,
          spaced.large,
        )}
      >
        <SubNav items={subheaderItems} link={router.link} />
      </div>
      <div className={layout.content}>
        {breadcrumbParts.length ? (
          <Breadcrumb link={router.link} parts={breadcrumbParts} />
        ) : (
          <TitleLoader />
        )}
      </div>
    </div>
  );
}
