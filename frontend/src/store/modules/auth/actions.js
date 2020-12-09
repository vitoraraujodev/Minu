export function establishmentSignInRequest(email, password, route) {
  return {
    type: '@auth/ESTABLISHMENT_SIGN_IN_REQUEST',
    payload: { email, password, route },
  };
}

export function customerSignInRequest(phone_number, password, route) {
  return {
    type: '@auth/CUSTOMER_SIGN_IN_REQUEST',
    payload: { phone_number, password, route },
  };
}

export function establishmentSignInSuccess(token, establishment) {
  return {
    type: '@auth/ESTABLISHMENT_SIGN_IN_SUCCESS',
    payload: { token, establishment },
  };
}

export function customerSignInSuccess(token, customer) {
  return {
    type: '@auth/CUSTOMER_SIGN_IN_SUCCESS',
    payload: { token, customer },
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
