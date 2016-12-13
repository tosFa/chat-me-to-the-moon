import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import * as types from '../types';
import { fields as userFields } from '../types/user';
import db from '../../db';
import { pubsub } from '../subscription/pubsub';
import { api } from '../helpers';

const FileType = new GraphQLObjectType({
  name: 'file',
  description: 'File type',
  fields: {
    preview: {
      type: GraphQLString,
      description: 'Preview'
    }
  }
});

export default new GraphQLObjectType({
  name: 'mutation',
  description: "Mutation Type",
  fields: {
    createMessage: {
      type: types.MessageType,
      args: {
        id: {
          type: GraphQLInt,
          description: 'messageId'
        },
        authorId: {
          type: GraphQLInt,
          description: 'authorId'
        },
        conversationId: {
          type: GraphQLInt,
          description: 'conversationId'
        },
        text: {
          type: GraphQLString,
          description: 'messageText'
        },
        files: {
          type: new GraphQLList(GraphQLString),
          description: 'Files'
        }
      },
      resolve: (root, args) => {
        return Promise.resolve()
          .then(() => db.push(args))
          .then(() => pubsub.publish('messageAdded', args))
          .then(() => db.find(item => item.id === args.id));
      }
    },

    signup: {
      type: types.UserType,
      args: {
        email: {
          type: GraphQLString,
          description: "email"
        },
        password: {
          type: GraphQLString,
          description: "password"
        },
        password_confirmation: {
          type: GraphQLString,
          description: "password_confirmation"
        }
      },
      resolve: (root, args) => {
        const options = { method: 'POST', body: JSON.stringify({ user: args }) };

        return api('/api/users/', options).then(result => result.user);
      }
    }

  }
});