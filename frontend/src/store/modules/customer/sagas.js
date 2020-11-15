import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { updateCustomerSuccess, updateCustomerFailure } from './actions';

export function* updateCustomer({ payload }) {
  try {
    const response = yield call(api.put, 'customers', payload.customer);

    yield put(updateCustomerSuccess(response.data));

    history.push('/');
  } catch (err) {
    if (err.response.data) {
      alert(err.response.data.error);
    }
    yield put(updateCustomerFailure());
  }
}

export default all([
  takeLatest('@customer/UPDATE_CUSTOMER_REQUEST', updateCustomer),
]);
