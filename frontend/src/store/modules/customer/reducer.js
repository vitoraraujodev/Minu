import producer from 'immer';

const INITIAL_STATE = {
  customer: null,
};

export default function customer(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.customer = action.payload.user;
        break;
      }
      case '@customer/UPDATE_CUSTOMER_SUCCESS': {
        draft.customer = action.payload.customer;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.customer = null;
        break;
      }
      default:
    }
  });
}
