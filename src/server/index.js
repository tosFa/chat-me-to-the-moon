/* @flow */
/* eslint-disable no-console */

// This grants us source map support, which combined with our webpack source
// maps will give us nice stack traces.
import 'source-map-support/register';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import express from 'express';
import type { $Request, $Response, NextFunction } from 'express';
import compression from 'compression';
import { notEmpty } from '../common/utils/guards';
import { graphQlMiddleware, graphiQlMiddleware } from '../graphql/mw'
import bodyParser from 'body-parser';
import upload from './middleware/multer';
import startWebsocketServer from './ws';
import cookieParser from 'cookie-parser';
import environmentConfig from '../../config/private/environment';
import reactApplication from './middleware/reactApplication';
import security from './middleware/security';
import clientBundle from './middleware/clientBundle';
//import serviceWorker from './middleware/serviceWorker';
import errorHandlers from './middleware/errorHandlers';
import { get } from '../../config';


// Create our express based server.
const app = express();

// Don't expose any software information to hackers.
app.disable('x-powered-by');
//app.use(...security);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/graphql', graphQlMiddleware);
app.use('/graphiql', graphiQlMiddleware);

app.use('/api/v1/upload',upload.any(), (req, res) => {
  res.status(200).json(req.files);
  res.end();

});

app.use('/api/v1', (req, res, next) => {
  console.log('API CALL');
  res.json({success: true});
})

// Response compression.
app.use(compression());

// Configure serving of our client bundle.
app.use(get('bundles', 'client', 'webPath'), clientBundle);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), get('publicAssetsPath'))));

// Configure upload file route
app.use('/uploads', express.static(pathResolve(appRootDir.get(), get('publicUploadPath'))));

// The universal middleware for our React application.
app.get('*', reactApplication);

// Handle 404 errors.
// Note: the react application middleware hands 404 paths, but it is good to
// have this backup for paths not handled by the universal middleware. For
// example you may bind a /api path to express.
app.use((req: $Request, res: $Response, next: NextFunction) => { // eslint-disable-line no-unused-vars,max-len
  res.status(404).send('Sorry, that resource was not found.');
});

// Handle all other errors (i.e. 500).
// Note: You must provide specify all 4 parameters on this callback function
// even if they aren't used, otherwise it won't be used.
app.use((err: ?Error, req: $Request, res: $Response, next: NextFunction) => { // eslint-disable-line no-unused-vars,max-len
  if (err) {
    console.log(err);
    console.log(err.stack);
  }
  res.status(500).send('Sorry, an unexpected error occurred.');
});

// Create an http listener for our express app.
const port = environmentConfig.port;
const listener = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

app.use(...errorHandlers);

var { websocketServer, subscriptionServer } = startWebsocketServer();



// We export the listener as it will be handy for our development hot reloader.
export default listener;
