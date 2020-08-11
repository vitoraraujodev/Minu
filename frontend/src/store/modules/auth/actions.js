export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, establishment) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, establishment },
  };
}

export function signFailure() {
  return { type: '@auth/SIGN_FAILURE' };
}

export function signOutRequest() {
  return {
    type: '@auth/SIGN_OUT_REQUEST',
  };
}

export function signOutSuccess() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function inventoryDisable(access) {
  return {
    type: '@auth/INVENTORY_ACCESS',
    payload: { access },
  };
}

export function tokenExpired() {
  return {
    type: '@auth/TOKEN_EXPIRED',
  };
}
