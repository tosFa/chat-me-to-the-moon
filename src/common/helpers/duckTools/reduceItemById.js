export default (reducer, byIdKey = 'byId') => (state = {}, action = {}) => {
  const { payload = {} } = action;
  const { id } = payload || {};

  if (!state[byIdKey] || !id) {
    return state;
  }

  const byId = state[byIdKey];
  const prevState = byId[id];
  const nextState = reducer(byId[id], action);

  return prevState === nextState ? state : { ...state, [byIdKey]: { ...byId, [id]: nextState } };
};
