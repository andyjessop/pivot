import { horizontalLeftContent as layout, spaced } from '@pivot/design-css';
import { cx } from '@pivot/util-classname';

export default function App() {
  return (
    <div className={layout.container}>
      <div className={cx(layout['top-left'], spaced.container)}>
        <span>1</span>
        <span>1</span>
        <span>1</span>
      </div>
      <div className={layout['top-right']}></div>
      <div className={layout.subheader}></div>
      <div className={layout['left-content']}></div>
      <div className={layout.content}></div>
    </div>
  );
}
