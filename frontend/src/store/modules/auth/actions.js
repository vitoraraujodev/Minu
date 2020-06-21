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

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
