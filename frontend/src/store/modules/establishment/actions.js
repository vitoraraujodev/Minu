export function createEstablishmentRequest(data) {
  return {
    type: '@user/CREATE_ESTABLISHMENT_REQUEST',
    payload: { data },
  };
}
export function createEstablishmentFailure() {
  return {
    type: '@user/CREATE_ESTABLISHMENT_FAILURE',
  };
}

export function updateEstablishmentRequest(data) {
  return {
    type: '@user/UPDATE_ESTABLISHMENT_REQUEST',
    payload: { data },
  };
}
export function updateEstablishmentSuccess(establishment) {
  return {
    type: '@user/UPDATE_ESTABLISHMENT_SUCCESS',
    payload: { establishment },
  };
}
export function updateEstablishmentFailure() {
  return {
    type: '@user/UPDATE_ESTABLISHMENT_FAILURE',
  };
}
