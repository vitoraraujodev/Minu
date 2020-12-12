import { put, all, takeLatest } from 'redux-saga/effects';

import history from '../../../services/history';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ payload }) {
  const { productOrder } = payload;

  yield put(addToCartSuccess(productOrder));

  history.push('/carrinho');
}

function* updateAmount({ payload }) {
  const { id, amount } = payload;

  if (amount <= 0) return;

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
