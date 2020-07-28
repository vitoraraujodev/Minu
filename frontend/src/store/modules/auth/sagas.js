import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure, signOutSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });
    const { token, establishment } = response.data;

    yield put(signInSuccess(token, establishment));
    history.push('/estabelecimento');
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

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
