export function updateEstablishmentRequest(establishment) {
  return {
    type: '@establishment/UPDATE_ESTABLISHMENT_REQUEST',
    payload: { establishment },
  };
}
export function updateEstablishmentSuccess(establishment) {
  return {
    type: '@establishment/UPDATE_ESTABLISHMENT_SUCCESS',
    payload: { establishment },
  };
}
export function updateEstablishmentFailure() {
  return {
    type: '@establishment/UPDATE_ESTABLISHMENT_FAILURE',
  };
}
export function updateEstablishmentPhoto(photo) {
  return {
    type: '@establishment/UPDATE_ESTABLISHMENT_PHOTO',
    payload: { photo },
  };
}
