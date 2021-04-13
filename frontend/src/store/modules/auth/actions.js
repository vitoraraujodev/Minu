export function establishmentSignInRequest(email, password) {
  return {
    type: '@auth/ESTABLISHMENT_SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function establishmentSignInSuccess(token, establishment) {
  return {
    type: '@auth/ESTABLISHMENT_SIGN_IN_SUCCESS',
    payload: { token, establishment },
  };
}

export function customerSignInRequest(phone_number, password, route) {
  return {
    type: '@auth/CUSTOMER_SIGN_IN_REQUEST',
    payload: { phone_number, password, route },
  };
}

export function customerSignInSuccess(token, customer) {
  return {
    type: '@auth/CUSTOMER_SIGN_IN_SUCCESS',
    payload: { token, customer },
  };
}

export function establishmentSignUpRequest(data) {
  console.log(data);
  return {
    type: '@auth/ESTABLISHMENT_SIGN_UP_REQUEST',
    payload: { data },
  };
}

export function establishmentSignUpSuccess(token, establishment) {
  return {
    type: '@auth/ESTABLISHMENT_SIGN_UP_SUCCESS',
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
