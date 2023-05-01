import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './ui/App';

main();

async function main() {
  // If we're in development or CI, start the mock server. This starts a ServiceWorker
  // which intercepts fetch requests and returns mocks according to the contents
  // of ./shared/mocks/handlers. See https://mswjs.io/ for more details.
  if (import.meta.env.DEV || import.meta.env.VITE_CI) {
    const { server } = await import('./server/worker');

    await server.start({
      onUnhandledRequest: 'bypass',
      waitUntilReady: true,
    });
  }

  // Import app and entry point after server has started.
  const app = await import('./app/index').then((m) => m.app);

  app.init();

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}
