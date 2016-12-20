import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from '../schema';
import envVars from '../../../tools/config/envVars';
import DataLoader from 'dataloader';
import { api } from '../helpers';

const createLoaders = (options) => ({
  resourceLoader: new DataLoader((urls) => Promise.all(urls.map((url) => api(url, options))))
})

export const graphQlMiddleware = graphqlExpress((req) => {
  const query = req.query.query || req.body.query;

  if (query && query.length > 2000) {
    throw new Error('Query too large.');
  }
  const auth_token = (req.cookies && req.cookies[envVars.AUTH_COOKIE_NAME]) ?
    req.cookies[envVars.AUTH_COOKIE_NAME] : '';

  const options = {
    headers: { 'Authorization': auth_token }
  };


  return {
    schema,
    context: { auth_token, loaders: createLoaders(options) }
  };
})

export const graphiQlMiddleware = graphiqlExpress({
  endpointURL: '/graphql',
  query: ``,
});