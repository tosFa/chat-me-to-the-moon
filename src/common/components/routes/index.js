import React from 'react';
import { Miss, Match } from 'react-router';
import { MatchWithRoutes } from 'react-router-addons-routes';
import Error from '../error/Error';
import Layout from '../layout/Layout';

export default (props) =>
  <Layout>
    {props.routes.map(route => <Match key={route.name} {...route} {...props} />)}
    <Miss component={Error}/>
  </Layout>