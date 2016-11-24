import React from 'react';
import { Miss, Match } from 'react-router';
import { MatchWithRoutes } from 'react-router-addons-routes';
import Error from '../error/Error';
import routes from './config';

export default (props) =>
  <div>
    {
      routes.map(
        route =>
          <MatchWithRoutes
            key={route.name}
            {...route}
            render={(matchProps) => <route.component {...props}/>}
          />
      )}
    <Miss component={Error} />
  </div>
