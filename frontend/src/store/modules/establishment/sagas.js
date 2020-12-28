import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import {
  updateEstablishmentSuccess,
  updateEstablishmentFailure,
} from './actions';

export function* updateEstablishment({ payload }) {
  try {
    const response = yield call(
      api.put,
      'establishments',
      payload.establishment
    );

    yield put(updateEstablishmentSuccess(response.data));

    history.push('/estabelecimento');
  } catch (err) {
    if (err.response.data) {
      alert(err.response.data.error);
    }
    yield put(updateEstablishmentFailure());
  }
}

export default all([
  takeLatest(
    '@establishment/UPDATE_ESTABLISHMENT_REQUEST',
    updateEstablishment
  ),
]);
