import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import client from '../../../client/apollo';
import conversations from './conversations';
import test from './test';

export default combineReducers({
  form: formReducer,
  conversations,
  apollo: client.reducer(),
  test
});