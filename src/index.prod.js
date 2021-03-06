/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory  } from 'react-router';
import { createHashHistory } from 'history';
import routes from './routes';
import 'babel-polyfill';
import configureStore from './store/configureStore';
require('./favicon.ico');
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/styles.scss';
import './styles/scrabbleboard.css';
import './styles/vacation3.css';
import { syncHistoryWithStore } from 'react-router-redux';
import initialState from './reducers/initialState';
import 'typeface-roboto';

const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const history = syncHistoryWithStore(appHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
