import 'core-js/fn/object/assign';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import Routes from './routes';

const store = configureStore(window.INITIAL_STATE);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes(store)}/>
  </Provider>,
  document.getElementById('app')
);
