import { combineReducers } from 'redux';

import auth from './auth/reducer';
import establishment from './establishment/reducer';

export default combineReducers({ auth, establishment });
