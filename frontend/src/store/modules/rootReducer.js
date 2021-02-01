import { combineReducers } from 'redux';

import auth from './auth/reducer';
import establishment from './establishment/reducer';
import customer from './customer/reducer';
import session from './session/reducer';
import cart from './cart/reducer';
import notification from './notification/reducer';
import dashboard from './dashboard/reducer';

export default combineReducers({
  auth,
  establishment,
  customer,
  session,
  cart,
  notification,
  dashboard,
});
