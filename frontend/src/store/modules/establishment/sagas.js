import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import {
  updateEstablishmentSuccess,
  updateAddressSuccess,
  updateFailure,
} from './actions';

export function* updateEstablishment({ payload }) {
  try {
    const response = yield call(
      api.put,
      'establishments',
      payload.establishment
    );

    if (response.data) yield put(updateEstablishmentSuccess(response.data));

    history.push('/estabelecimento');
  } catch (err) {
    if (err.response.data) {
      alert(err.response.data.error);
    }
    yield put(updateFailure());
  }
}

export function* updateAddress({ payload }) {
  try {
    const response = yield call(api.put, 'addresses', payload.address);

    if (response.data) yield put(updateAddressSuccess(response.data));

    history.push('/estabelecimento');
  } catch (err) {
    if (err.response && err.response.data) {
      alert(err.response.data.error);
    }
    yield put(updateFailure());
  }
}

export default all([
  takeLatest(
    '@establishment/UPDATE_ESTABLISHMENT_REQUEST',
    updateEstablishment
  ),
  takeLatest('@establishment/UPDATE_ADDRESS_REQUEST', updateAddress),
]);
