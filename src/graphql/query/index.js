import { GraphQLObjectType, GraphQLInt } from 'graphql';
import * as types from '../types';
import db from '../../db';

export default new GraphQLObjectType({
  name: 'query',
  description: "Query Type",
  fields: {
    message: {
      type: types.MessageType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, args) => db.find(item => item.id === args.id)
    },
    conversation: {
      type: types.ConversationType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, args) => ({ messages: db.filter(item => item.conversationId === args.id) })
    }
  }
});