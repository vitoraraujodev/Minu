import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  updateEstablishmentSuccess,
  updateEstablishmentFailure,
} from './actions';

export function* updateEstablishment({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload;
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
  takeLatest('@user/UPDATE_ESTABLISHMENT_REQUEST', updateEstablishment),
]);
