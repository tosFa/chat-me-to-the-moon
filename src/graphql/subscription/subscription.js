import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import * as types from '../types';
import { commentStructure } from '../types/message'
import db from '../../db';

export default new GraphQLObjectType({
  name: 'subscription',
  description: "Subscription Type",
  fields: {
    messageAdded: {
      type: new GraphQLList(types.MessageType),
      args: commentStructure,
      resolve: (root, args) => {
        return db.filter(item => item.conversationId === args.id);
      }
    }
  }
});