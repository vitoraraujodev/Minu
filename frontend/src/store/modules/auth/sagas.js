import { takeLatest, call, put, all } from 'redux-saga/effects';
import decode from 'jwt-decode';
import history from '~/services/history';
import api from '~/services/api';

import {
  establishmentSignInSuccess,
  customerSignInSuccess,
  signFailure,
  signOutSuccess,
  inventoryAccess,
} from './actions';

export function* signIn({ payload }) {
  try {
    const { identifier, password, kind, route } = payload;

    const response =
      kind === 'establishments'
        ? yield call(api.post, 'establishment-sessions', {
            email: identifier,
            password,
          })
        : yield call(api.post, 'customer-sessions', {
            phone_number: identifier,
            password,
          });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (kind === 'establishments') {
      yield put(establishmentSignInSuccess(token, user));
    } else if (kind === 'customers') {
      yield put(customerSignInSuccess(token, user));
    }

    history.push(route);

    if (route === '/estabelecimento/inventario') {
      yield put(inventoryAccess(true));
    }
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
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
