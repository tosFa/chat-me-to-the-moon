import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

export const fields = {
  id: {
    type: GraphQLInt,
    description: "Id"
  },
  email: {
    type: GraphQLString,
    description: "email"
  },
  auth_token: {
    type: GraphQLString,
    description: "auth token"
  },

};

export const args = {
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
  },


};
export default new GraphQLObjectType({
  name: 'user',
  description: 'User',
  fields
});