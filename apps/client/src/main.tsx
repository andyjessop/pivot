import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Services } from './services';
import { cacheService } from './modules/cache.module';
import { routerService } from './modules/router.module';
import './index.css';

const services = {
  cache: cacheService,
  router: routerService,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Services.Provider value={services}>
      <App />
    </Services.Provider>
  </React.StrictMode>,
);
