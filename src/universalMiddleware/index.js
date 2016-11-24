/* @flow */

import type { $Request, $Response, Middleware } from 'express';
import React from 'react';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';
import { matchRoutesToLocation } from 'react-router-addons-routes';
import { ApolloProvider } from 'react-apollo';
import client from '../client/apollo';
import render from './render';
//import runTasksForLocation from '../shared/universal/routeTasks/runTasksForLocation';
import App from '../common/components/app';
import configureStore from '../common/redux/store/configureStore';
import routes from '../common/components/routes';
import routeConfig from '../common/components/routes/config';
import executor from '../common/helpers/routes/executor'

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request: $Request, response: $Response) {
  if (process.env.DISABLE_SSR === 'true') {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = render();
    response.status(200).send(html);
    return;
  }

  // Create the redux store.
  const store = configureStore();
  // Set up a function we can call to render the app and return the result via
  // the response.
  const context = createServerRenderContext();

  const renderToDOM = () => {


    // Create the application react element.
    const app = (
      <ServerRouter
        location={request.url}
        context={context}
      >
        <ApolloProvider client={client} key="apollo">
          <Provider store={store} key="store">
            <App store={store} />
          </Provider>
        </ApolloProvider>
      </ServerRouter>
    );

    // Render the app to a string.
    const html = render(
      // Provide the full app react element.
      app,
      // Provide the redux store state, this will be bound to the window.APP_STATE
      // so that we can rehydrate the state on the client.
      getState()
    );

    // Get the render result from the server render context.
    const renderResult = context.getResult();

    // Check if the render result contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (renderResult.redirect) {
      response.status(301).setHeader('Location', renderResult.redirect.pathname);
      response.end();
      return;
    }
    response
      .status(
        renderResult.missed
          // If the renderResult contains a "missed" match then we set a 404 code.
          // Our App component will handle the rendering of an Error404 view.
          ? 404
          // Otherwise everything is all good and we send a 200 OK status.
          : 200
      )
      .send(html);
  }

  const { dispatch, getState } = store;
  const renderApp = () => {
    executor({ pathname: request.url }, dispatch).then(() => renderToDOM())
  }
  renderApp();
}

export default (universalReactAppMiddleware : Middleware);
