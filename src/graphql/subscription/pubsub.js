import { PubSub, SubscriptionManager } from 'graphql-subscriptions';

const pubsub = new PubSub();

const createSubscriptionManager = (schema) => new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    messageAdded: (options, args) => ({
      messageAdded: {
        filter: message => {
          console.log('oac: ', options, args, message);
          return message.conversationId === args.id;
        }
      },
    }),
  },
});

export { createSubscriptionManager, pubsub };
