export function updateCustomerRequest(customer) {
  return {
    type: '@customer/UPDATE_CUSTOMER_REQUEST',
    payload: { customer },
  };
}
export function updateCustomerSuccess(customer) {
  return {
    type: '@customer/UPDATE_CUSTOMER_SUCCESS',
    payload: { customer },
  };
}
export function updateCustomerFailure() {
  return {
    type: '@customer/UPDATE_CUSTOMER_FAILURE',
  };
}
export function updateCustomerAvatar(avatar) {
  return {
    type: '@customer/UPDATE_CUSTOMER_AVATAR',
    payload: { avatar },
  };
}
