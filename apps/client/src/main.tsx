import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import './index.css';

console.log(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
