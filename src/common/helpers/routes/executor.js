import { matchRoutesToLocation } from 'react-router-addons-routes';
import routes from '../../components/routes/config';


export default (location, dispatch) => {
  const { matchedRoutes, params } = matchRoutesToLocation(routes, location);

  if (matchedRoutes) {
    const initActions = matchedRoutes
      .filter(route => route.initActions)
      .reduce((accumValue, currentValue) => accumValue.concat(currentValue.initActions), []);

    if (initActions.length) {
      return Promise.all(initActions.map(initAction => dispatch(initAction(params))))
        .then(results => ({ routes, results }))
    }
  }

  return Promise.resolve();
}