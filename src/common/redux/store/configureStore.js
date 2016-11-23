/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import { getApi } from '../../helpers/api';
import createApiMiddleware from '../mw/createApiMiddleware';
import client from '../../../client/apollo';

function configureStore(initialState) {
  const middlewares = compose(
    // Middleware store enhancer.
    applyMiddleware(
      createApiMiddleware(getApi()),
      client.middleware()
    ),
    process.env.NODE_ENV === 'development'
      && typeof window !== 'undefined'
      && typeof window.devToolsExtension !== 'undefined'
      // Call the brower extension function to create the enhancer.
      ? window.devToolsExtension()
      // Else we return a no-op function.
      : f => f
  );

  const store = initialState
    ? createStore(reducer, initialState, middlewares)
    : createStore(reducer, middlewares);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    // Enable Webpack hot module replacement for reducers. This is so that we
    // don't lose all of our current application state during hot reloading.
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
