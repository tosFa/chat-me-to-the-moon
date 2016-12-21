import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from '../schema';
import environmentConfig from '../../../config/private/environment';
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
  const auth_token = (req.cookies && req.cookies[environmentConfig.authCookieName]) ?
    req.cookies[environmentConfig.authCookieName] : '';

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