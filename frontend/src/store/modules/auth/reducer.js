import producer from 'immer';

const INITIAL_STATE = {
  token: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@auth/ESTABLISHMENT_SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/CUSTOMER_SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/ESTABLISHMENT_SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.loading = false;
        break;
      }
      case '@auth/CUSTOMER_SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        break;
      }
      default:
    }
  });
}
