import React from 'react';
import { Miss, Match } from 'react-router';
import { MatchWithRoutes } from 'react-router-addons-routes';
import Error from '../error/Error';
import Layout from '../layout/Layout';
import routes from './config';

export default (props) =>
  <Layout>
    {routes.map(route => <MatchWithRoutes key={route.name} {...route} />)}
    <Miss component={Error} />
  </Layout>
