import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './assets/sass/theme.scss';

import { store } from './state/store';
import { Web3ReactProvider } from '@web3-react/core';

import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider, connector) {
    return new Web3Provider(provider);
}

ReactDOM.render(
    <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    </Provider>,
    document.getElementById('root')
);