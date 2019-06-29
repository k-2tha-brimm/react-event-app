import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'mobx-react'

import AppStore from './stores/AppStore.js';
const appStore = new AppStore();

ReactDOM.render(
    <Provider appStore={appStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
serviceWorker.unregister();
