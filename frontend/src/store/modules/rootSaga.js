import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import establishment from './establishment/sagas';

export default function* rootSaga() {
  return yield all([auth, establishment]);
}
