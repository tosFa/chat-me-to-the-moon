export default (actionCreator, key) => (val, ...vals) => {
  const action = actionCreator(...vals);

  return { ...action, payload: { ...action.payload, [key]: val } };
};
