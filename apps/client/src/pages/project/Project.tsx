import { selectRouteParams } from '@pivot/client/router';
import { horizontalLeftContent as layout, outlet } from '@pivot/design/css';

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
