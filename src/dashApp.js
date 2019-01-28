import React from 'react';
import {Provider} from 'react-redux';
import {history, store} from './redux/store';
import App from './App';

const DashApp = () => (
    <Provider store={store}>
        <App history={history}/>
    </Provider>
);

export default DashApp;
