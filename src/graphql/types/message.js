import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

export const commentStructure = {
  id: {
    type: GraphQLInt,
    description: "Id"
  },
  conversationId: {
    type: GraphQLInt,
    description: "conversationId"
  },
  authorId: {
    type: GraphQLInt,
    description: "authorId"
  },
  text: {
    type: GraphQLString,
    description: "Text"
  },
  files: {
    type: new GraphQLList(GraphQLString),
    description: "Files"
  }
};
export default new GraphQLObjectType({
  name: 'message',
  description: 'message',
  fields: commentStructure
});