import { GraphQLObjectType, GraphQLInt } from "graphql";

export default new GraphQLObjectType({
  name: 'pagination',
  description: 'pagination meta type',
  fields: {
    current_page: {
      type: GraphQLInt,
      description: 'current page number'
    },
    next_page: {
      type: GraphQLInt,
      description: 'next page number'
    },
    prev_page: {
      type: GraphQLInt,
      description: 'previous page number'
    },
    total_pages: {
      type: GraphQLInt,
      description: 'total pages count'
    },
    total_count: {
      type: GraphQLInt,
      description: 'total items count'
    },
  }
})