import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import qs from 'qs';
import * as types from '../types';
import { normalizeResponse } from '../helpers';
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
      resolve: (root, args, context) => context.loaders.resourceLoader.load(`/users/${args.id}`)
        .then(normalizeResponse)
    },

    confirmation: {
      type: types.UserType,
      args: {
        confirmation_token: {
          type: GraphQLString
        }
      },
      resolve: (root, args, context) =>
        context.loaders.resourceLoader.load(`/users/confirmation?confirmation_token=${args.confirmation_token}`)
        .then(normalizeResponse)
    },

    organizations: {
      type: types.OrganizationsType,
      args: {
        page: {
          type: GraphQLInt,
          description: "page number"
        },
        per_page: {
          type: GraphQLInt,
          description: "page offset"
        },
        order: {
          type: GraphQLString,
          description: "sort order"
        }
      },
      resolve: (root, args, context) => {
        return context.loaders.resourceLoader.load(`/api/organizations/?${qs.stringify(args)}`)
          .then(normalizeResponse)

      }
    },

    organization: {
      type: types.OrganizationType,
      args: {
        id: {
          type: GraphQLInt,
          description: "Organization id"
        }
      },
      resolve: (root, args, context) => {
        return context.loaders.resourceLoader.load(`/api/organizations/${args.id}`)
          .then(normalizeResponse)
      }

    }



  }
});