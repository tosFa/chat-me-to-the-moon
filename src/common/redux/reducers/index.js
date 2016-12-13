import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import client from '../../../common/apollo';
import conversations from './conversations';
import test from './test';
import { reducer as tableReducer } from '../../components/hoc/tables/redux';

export default combineReducers({
  form: formReducer,
  conversations,
  apollo: client.reducer(),
  test,
  table: tableReducer
});