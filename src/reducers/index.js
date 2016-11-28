import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import auth from './auth';
import bills from './bills';
import user from './user';

export default combineReducers({
  auth,
  bills,
  user,
  routing: routerReducer
});
