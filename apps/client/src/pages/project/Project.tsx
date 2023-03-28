import { horizontalLeftContent as layout, outlet } from '@pivot/design/css';

import { selectRouteParams } from '~modules/router/router.selectors';
import { useSelector } from '~store';

export default function Project() {
  // eslint-disable-next-line
  const params = useSelector(selectRouteParams);

  return (
    <div className={outlet.container}>
      <div className={layout.subheader}></div>
      <div className={layout.content}></div>
      <div className={layout['left-content']}></div>
    </div>
  );
}
