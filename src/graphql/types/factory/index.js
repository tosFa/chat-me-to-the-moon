import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

import ErrorType from "../error";
import MetaType from "../meta/index";

export default {
  remoteSingleFactory: ({ name, description, fields }) => {
    const data = {
      type: new GraphQLObjectType({fields, name: `${name}Model`, description}),
      description: `Data/Single/${name}`
    };
    const errors = {
      type: new GraphQLList(ErrorType),
      description: `Errors/Single/${name}`
    };

    return new GraphQLObjectType({
      name,
      description,
      fields: { data, errors }
    })
  },

  remoteListFactory: ({ name, description, fields }) => {
    const data = {
      type: new GraphQLList(new GraphQLObjectType({fields, name: `${name}List`, description})),
      description: `Data/List/${name}`
    };
    const errors = {
      type: new GraphQLList(ErrorType),
      description: `Errors/List/${name}`
    };
    const meta = {
      type: MetaType,
      description: `Meta/List/${name}`
    };

    return new GraphQLObjectType({
      name: `${name}s`,
      description,
      fields: { data, errors, meta }
    })
  },

  simpleSingleFactory: ({ name, description, fields }) => {
    return new GraphQLObjectType({
      name, description, fields
    })
  }
}