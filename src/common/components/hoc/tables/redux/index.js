export const actionConstants = {
  REGISTER_TABLE: 'REGISTER_TABLE',
  SET_TABLE_NODES: 'SET_TABLE_NODES',
  LOADING_DATA_REQUEST: 'LOADING_DATA_REQUEST',
  LOADING_DATA_SUCCESS: 'LOADING_DATA_SUCCESS',
  LOADING_DATA_FAIL: 'LOADING_DATA_FAIL',
  SET_SORT: 'SET_SORT',
  SET_PAGE: 'SET_PAGE'
};

export const actions = {
  register: (id) => ({type: actionConstants.REGISTER_TABLE, payload: { id }}),
  setData: (id, data) => ({type: actionConstants.LOADING_DATA_SUCCESS, payload: { id, data }}),
  setNodes: (id, nodes) => ({type: actionConstants.SET_TABLE_NODES, payload: { id, nodes }}),
  request: (id) => ({type: actionConstants.LOADING_DATA_FAIL, payload: { id } }),
  requestSuccess: (id, data) => ({type: actionConstants.LOADING_DATA_SUCCESS, payload: { id, data }}),
  requestFail: (id, error) => ({type: actionConstants.LOADING_DATA_SUCCESS, payload: { id, error }}),
}

export const initialTableState = {
  loading: false,
  error: null,
  data: [],
  nodes: []
};

export const initialState = {  };

export const reducer = (state = initialState, action) => {
  var newState = {...state};
  switch (action.type) {
    case actionConstants.REGISTER_TABLE:
      newState[action.payload.id] = { ...initialTableState, ...action.initialState };
      return newState;
    case actionConstants.LOADING_DATA_SUCCESS:
      newState[action.payload.id] = { ...newState[action.payload.id], data: action.payload.data, error: null };
      return newState;
    case actionConstants.SET_TABLE_NODES:
      newState[action.payload.id] = { ...newState[action.payload.id], nodes: action.payload.nodes };
      return newState;
    default:
      return newState;
  }
}