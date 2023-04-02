import '@pivot/design/variables';
import './main.css';
import './store';

import ReactDOM from 'react-dom/client';

import { App } from './App';

main();

async function main() {
  // If we're in development or CI, start the mock server. This starts a ServiceWorker
  // which intercepts fetch requests and returns mocks according to the contents
  // of ./shared/mocks/handlers. See https://mswjs.io/ for more details.
  const { server } = await import('./server/worker');

  server.start({
    onUnhandledRequest: 'bypass',
    waitUntilReady: true,
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}
