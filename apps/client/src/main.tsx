import React from 'react';
import ReactDOM from 'react-dom/client';

main();

async function main() {
  // If we're in development or CI, start the mock server. This starts a ServiceWorker
  // which intercepts fetch requests and returns mocks according to the contents
  // of ./shared/mocks/handlers. See https://mswjs.io/ for more details.
  if (import.meta.env.DEV || import.meta.env.VITE_CI) {
    const { server } = await import('./server/worker');

    await server.start({
      onUnhandledRequest: 'warn',
      waitUntilReady: true,
    });
  }

  await import('./app/index');

  const Entry = React.lazy(() => import('./ui/Entry'));

  ReactDOM.createRoot(document.getElementById('root')!).render(<Entry />);
}
