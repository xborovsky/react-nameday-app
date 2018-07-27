import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { getLanguage } from './storage/language';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

axios.interceptors.request.use((config) => {
    config.params = {
        'calendar' : getLanguage()
    };
    return config;
});

ReactDOM.render(
    <I18nextProvider i18n={ i18n }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </I18nextProvider>, document.getElementById('root'));
registerServiceWorker();
