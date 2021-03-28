import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  removeTableSessionSuccess,
  removeTableSessionFailure,
} from './actions';

export function* removeTableSession({ payload }) {
  const { TableNumber, SessionId } = payload;

  const data = {
    tableNumber: TableNumber,
    sessionId: SessionId,
  };

  try {
    yield call(api.post, 'close-table-session', data);

    yield put(removeTableSessionSuccess(payload));
  } catch (err) {
    yield put(removeTableSessionFailure(payload));

    alert(
      'Houve um erro ao finalizar a sessão. Verifique sua conexão e tente novamente.'
    );
  }
}

export default all([
  takeLatest('@tableSession/REMOVE_TABLE_SESSION_REQUEST', removeTableSession),
]);
