import { horizontalLeftContent as layout, outlet } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import appStyles from '../../app.module.css';

export default function Project() {
  return (
    <div className={outlet.container}>
      <div className={cx(layout.subheader, appStyles.subheader)}>Subheader</div>
      <div className={layout.content}></div>
      <div className={layout['left-content']}></div>
    </div>
  );
}
