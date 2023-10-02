import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/image_block.css';
import './styles/pages.css';
import './styles/core.css';
import './styles/modal_windows.css';
import './styles/profile.css';

import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
      <App />
    </Provider>
)