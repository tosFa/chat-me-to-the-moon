import React from 'react';
import { Miss, Match, Redirect } from 'react-router';
import { MatchWithRoutes } from 'react-router-addons-routes';
import Error from '../error/Error';
import Layout from '../layout/Layout';
import { omit } from '../../helpers/duckTools';

const isLoggedIn = () => {

  return true;
}

const MatchWhenAuthorized = ({ component: Component, ...rest }) => {

  return (
    <Match {...rest} render={props => (
    isLoggedIn() ?
      <Component {...props} {...rest} /> : <Redirect to={{pathname: '/', state: { from: props.location }}}/>

  )}/>
  );
}

export default (props) =>
  <Layout {...props}>
    {props.routes.map(route => {
      const { component: Component, ...rest } = route;

      return (route.auth) ? <MatchWhenAuthorized key={route.name} {...route} {...props} /> :
        <Match key={route.name} {...rest} render={(routeProps) => <Component {...rest} {...props} {...routeProps}/>} />
    })}
    <Miss component={Error}/>
  </Layout>