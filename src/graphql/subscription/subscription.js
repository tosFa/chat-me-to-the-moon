import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import * as types from '../types';
import { commentStructure } from '../types/message'
import db from '../../db';

export default new GraphQLObjectType({
  name: 'subscription',
  description: "Subscription Type",
  fields: {
    messageAdded: {
      type: types.MessageType,
      args: commentStructure,
      resolve: object => object
    }
  }
});