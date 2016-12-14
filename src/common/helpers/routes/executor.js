import { matchRoutesToLocation } from 'react-router-addons-routes';

export default (location, dispatch, routes) => {
  const { matchedRoutes, params } = matchRoutesToLocation(routes, location);

  if (matchedRoutes) {
    const initActions = matchedRoutes
      .filter(route => route.initActions)
      .reduce((accumValue, currentValue) => accumValue.concat(currentValue.initActions), []);

    if (initActions.length) {
      return Promise.all(initActions.map(initAction => dispatch(initAction(params))))
        .then(results => ({ routes, results }))
        .catch(error => console.log(error))
    }
  }

  return Promise.resolve();
}