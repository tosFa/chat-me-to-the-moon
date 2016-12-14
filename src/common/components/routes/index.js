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
  <Layout>
    {props.routes.map(route => {
      const { component: Component, ...rest } = route;

      return (route.auth) ? <MatchWhenAuthorized redirect={(route.auth || !isLoggedIn())} key={route.name} {...route} {...props} /> :
        <Match key={route.name} {...rest} render={() => <Component {...rest} {...props} />} />
    })}
    <Miss component={Error}/>
  </Layout>