import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

export default new GraphQLObjectType({
  name: 'error',
  description: 'Error type',
  fields: {
    key: {
      type: GraphQLString,
      description: 'key for error'
    },
    errors: {
      type: new GraphQLList(GraphQLString),
      description: 'errors array'
    }
  }
});