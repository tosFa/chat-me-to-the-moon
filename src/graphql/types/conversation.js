import { GraphQLObjectType, GraphQLList } from 'graphql';
import MessageType from './message';

export default new GraphQLObjectType({
  name: 'conversation',
  description: 'conversation',
  fields: {
    messages: {
      type: new GraphQLList(MessageType),
      description: 'All messages in the conversation'
    }
  }
});