import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import * as types from '../types';
import { api, normalizeErrors } from '../helpers';
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
      resolve: (root, args) => {
        return { messages: db.filter(item => item.conversationId === args.id) }
      }
    },
    user: {
      type: types.UserType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, args) => ({id: 1, email: ''})
    },
    confirmation: {
      type: types.UserType,
      args: {
        confirmation_token: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => api(`/users/confirmation?confirmation_token=${args.confirmation_token}`)
        .then(result => result.errors ? { errors: normalizeErrors(result) } : result.user)
    },

    //signout

  }
});