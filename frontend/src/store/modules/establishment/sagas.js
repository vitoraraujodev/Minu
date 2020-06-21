import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  createEstablishmentFailure,
  updateEstablishmentSuccess,
  updateEstablishmentFailure,
} from './actions';

import { signInRequest } from '../auth/actions';

export function* createEstablishment({ payload }) {
  try {
    yield call(api.post, 'establishments', payload.data);
    alert('Estabelecimento criado com sucesso!');

    yield put(signInRequest(payload.data.email, payload.data.password));
  } catch (err) {
    alert('Erro ao criar estabelecimento, confira seus dados');
    yield put(createEstablishmentFailure());
  }
}

export function* updateEstablishment({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;
    const establishment = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'establishments', establishment);

    alert('Estabelecimento atualizado com sucesso!');

    yield put(updateEstablishmentSuccess(response.data.user));
  } catch (err) {
    alert('Erro ao atualizar estabelecimento, confira seus dados');

    yield put(updateEstablishmentFailure());
  }
}
export default all([
  takeLatest('@user/CREATE_ESTABLISHMENT_REQUEST', createEstablishment),
  takeLatest('@user/UPDATE_ESTABLISHMENT_REQUEST', updateEstablishment),
]);
