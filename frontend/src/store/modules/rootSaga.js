import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import establishment from './establishment/sagas';
import customer from './customer/sagas';
import session from './session/sagas';

export default function* rootSaga() {
  return yield all([auth, establishment, customer, session]);
}
