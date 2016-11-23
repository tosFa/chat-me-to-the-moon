import { createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import createApolloClient from '../helpers/create-apollo-client';
import addGraphQLSubscriptions from '../helpers/subscriptions';


const wsClient = new Client('ws://localhost:9000');

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: {}
});

export default client;