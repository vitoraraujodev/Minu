import { combineReducers } from 'redux';

import auth from './auth/reducer';
import establishment from './establishment/reducer';
import customer from './customer/reducer';
import session from './session/reducer';

export default combineReducers({ auth, establishment, customer, session });
