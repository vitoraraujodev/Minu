export function signInRequest(identifier, password, kind, route) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { identifier, password, kind, route },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
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

export function inventoryAccess(access) {
  return {
    type: '@auth/INVENTORY_ACCESS',
    payload: { access },
  };
}
