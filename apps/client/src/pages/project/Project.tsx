import { horizontalLeftContent as layout, outlet } from '@pivot/design/css';

import { selectRouteParams } from '~selectors/router';
import { useSelector } from '~store';

export default function Project() {
  const params = useSelector(selectRouteParams);

  console.log(params);
  return (
    <div className={outlet.container}>
      <div className={layout.subheader}></div>
      <div className={layout.content}></div>
      <div className={layout['left-content']}></div>
    </div>
  );
}
