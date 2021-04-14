import { takeLatest, call, put, all } from 'redux-saga/effects';
import decode from 'jwt-decode';
import history from '~/services/history';
import api from '~/services/api';

import {
  establishmentSignInSuccess,
  establishmentSignUpSuccess,
  customerSignInSuccess,
  signFailure,
  signOutSuccess,
} from './actions';

import { checkOutSuccess } from '../serviceSession/actions';
import { inventoryAccess } from '../establishment/actions';

export function* establishmentSignIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'establishment-sessions', {
      email,
      password,
    });

    const { token, establishment } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(establishmentSignInSuccess(token, establishment));

    history.push('/estabelecimento');
  } catch (err) {
    yield put(signFailure());
    if (err.response && err.response.data) {
      alert(err.response.data.error);
    } else {
      alert(
        'Houve um erro ao acessar seu estabelecimento. Verifique sua conexão e tente novamente.'
      );
    }
  }
}

export function* establishmentSignUp({ payload }) {
  const { data } = payload;

  try {
    const response = yield call(api.post, 'establishments', data);

    const { token, establishment } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(establishmentSignUpSuccess(token, establishment));

    yield put(inventoryAccess(true));
  } catch (err) {
    yield put(signFailure());
    if (err.response && err.response.data.error) {
      alert(err.response.data.error);
    } else {
      alert(
        'Houve um erro ao criar seu estabelecimento. Verifique sua conexão e tente novamente.'
      );
    }
  }
}

export function* customerSignIn({ payload }) {
  try {
    const { phone_number, password } = payload;

    const response = yield call(api.post, 'customer-sessions', {
      phone_number: phone_number[0] === '+' ? phone_number : `+${phone_number}`,
      password,
    });

    const { token, customer } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(checkOutSuccess());
    yield put(customerSignInSuccess(token, customer));

    history.push('/acesso/sessao');
  } catch (err) {
    yield put(signFailure());
    if (err.response.data) {
      alert(err.response.data.error);
    }
  }
}

export function* signOut() {
  yield put(signOutSuccess());
  history.push('/');
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
      yield put(signOutSuccess());
      history.push('/');
    }
  }

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/ESTABLISHMENT_SIGN_IN_REQUEST', establishmentSignIn),
  takeLatest('@auth/ESTABLISHMENT_SIGN_UP_REQUEST', establishmentSignUp),
  takeLatest('@auth/CUSTOMER_SIGN_IN_REQUEST', customerSignIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
