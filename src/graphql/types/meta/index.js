import { GraphQLObjectType, GraphQLInt } from "graphql";
import PaginationType from './pagination';

export default new GraphQLObjectType({
  name: 'meta',
  description: 'Meta root type',
  fields: {
    pagination: {
      type: PaginationType,
      description: 'Pagination',
    }
  }
});