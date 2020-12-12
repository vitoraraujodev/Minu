export function addToCartRequest(productOrder) {
  return {
    type: '@cart/ADD_REQUEST',
    payload: { productOrder },
  };
}

export function addToCartSuccess(productOrder) {
  return {
    type: '@cart/ADD_SUCCESS',
    payload: { productOrder },
  };
}

export function removeFromCart(id) {
  return { type: '@cart/REMOVE', id };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    payload: { id, amount },
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    payload: { id, amount },
  };
}
