import { selectRouteParams } from '@pivot/client/router';
import { horizontalLeftContent as layout, outlet } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector } from '~store';

import appStyles from '../../app.module.css';

export default function Project() {
  // eslint-disable-next-line
  const params = useSelector(selectRouteParams);

  return (
    <div className={outlet.container}>
      <div className={cx(layout.subheader, appStyles.subheader)}>Subheader</div>
      <div className={layout.content}></div>
      <div className={layout['left-content']}></div>
    </div>
  );
}
