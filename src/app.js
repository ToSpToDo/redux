//base
import React from 'react';
import ReactDom from 'react-dom';


//redux
import {Provider} from 'react-redux';

// import store from './store/redux_thunk/index';
import store from './store/redux_saga/index';


//react-route
import AppRoutes from './router';


//render
ReactDom.render(
  <Provider
    store={store}>
    <AppRoutes/>
  </Provider>,
  document.getElementById('root')
);
