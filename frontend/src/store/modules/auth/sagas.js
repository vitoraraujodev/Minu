import { takeLatest, call, put, all } from 'redux-saga/effects';
import decode from 'jwt-decode';
import history from '~/services/history';
import api from '~/services/api';

import {
  establishmentSignInSuccess,
  customerSignInSuccess,
  signFailure,
  signOutSuccess,
} from './actions';

import { checkOutSuccess } from '../session/actions';
import { inventoryAccess } from '../establishment/actions';

export function* establishmentSignIn({ payload }) {
  try {
    const { email, password, route } = payload;

    const response = yield call(api.post, 'establishment-sessions', {
      email,
      password,
    });

    const { token, establishment } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(establishmentSignInSuccess(token, establishment));

    history.push(route);

    if (route === '/inventario') {
      yield put(inventoryAccess(true));
    }
  } catch (err) {
    yield put(signFailure());
    if (err.response.data) {
      alert(err.response.data.error);
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
  if (window.confirm('Tem certeza que deseja sair?')) {
    yield put(signOutSuccess());
    history.push('/');
  }
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
  takeLatest('@auth/CUSTOMER_SIGN_IN_REQUEST', customerSignIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
