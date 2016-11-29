import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createSubscriptionManager } from '../../graphql/subscription';
import schema from '../../graphql/schema';

export default () => {
  // WebSocket server for subscriptions
  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  websocketServer.listen(process.env.WS_PORT, () => console.log( // eslint-disable-line no-console
    `Websocket Server is now running on http://localhost:${process.env.WS_PORT}`
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
