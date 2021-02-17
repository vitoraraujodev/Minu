import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import establishment from './establishment/sagas';
import customer from './customer/sagas';
import dashboard from './dashboard/sagas';
import session from './session/sagas';
import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([auth, establishment, customer, dashboard, session, cart]);
}
