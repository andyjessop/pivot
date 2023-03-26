import { useService } from './services';
import { horizontalLeftContent as layout, spaced } from '@pivot/design-css';
import { cx } from '@pivot/util-classname';

function App() {
  const router = useService('router');

  if (!router) {
    return null;
  }

  return (
    <div className={layout.container}>
      <div
        className={cx(layout['top-left'], spaced.container)}
        onClick={router.link({ name: 'project', params: { id: '1' } })}
      >
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

export default App;
