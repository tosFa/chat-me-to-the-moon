import { GraphQLSchema, GraphQLObjectType, GraphQLInt } from 'graphql';
import mutation from '../mutation';
import query from '../query';
import subscription from '../subscription/subscription';


export default new GraphQLSchema({
  query,
  mutation,
  subscription
});
