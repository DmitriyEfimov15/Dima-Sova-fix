import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore()

root.render(
    <Provider store={store}>
      <App/>
    </Provider>
);
