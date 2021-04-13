import { combineReducers } from 'redux';

import auth from './auth/reducer';
import establishment from './establishment/reducer';
import customer from './customer/reducer';
import serviceSession from './serviceSession/reducer';
import cart from './cart/reducer';
import notification from './notification/reducer';
import dashboard from './dashboard/reducer';
import tableSession from './tableSession/reducer';

export default combineReducers({
  auth,
  establishment,
  customer,
  serviceSession,
  cart,
  notification,
  dashboard,
  tableSession,
});
