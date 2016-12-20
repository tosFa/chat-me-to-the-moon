import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import ErrorType from "./error";
import UserType from "./user";
import { api, normalizeErrors } from '../helpers';

export const fields = {
  id: {
    type: GraphQLInt,
    description: "Id"
  },
  name: {
    type: GraphQLString,
    description: "organization name"
  },
  contact_email: {
    type: GraphQLString,
    description: "contact email"
  },
  user: {
    type: UserType,
    description: "Organization creator",
    resolve: (root, args, context) => context.loaders.resourceLoader.load(root.user.resource)
      .then(result => result.errors ? { errors: normalizeErrors(result) } : result.data)
  },
  resource: {
    type: GraphQLString,
    description: "resource url"
  },
  errors: {
    type: new GraphQLList(ErrorType),
    description: "Validation errors"
  },
};

export const args = {
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
};
export default new GraphQLObjectType({
  name: "organization",
  description: "Organization Type",
  fields
});