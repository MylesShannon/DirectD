import { combineReducers } from 'redux';
import auth from './auth';
import bills from './bills';
import user from './user';

export default combineReducers({
  auth,
  bills,
  user
});
