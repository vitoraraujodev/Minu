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

export function updateAddressRequest(address) {
  return {
    type: '@establishment/UPDATE_ADDRESS_REQUEST',
    payload: { address },
  };
}

export function updateAddressSuccess(address) {
  return {
    type: '@establishment/UPDATE_ADDRESS_SUCCESS',
    payload: { address },
  };
}

export function updateFailure() {
  return {
    type: '@establishment/UPDATE_FAILURE',
  };
}

export function inventoryAccess(access) {
  return {
    type: '@establishment/INVENTORY_ACCESS',
    payload: { access },
  };
}
