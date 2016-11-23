/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';

import configureStore from '../common/redux/store/configureStore';
import ReactHotLoader from './components/ReactHotLoader';
import App from '../common/components/app';
import client from './apollo';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Create our Redux store.
const store = configureStore(
  // Server side rendering would have mounted our state on this global.
  window.APP_STATE
);



function renderApp(TheApp) {
  render(
    <ReactHotLoader>
      <ApolloProvider client={client} key="apollo">
        <Provider store={store} key="store">
          <BrowserRouter>
            <TheApp />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </ReactHotLoader>
    ,
    container
  );
}

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../common/components/app',
    () => renderApp(require('../common/components/app').default)
  );
}

renderApp(App);
