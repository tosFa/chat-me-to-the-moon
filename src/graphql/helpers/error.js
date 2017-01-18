import { GraphQLError }  from 'graphql/error';

// export default (errors) => Object.keys(errors).map(error => errors[error].map(msg => new GraphQLError(msg, null, null, null, error)))[0];
export default (errors) => ([new GraphQLError('msg', null, null, null, 'error'), new GraphQLError('msg1', null, null, null, 'error')]);