import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from '../schema';

export const graphQlMiddleware = graphqlExpress((req) => {
  // Get the query, the same way express-graphql does it
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }
  //
  //let user;
  //if (req.user) {
  //  // We get req.user from passport-github with some pretty oddly named fields,
  //  // let's convert that to the fields in our schema, which match the GitHub
  //  // API field names.
  //  user = {
  //    login: req.user.username,
  //    html_url: req.user.profileUrl,
  //    avatar_url: req.user.photos[0].value,
  //  };
  //}
  //
  //// Initialize a new GitHub connector instance for every GraphQL request, so that API fetches
  //// are deduplicated per-request only.
  //const gitHubConnector = new GitHubConnector({
  //  clientId: GITHUB_CLIENT_ID,
  //  clientSecret: GITHUB_CLIENT_SECRET,
  //});

  return {
    schema,
    context: {},
  };
})

export const graphiQlMiddleware = graphiqlExpress({
  endpointURL: '/graphql',
  query: ``,
});