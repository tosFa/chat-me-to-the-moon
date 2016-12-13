import mapValues from 'lodash/mapValues';

const binds = (object, ...args) => {
  return mapValues(object, (method) => method.bind(null, ...args));
};

export default (api) => (store) => {
  api = binds(api, store);

  return (next) => (action) => {
    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    const actionPromise = promise(api);

    actionPromise
      .then(({ result }) => next({ ...rest, result, type: SUCCESS }))
      .catch(({ result, error }) => next({ ...rest, result, error, type: FAILURE }));

    return actionPromise;
  };
};