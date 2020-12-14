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
  return {
    type: '@cart/REMOVE',
    payload: { id },
  };
}

export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    payload: { id, amount },
  };
}

export function clearCart() {
  return {
    type: '@cart/CLEAR_CART',
  };
}
