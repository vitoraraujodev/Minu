import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';
import api from '~/services/api';

import { checkInSuccess, checkInFailure, checkOutSuccess } from './actions';

export function* checkSession() {
  try {
    const response = yield call(api.get, 'service-sessions');

    if (response.data.signed) {
      yield put(checkInSuccess());
      history.push('/cardapio');
    } else {
      yield put(checkOutSuccess());
    }
  } catch (err) {
    alert(
      'Houve um erro ao verificar sua sessão. Por favor, tente novamente mais tarde.'
    );
  }
}

export function* checkIn({ payload }) {
  try {
    const { establishment_id, table_number } = payload;

    yield call(api.post, 'service-sessions', {
      establishment_id,
      table_number,
    });

    yield put(checkInSuccess());

    history.push('/cardapio');
  } catch (err) {
    yield put(checkInFailure());
    if (err.response.data) {
      alert(err.response.data.error);
    }
  }
}

export function* checkOut() {
  if (window.confirm('Tem certeza que deseja encerrar a sessão?')) {
    yield call(api.delete, 'service-sessions');

    yield put(checkOutSuccess());
    // futuramente enviar para tela de avaliação
    history.push('/sessao');
  }
}

export default all([
  takeLatest('@session/CHECK_SESSION', checkSession),
  takeLatest('@session/CHECK_IN_REQUEST', checkIn),
  takeLatest('@session/CHECK_OUT_REQUEST', checkOut),
]);
