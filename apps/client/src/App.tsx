import { useService } from './services';
import { horizontalLeftContent as layout } from '@pivot/design-layout';

function App() {
  const router = useService('router');

  if (!router) {
    return null;
  }

  return (
    <div className={layout.container}>
      <div
        className={layout['top-left']}
        onClick={router.link({ name: 'project', params: { id: '1' } })}
      ></div>
      <div className={layout['top-right']}></div>
      <div className={layout.subheader}></div>
      <div className={layout['left-content']}></div>
      <div className={layout.content}></div>
    </div>
  );
}

export default App;
