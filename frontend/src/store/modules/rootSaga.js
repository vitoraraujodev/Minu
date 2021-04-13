import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import establishment from './establishment/sagas';
import customer from './customer/sagas';
import dashboard from './dashboard/sagas';
import serviceSession from './serviceSession/sagas';
import cart from './cart/sagas';
import tableSession from './tableSession/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    establishment,
    customer,
    dashboard,
    serviceSession,
    cart,
    tableSession,
  ]);
}
