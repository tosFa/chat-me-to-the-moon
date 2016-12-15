import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import ErrorType from './error';

export default new GraphQLObjectType({
  name: 'boolean',
  description: 'Boolean type',
  fields: {
    success: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'result for the operation'
    },
    errors: {
      type: new GraphQLList(ErrorType),
      description: 'errors array'
    }
  }
});