import { put, all, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

import { addToCartSuccess } from './actions';

function* addToCart({ payload }) {
  const { productOrder } = payload;

  yield put(addToCartSuccess(productOrder));

  history.push('/cardapio/carrinho');
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
