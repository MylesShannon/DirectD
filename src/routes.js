import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './modules/App';
import Home from './modules/Home';
import About from './modules/About';
import Account from './modules/Account';
import Bill from './modules/Bill';
import NotFound from './modules/NotFound';

const Routes = (store) => {
  const requireAuthentication = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/');
    }
  };
  // const skipIfAuthenticated = (nextState, replace) => {
  //   if (store.getState().auth.token) {
  //     replace('/');
  //   }
  // };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/about" component={About} />
      <Route path="/account" onEnter={requireAuthentication} component={Account} />
      <Route path="/bill/:billId" component={Bill} />
      <Route path="*" component={NotFound} />
    </Route>
  );
}

export default Routes;
