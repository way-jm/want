import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import {Provider} from 'react-redux'
import storeConfig from "./store/storeConfig";

let store = storeConfig();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);
