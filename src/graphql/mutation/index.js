import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import * as types from '../types';
import db from '../../db';
import { pubsub } from '../subscription/pubsub';
import { api, normalizeErrors } from '../helpers';

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

        return api('/api/users/', options)
          .then(result => result.errors ? { errors: normalizeErrors(result) } : result.user)
      }

    },

    signin: {
      type: types.UserType,
      args: {
        email: {
          type: GraphQLString,
          description: "email"
        },
        password: {
          type: GraphQLString,
          description: "password"
        }
      },
      resolve: (root, args) => {
        const options = { method: 'POST', body: JSON.stringify({ user: args }) };

        return api('/users/sign_in', options)
          .then(result => result.error ? { errors: [ { key: 'email', errors: [result.error] } ] } : result.data)
        //@todo see if this API response will have to change
      }

    },

    signout: {
      type: types.BooleanType,
      resolve: (root, args, context) => {
        const options = { method: 'DELETE', body: JSON.stringify({ user: args }), headers: { Authorization: context.auth_token } };

        return api('/api/sessions', options)
          .then(result =>
            result.errors ? { success: false, errors: [ {key: 'logout', errors: [result.errors] } ] } : { success: true }
          )
      }
    },


    organization: {
      type: types.OrganizationType,
      args: {
        id: {
          type: GraphQLInt,
          description: "Id"
        },
        name: {
          type: GraphQLString,
          description: "name"
        },
        contact_email: {
          type: GraphQLString,
          description: "contact email"
        },
      },
      resolve: (root, args, context) => {
        console.log({args});
        const options = {
          method: args.id ? 'PUT' : 'POST',
          body: JSON.stringify({ data: args }),
          headers: { Authorization: context.auth_token }
        };

        return api('/api/organizations/', options)
          .then(result => {
            console.log({result});
            return result.errors ? { errors: normalizeErrors(result) } : result;
          })
      }
    }

  }
});