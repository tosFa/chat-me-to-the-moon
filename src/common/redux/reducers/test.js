const initialState = {

}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'TEST/REQUEST':
      return {...state, loading: true};
    case 'TEST/SUCCESS':
      return {...state, loading: false, data: 123};
    case 'TEST/FAIL':
      return {...state, loading: false, error: true};
    default:
      return state;
  }
}