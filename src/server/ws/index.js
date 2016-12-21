import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createSubscriptionManager } from '../../graphql/subscription';
import schema from '../../graphql/schema';
import environmentConfig from '../../../config/private/environment';

const port = environmentConfig.websocketGrapQLPort;
const host = environmentConfig.host;

export default () => {
  // WebSocket server for subscriptions
  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  websocketServer.listen(environmentConfig.websocketGrapQLPort, () => console.log( // eslint-disable-line no-console
    `Websocket Server is now running on http://${host}:${port}`
  ));

  var subscriptionManager = createSubscriptionManager(schema);
// eslint-disable-next-line
  const subscriptionServer = new SubscriptionServer(
    {
      subscriptionManager: createSubscriptionManager(schema),
      // the onSubscribe function is called for every new subscription
      // and we use it to set the GraphQL context for this subscription
      onSubscribe: (msg, params) => {
        return Object.assign({}, params);
      },
    },
    websocketServer
  );

  return { websocketServer, subscriptionServer };
};
