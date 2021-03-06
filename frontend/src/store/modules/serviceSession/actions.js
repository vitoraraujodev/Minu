export function checkSession() {
  return {
    type: '@session/CHECK_SESSION',
  };
}

export function checkInRequest(establishment_id, table_number) {
  return {
    type: '@session/CHECK_IN_REQUEST',
    payload: { establishment_id, table_number },
  };
}

export function checkInSuccess() {
  return {
    type: '@session/CHECK_IN_SUCCESS',
  };
}

export function checkInFailure() {
  return { type: '@session/CHECK_IN_FAILURE' };
}

export function checkOutRequest() {
  return {
    type: '@session/CHECK_OUT_REQUEST',
  };
}

export function checkOutSuccess() {
  return {
    type: '@session/CHECK_OUT',
  };
}

export function setSession(establishment, tableNumber) {
  return {
    type: '@session/SET_SESSION',
    payload: { establishment, tableNumber },
  };
}
export function removeSession() {
  return {
    type: '@session/REMOVE_SESSION',
  };
}
