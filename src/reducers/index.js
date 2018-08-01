import { combineReducers } from 'redux';
import fetchUsersReducer from './fetchUsersReducer';
import fetchDataReducer from './fetchDataReducer';

const rootReducer = combineReducers({
  usersList: fetchUsersReducer,
  data: fetchDataReducer,
});

export default rootReducer;
