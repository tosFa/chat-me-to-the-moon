import { defineTypes } from '../../helpers/duckTools';

export const initialState = {
  loading: false,
  error: null,
  filenames: []
};
export const postUploadAsyncTypes = defineTypes(['REQUEST', 'SUCCESS', 'FAIL'], 'UPLOAD');

export default (state = initialState, action) => {
  switch(action.type) {
    case postUploadAsyncTypes.REQUEST:
      return {...state, loading: true, filenames: [], error: null};
    case postUploadAsyncTypes.SUCCESS:
      return {...state, loading: false, filenames: action.result, error: null};
    case postUploadAsyncTypes.FAIL:
      return {...state, loading: false, error: action.error, filenames: []};
    default:
      return state;
  }
}