import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Services } from './services';
import { cacheService } from './modules/cache.module';
import { routerService } from './modules/router.module';
import { store } from './store';
import '@pivot/design-variables';
import './index.css';

console.log(store);

const services = {
  cache: cacheService,
  router: routerService,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Services.Provider value={services}>
    <App />
  </Services.Provider>,
);
