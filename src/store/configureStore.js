import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import normalizrMiddleware from 'redux-normalizr-middleware';
import logger from 'redux-logger';
import reducers from '../reducers';

export default function configureStore() {
  const store = createStore(
    reducers,
    applyMiddleware(thunk, promise(), normalizrMiddleware(), logger())
  );
  // const store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk, promise, logger) );

  return store;
}
